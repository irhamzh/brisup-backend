import { db } from '@utils/admin';
import * as admin from 'firebase-admin';
import NotFoundError from '@interfaces/NotFoundError';
import BaseRepository from '@repositories/baseRepository';
import validationWording from '@constants/validationWording';

import {
  ISistemManajemenKinerjaBase,
  IPenilaian,
} from './interface/sistem_manajemen_kinerja.interface';

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
}
