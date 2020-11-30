import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import BaseRepository from '@repositories/baseRepository';

import { IRekreasiBase } from './interface/rekreasi.interface';

export default class RekreasiRepository extends BaseRepository<IRekreasiBase> {
  _basementModel: admin.firestore.CollectionReference;
  constructor() {
    super('ga_activities', 'ga_activity'); //rename
    this._basementModel = db.collection('ga_activities');
  }
  async createRekreasi(object: IRekreasiBase) {
    const data = await this.createWithSubdocument(
      object,
      'recreation',
      'ga_recreations'
    );
    return data;
  }
  async updateRekreasi(id: string, object: Partial<IRekreasiBase>) {
    const data = await this.updateSubDocument(
      id,
      object,
      'recreation',
      'ga_recreations'
    );
    return data;
  }
}
