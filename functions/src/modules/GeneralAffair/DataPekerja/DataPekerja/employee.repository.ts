import * as yup from 'yup';
import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import NotFoundError from '@interfaces/NotFoundError';
import handleImportExcel from '@utils/handleImportExcel';
import BaseRepository from '@repositories/baseRepository';
import validationWording from '@constants/validationWording';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import firestoreTimeStampToDate from '@utils/firestoreTimeStampToDate';
import FormasiRepository from '@modules/GeneralAffair/DataPekerja/FormasiPekerja/formasi_pekerja.repository';

import { IEmployeeBase } from './interface/employee.interface';
import { IFiles, StringKeys } from '@interfaces/BaseInterface';

interface IEmployeExcel {
  unitKerja: string;
  levelJabatan: string;
}

interface IPemnuhanInformasi {
  id: string;
  count: number;
  row: string[];
  name: string[];
}

export default class EmployeeRepository extends BaseRepository<IEmployeeBase> {
  _ga_employeesModel: admin.firestore.CollectionReference;
  constructor() {
    super('ga_employees', 'employee');
    this._ga_employeesModel = db.collection('ga_employees');
  }

  async writeToFirestoreEmployee(
    records: StringKeys[],
    schemaValidation: yup.ObjectSchema<any>,
    formasiData: admin.firestore.DocumentData
  ) {
    const batchCommits = [];
    const invalidRow: StringKeys[] = [];
    const pemenuhanFormasi: IPemnuhanInformasi[] = [];

    // cari formasi yang available
    let batch = db.batch();

    //set data pemenuhan
    for (let i = 0; i < records.length; i++) {
      let isUpdatePemenuhan = true;
      let dataPekerja = records[i];
      const unitKerjaExcel = dataPekerja?.unitKerja;
      const levelJabatanExcel = dataPekerja?.levelJabatan;

      //validasi data dengan yup
      let isErrorYup = false;
      await schemaValidation
        .validate(dataPekerja, { abortEarly: false })
        .catch((e: yup.ValidationError) => {
          isErrorYup = true;
          invalidRow.push({
            row: (i + 2).toString(),
            name: dataPekerja.name,
            error: e.errors.join(),
          });
        });
      if (isErrorYup) {
        continue;
      }

      const baseDocRef = this._ga_employeesModel
        .doc('employee')
        .collection('ga_employees');
      let docRef = baseDocRef.doc();
      //check if exist employe
      const exist = await this.findOne(
        '',
        baseDocRef
          .where('name', '==', dataPekerja.name)
          .where('nip', '==', dataPekerja.nip)
          .where('formasi.unitKerja', '==', unitKerjaExcel)
          .where('formasi.levelJabatan', '==', levelJabatanExcel)
      );

      if (exist && exist?.id) {
        isUpdatePemenuhan = false;
        docRef = baseDocRef.doc(exist.id);
      }

      const validFormasi = formasiData.findIndex(
        ({ unitKerja, levelJabatan }: IEmployeExcel) =>
          unitKerja.toLowerCase() === unitKerjaExcel?.toLowerCase() &&
          levelJabatan.toLowerCase() === levelJabatanExcel.toLowerCase()
      );

      if (validFormasi < 0) {
        invalidRow.push({
          row: (i + 2).toString(),
          name: dataPekerja.name,
          error: `"unitKerja  ${unitKerjaExcel}" "levelJabatan  ${levelJabatanExcel}" tidak tersedia`,
        });
        continue;
      }

      //delete data formasi bawaan
      delete dataPekerja.unitKerja;
      delete dataPekerja.levelJabatan;

      const formasi = {
        id: formasiData[validFormasi].id,
        unitKerja: formasiData[validFormasi].unitKerja,
        levelJabatan: formasiData[validFormasi].levelJabatan,
      };
      dataPekerja = { ...dataPekerja, formasi } as any;

      // collect pemenuhan data
      if (isUpdatePemenuhan) {
        const indexData = pemenuhanFormasi.findIndex(
          (e) => e.id === formasiData[validFormasi].id
        );
        if (indexData < 0) {
          pemenuhanFormasi.push({
            id: formasiData[validFormasi].id,
            count: 1,
            row: [(i + 2).toString()],
            name: [dataPekerja.name || ''],
          });
        } else {
          pemenuhanFormasi[indexData] = {
            ...pemenuhanFormasi[indexData],
            count: Number(pemenuhanFormasi[indexData].count) + 1,
            row: [...pemenuhanFormasi[indexData].row, (i + 2).toString()],
            name: [...pemenuhanFormasi[indexData].name, dataPekerja.name || ''],
          };
        }
      }

      batch.set(
        docRef,
        {
          ...dataPekerja,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { merge: true }
      );
    }

    //validate pemenuhan formasi
    const formasiRepository = new FormasiRepository();
    for (let i = 0; i < pemenuhanFormasi.length; i++) {
      const data = await formasiRepository.validateSisaPemenuhanFormasi(
        pemenuhanFormasi[i].id,
        pemenuhanFormasi[i].count
      );

      if (
        (!data?.sisaPemenuhan && data?.sisaPemenuhan?.toString() !== '0') ||
        Number(data?.sisaPemenuhan) < 0
      ) {
        invalidRow.push({
          row: pemenuhanFormasi[i]?.row?.toString(),
          name: pemenuhanFormasi[i]?.name?.toString(),
          error: `Alokasi formasi "Unit Kerja  ${data?.unitKerja}" "Level Jabatan ${data?.levelJabatan}" telah penuh`,
        });
        continue;
      }
      pemenuhanFormasi[i].count =
        Number(pemenuhanFormasi[i].count) + Number(data.pemenuhan);
    }

    //balikin biar user perbaiki dulu
    if (invalidRow.length > 0) {
      return invalidRow;
    }

    // add pemenuhan formasi
    for (let i = 0; i < pemenuhanFormasi.length; i++) {
      await formasiRepository.setPemenuhanFormasi(
        pemenuhanFormasi[i].id,
        pemenuhanFormasi[i].count
      );
    }

    batchCommits.push(batch.commit());
    await Promise.all(batchCommits);
    return [];
  }

  async handleExcel(files: IFiles, columnToKey: StringKeys) {
    if (!files?.excel) {
      throw new InvalidRequestError('Please upload xlsx, xls file', 'excel');
    }
    const { path } = files.excel;
    const data = await handleImportExcel(path, columnToKey, files);

    if (data.length < 1) {
      throw new InvalidRequestError(
        'Format Excel tidak valid, pastikan barada di "Sheet1"',
        this._name
      );
    }
    return data;
  }

  async importExcelEmployee(
    files: IFiles,
    columnToKey: StringKeys,
    schemaValidation: yup.ObjectSchema<any>
  ) {
    //ambil data formasi sekarang
    const formasiRepository = new FormasiRepository();
    const formasiData = (await formasiRepository.findAll(1, 999, '', '')) || [];

    //ambil data excel
    const dataExcel = await this.handleExcel(files, columnToKey);

    if (dataExcel.length > 500) {
      throw new InvalidRequestError(
        'File Excel yang diupload maksimal berisi 500 baris"',
        this._name
      );
    }
    const invalidRow = await this.writeToFirestoreEmployee(
      dataExcel,
      schemaValidation,
      formasiData
    );

    return invalidRow;
  }

  async deleteEmployeeById(id: string) {
    const ref: admin.firestore.DocumentReference = this._collection
      .doc('employee')
      .collection('ga_employees')
      .doc(id);
    const snap: admin.firestore.DocumentSnapshot = await ref.get();
    if (!snap.exists) {
      throw new NotFoundError(
        validationWording.notFound(this._name),
        this._name
      );
    }
    await ref.delete();
    const data = firestoreTimeStampToDate({ id: ref.id, ...snap.data() });

    if (data?.formasi?.id) {
      const formasiRepository = new FormasiRepository();
      await formasiRepository.deletePemenuhan(data.formasi.id);
    }

    return data;
  }

  async createEmployee(object: IEmployeeBase) {
    const data = await this.createWithSubdocument(
      object,
      'employee',
      'ga_employees'
    );
    return data;
  }

  async updateEmployee(
    id: string,
    object: Partial<IEmployeeBase> & { unitKerja: string; levelJabatan: string }
  ) {
    const ref = this._collection
      .doc('employee')
      .collection('ga_employees')
      .doc(id);

    const snap = await ref.get();
    if (!snap.exists) {
      throw new NotFoundError(
        validationWording.notFound(this._name),
        this._name
      );
    }

    const oldData = snap.data();
    let createParam = {
      ...object,
      updatedAt: new Date(),
    };

    if (
      oldData?.formasi?.levelJabatan !== object.levelJabatan ||
      oldData?.formasi?.unitKerja !== object.unitKerja
    ) {
      const formasiRepository = new FormasiRepository();
      const formasi = await formasiRepository.addPemenuhan(
        object.unitKerja,
        object.levelJabatan
      );
      createParam = { ...createParam, formasi };

      if (oldData?.formasi?.id) {
        await formasiRepository.deletePemenuhan(oldData.formasi.id);
      }
    }

    await ref.set(createParam, { merge: true });
    const updateSnap = await ref.get();
    return firestoreTimeStampToDate({ id: ref.id, ...updateSnap.data() });
  }
}
