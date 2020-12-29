import * as yup from 'yup';
import { db } from '@utils/admin';
import * as admin from 'firebase-admin';
import NotFoundError from '@interfaces/NotFoundError';
import handleImportExcel from '@utils/handleImportExcel';
import BaseRepository from '@repositories/baseRepository';
import validationWording from '@constants/validationWording';
import InvalidRequestError from '@interfaces/InvalidRequestError';

import {
  ISistemManajemenKinerjaBase,
  IPenilaian,
} from './interface/sistem_manajemen_kinerja.interface';

interface IFile {
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
  buffer: Buffer;
}

interface StringKeys {
  [key: string]: string;
}
interface IFiles {
  [key: string]: IFile;
}

export interface ISistemManajemenKinerja {
  name: string;
  pn: number;
  value: string;
  year: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class SistemManajemenKinerjaRepository extends BaseRepository<
  ISistemManajemenKinerjaBase
> {
  _employeeModel: admin.firestore.CollectionReference;
  constructor() {
    super('ga_employees', 'employee');
    this._employeeModel = db.collection('ga_employees');
  }
  async createPerformance(object: ISistemManajemenKinerja) {
    const exist = await this.findOne(
      '',
      this._employeeModel
        .doc('performance_management')
        .collection('ga_performance_managements')
        .where('name', '==', object.name)
    );
    if (exist && exist.id) {
      const newPenilaian: IPenilaian[] = [
        { value: object.value, year: object.year },
      ];

      const penilaian = Object.values(
        []
          .concat(exist.penilaian, newPenilaian as any)
          .reduce((r: any, c: any) => {
            console.log(r, c);
            return (r[c.year] = Object.assign(r[c.year] || {}, c)), r;
          }, {})
      );
      const updateParam = {
        ...exist,
        penilaian,
      };
      const data = await this.updateSubDocument(
        exist.id,
        updateParam,
        'performance_management',
        'ga_performance_managements'
      );
      return data;
    } else {
      const createParam = {
        name: object.name,
        pn: object.pn,
        penilaian: [{ value: object.value, year: object.year }],
      };
      const data = await this.createWithSubdocument(
        createParam,
        'performance_management',
        'ga_performance_managements'
      );
      return data;
    }
  }
  async updatePerformance(
    id: string,
    object: Partial<ISistemManajemenKinerja>
  ) {
    const ref: admin.firestore.DocumentReference = this._employeeModel
      .doc('performance_management')
      .collection('ga_performance_managements')
      .doc(id);
    const snap: admin.firestore.DocumentSnapshot = await ref.get();
    if (!snap.exists) {
      throw new NotFoundError(
        validationWording.notFound(this._name),
        this._name
      );
    }
    let createParam = undefined;
    createParam = {
      ...object,
      updatedAt: new Date(),
    };
    if (object.value && object.year) {
      const newPenilaian = [{ value: object.value, year: object.year }];
      const currentData = snap.data();
      const penilaian = Object.values(
        []
          .concat(currentData?.penilaian, newPenilaian as any)
          .reduce((r: any, c: any) => {
            console.log(r, c);
            return (r[c.year] = Object.assign(r[c.year] || {}, c)), r;
          }, {})
      );
      createParam = { ...createParam, penilaian };
    }
    if (createParam.value) {
      delete createParam.value;
    }
    if (createParam.year) {
      delete createParam.year;
    }
    const data = await this.updateSubDocument(
      id,
      createParam,
      'performance_management',
      'ga_performance_managements'
    );
    return data;
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

  async writeToFirestorePerformanceManagement(
    records: ISistemManajemenKinerjaBase[],
    schemaValidation: yup.ObjectSchema<any>
  ) {
    const batchCommits = [];
    const invalidRow: StringKeys[] = [];

    let batch = db.batch();
    for (let i = 0; i < records.length; i++) {
      //defined docref
      const docRef = this._employeeModel
        .doc('performance_management')
        .collection('ga_performance_managements');

      //validation yup
      const validateYup = schemaValidation.isValidSync(records[i]);
      if (!validateYup) {
        console.log(records[i].name);
        invalidRow.push({
          name: records[i].name || (Number(i) + 2).toString(),
          error: 'error validation',
        });
        continue;
      }

      //check exist
      const exist = await this.findOne(
        '',
        this._employeeModel
          .doc('performance_management')
          .collection('ga_performance_managements')
          .where('name', '==', records[i]?.name)
      );

      //update if exist
      if (exist && exist.id) {
        const penilaian = Object.values(
          []
            .concat(exist.penilaian, records[i].penilaian as any)
            .reduce((r: any, c: any) => {
              console.log(r, c);
              return (r[c.year] = Object.assign(r[c.year] || {}, c)), r;
            }, {})
        );
        const updateParam = {
          ...exist,
          penilaian,
        };
        batch.update(docRef.doc(exist.id), updateParam);
      } else {
        //create
        batch.set(docRef.doc(), {
          ...records[i],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

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

  async importExcelPerformanceManagement(
    files: IFiles,
    columnToKey: StringKeys,
    schemaValidation: yup.ObjectSchema<any>
  ) {
    const dataExcel = await this.handleExcel(files, columnToKey);

    let data = [];
    for (let i = 0; i < dataExcel.length; i++) {
      const penilaian = Object.entries(dataExcel[i])
        .filter(([key]) => Number(key))
        .map(([key, value]) => ({
          year: key,
          value: value ? `${value}` : '0',
        }));
      data.push({
        name: dataExcel[i].Nama,
        pn: dataExcel[i].PN,
        penilaian,
      });
    }
    const invalidRow = await this.writeToFirestorePerformanceManagement(
      data,
      schemaValidation
    );
    return invalidRow;
  }
}
