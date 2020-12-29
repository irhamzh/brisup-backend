import { db } from '@utils/admin';
import * as admin from 'firebase-admin';
import NotFoundError from '@interfaces/NotFoundError';
import BaseRepository from '@repositories/baseRepository';
import validationWording from '@constants/validationWording';

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
}
