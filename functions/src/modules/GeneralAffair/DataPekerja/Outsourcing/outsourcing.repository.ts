import * as yup from 'yup';
import { db } from '@utils/admin';
import * as admin from 'firebase-admin';
import NotFoundError from '@interfaces/NotFoundError';
import handleImportExcel from '@utils/handleImportExcel';
import BaseRepository from '@repositories/baseRepository';
import validationWording from '@constants/validationWording';
import InvalidRequestError from '@interfaces/InvalidRequestError';

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

import {
  IOutsourcingBase,
  IPenilaian,
} from './interface/outsourcing.interface';

export interface IOutsourcingParam {
  name: string;
  pn: number;
  value: string;
  year: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class SistemManajemenKinerjaRepository extends BaseRepository<
  IOutsourcingBase
> {
  _employeeModel: admin.firestore.CollectionReference;
  constructor() {
    super('ga_employees', 'employee');
    this._employeeModel = db.collection('ga_employees');
  }
  async createOutsourcing(object: IOutsourcingParam) {
    const exist = await this.findOne(
      '',
      this._employeeModel
        .doc('outsourcing')
        .collection('ga_outsourcings')
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
        'outsourcing',
        'ga_outsourcings'
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
        'outsourcing',
        'ga_outsourcings'
      );
      return data;
    }
  }
  async updateOutsourcing(id: string, object: Partial<IOutsourcingParam>) {
    const ref: admin.firestore.DocumentReference = this._employeeModel
      .doc('outsourcing')
      .collection('ga_outsourcings')
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
      'outsourcing',
      'ga_outsourcings'
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

  async writeToFirestoreOutsourcing(
    records: IOutsourcingBase[],
    schemaValidation: yup.ObjectSchema<any>
  ) {
    const batchCommits = [];
    const invalidRow: StringKeys[] = [];

    let batch = db.batch();
    for (let i = 0; i < records.length; i++) {
      //defined docref
      const docRef = this._employeeModel
        .doc('outsourcing')
        .collection('ga_outsourcings');

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
          .doc('outsourcing')
          .collection('ga_outsourcings')
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

  async importExcelOutsourcing(
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
    const invalidRow = await this.writeToFirestoreOutsourcing(
      data,
      schemaValidation
    );
    return invalidRow;
  }
}
