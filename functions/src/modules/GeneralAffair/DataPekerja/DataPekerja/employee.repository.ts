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

interface EmployeExcel {
  unitKerja: string;
  levelJabatan: string;
}

export default class EmployeeRepository extends BaseRepository<IEmployeeBase> {
  _ga_employeesModel: admin.firestore.CollectionReference;
  constructor() {
    super('ga_employees', 'employee');
    this._ga_employeesModel = db.collection('ga_employees');
  }
  async createEmployee(object: IEmployeeBase) {
    const data = await this.createWithSubdocument(
      object,
      'employee',
      'ga_employees'
    );
    return data;
  }
  async updateEmployee(id: string, object: Partial<IEmployeeBase>) {
    const data = await this.updateSubDocument(
      id,
      object,
      'employee',
      'ga_employees'
    );
    return data;
  }

  async writeToFirestoreEmployee(
    records: StringKeys[],
    schemaValidation: yup.ObjectSchema<any>,
    formasiData: admin.firestore.DocumentData
  ) {
    const batchCommits = [];
    const invalidRow: StringKeys[] = [];
    const pemenuhanFormasi: {
      id: string;
      count: number;
      row: string[];
      name: string[];
    }[] = [];
    // cari formasi yang available

    let batch = db.batch();
    for (let i = 0; i < records.length; i++) {
      const docRef = this._ga_employeesModel
        .doc('employee')
        .collection('ga_employees')
        .doc();
      if (records[i]?.unitKerja && records[i]?.levelJabatan) {
        const validFormasi = formasiData.findIndex(
          ({ unitKerja, levelJabatan }: EmployeExcel) =>
            unitKerja.toLowerCase() === records[i]?.unitKerja?.toLowerCase() &&
            levelJabatan.toLowerCase() ===
              records[i]?.levelJabatan?.toLowerCase()
        );
        if (validFormasi < 0) {
          invalidRow.push({
            row: (i + 2).toString(),
            name: records[i].name,
            error: `"unitKerja  ${records[i]?.unitKerja}" "levelJabatan  ${records[i]?.levelJabatan}" not available`,
          });
          continue;
        }

        delete records[i]?.unitKerja;
        delete records[i]?.levelJabatan;

        const formasi = {
          id: formasiData[validFormasi].id,
          levelJabatan: formasiData[validFormasi].levelJabatan,
          unitKerja: formasiData[validFormasi].unitKerja,
        };
        records[i] = { ...records[i], formasi } as any;
        const validateYup = schemaValidation.isValidSync(records[i]);
        if (!validateYup) {
          invalidRow.push({
            row: (i + 2).toString(),
            name: records[i].name,
            error: 'error validation',
          });
          continue;
        }

        //collect pemenuhan data
        const indexData = pemenuhanFormasi.findIndex(
          (e) => e.id === formasiData[validFormasi]
        );
        if (indexData === -1) {
          pemenuhanFormasi.push({
            id: formasiData[validFormasi].id,
            count: 1,
            row: [(i + 2).toString()],
            name: [records[i].name || ''],
          });
        } else {
          pemenuhanFormasi[indexData] = {
            ...pemenuhanFormasi[indexData],
            count: Number(pemenuhanFormasi[indexData].count) + 1,
            row: [...pemenuhanFormasi[indexData].row, (i + 2).toString()],
            name: [...pemenuhanFormasi[indexData].name, records[i].name || ''],
          };
        }
      } else {
        invalidRow.push({
          row: (i + 2).toString(),
          name: records[i].name,
          error: 'error validation',
        });
        continue;
      }
      batch.set(docRef, {
        ...records[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
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
        data?.sisaPemenuhan < 0
      ) {
        invalidRow.push({
          row: pemenuhanFormasi[i]?.row?.toString(),
          name: pemenuhanFormasi[i]?.name?.toString(),
          error: `Alokasi formasi "unitKerja  ${data?.unitKerja}" "levelJabatan ${data?.levelJabatan}" tersisa ${data.sisaPemenuhan}`,
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

    // //add pemenuhan formasi
    for (let i = 0; i < pemenuhanFormasi.length; i++) {
      await formasiRepository.addPemenuhanFormasi(
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
    const formasiRepository = new FormasiRepository();
    //ambil data formasi sekarang
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

    //cari perbedaan formasi di excel dan formasi
    // const results = dataExcel
    //   .filter(
    //     ({
    //       unitKerja: unitKerjaExcel,
    //       levelJabatan: levelJabatanExcel,
    //     }: EmployeExcel) =>
    //       unitKerjaExcel &&
    //       levelJabatanExcel &&
    //       !formasiData.some(
    //         ({
    //           unitKerja: unitKerjaFormasi,
    //           levelJabatan: levelJabatanFormasi,
    //         }: EmployeExcel) =>
    //           unitKerjaExcel.toLowerCase() === unitKerjaFormasi.toLowerCase() &&
    //           levelJabatanExcel.toLowerCase() ===
    //             levelJabatanFormasi.toLowerCase()
    //       )
    //   )
    //   .reduce((acc: StringKeys[], current: StringKeys) => {
    //     const x = acc.find(
    //       (item: StringKeys) =>
    //         item.value === current.value && item.display === current.display
    //     );
    //     if (!x) {
    //       return acc.concat([current]);
    //     } else {
    //       return acc;
    //     }
    //   }, [] as StringKeys[]);
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

    const formasiRepository = new FormasiRepository();
    const data = firestoreTimeStampToDate({ id: ref.id, ...snap.data() });
    await formasiRepository.deletePemenuhan(data?.formasi?.id);

    return data;
  }
}
