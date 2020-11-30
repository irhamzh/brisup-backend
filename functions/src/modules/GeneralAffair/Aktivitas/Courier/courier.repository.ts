import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import BaseRepository from '@repositories/baseRepository';

import { ICourierBase } from './interface/courier.interface';

export default class CourierRepository extends BaseRepository<ICourierBase> {
  _basementModel: admin.firestore.CollectionReference;
  constructor() {
    super('ga_activities', 'ga_activity'); //rename
    this._basementModel = db.collection('ga_activities');
  }
  async createCourier(object: ICourierBase) {
    const data = await this.createWithSubdocument(
      object,
      'courier',
      'ga-couriers'
    );
    return data;
  }
  async updateCourier(id: string, object: Partial<ICourierBase>) {
    const data = await this.updateSubDocument(
      id,
      object,
      'courier',
      'ga-couriers'
    );
    return data;
  }
}
