import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import BaseRepository from '@repositories/baseRepository';

import { IDriverBase } from './interface/driver.interface';

export default class DriverRepository extends BaseRepository<IDriverBase> {
  _basementModel: admin.firestore.CollectionReference;
  constructor() {
    super('ga_activities', 'ga_activity'); //rename
    this._basementModel = db.collection('ga_activities');
  }
  async createDriver(object: IDriverBase) {
    const data = await this.createWithSubdocument(
      object,
      'driver',
      'ga_drivers'
    );
    return data;
  }
  async updateDriver(
    id: string,
    object: Partial<IDriverBase>,
    fileFieldName: string
  ) {
    const data = await this.updateSubDocument(
      id,
      object,
      'driver',
      'ga_drivers',
      fileFieldName
    );
    return data;
  }
}
