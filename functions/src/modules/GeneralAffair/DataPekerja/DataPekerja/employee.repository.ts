import * as yup from 'yup';
import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import handleImportExcel from '@utils/handleImportExcel';
import BaseRepository from '@repositories/baseRepository';
import InvalidRequestError from '@interfaces/InvalidRequestError';
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
        if (!validFormasi || validFormasi < 0) {
          invalidRow.push({
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
            name: records[i].name,
            error: 'error validation',
          });
          continue;
        }
        const formasiRepository = new FormasiRepository();
        const addPemenuhan: any = await formasiRepository.addPemenuhan(
          formasiData[validFormasi].id
        );
        if (addPemenuhan?.error === true) {
          invalidRow.push({
            name: records[i].name,
            error: addPemenuhan?.message,
          });
          continue;
        }
      } else {
        invalidRow.push({
          name: records[i].name,
          error: 'error validation',
        });
        continue;
      }
      console.log({ ...records[i] });
      batch.set(docRef, {
        ...records[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      if ((i + 1) % 500 === 0) {
        console.log(`Writing records[i] ${i + 1}`);
        batchCommits.push(batch.commit());
        batch = db.batch();
      }
    }
    batchCommits.push(batch.commit());
    await Promise.all(batchCommits);
    return invalidRow;
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
}
