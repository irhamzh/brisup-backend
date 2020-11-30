import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import BaseRepository from '@repositories/baseRepository';

import { IP3kBase } from './interface/p3k.interface';

export default class EngineerBasementRepository extends BaseRepository<
  IP3kBase
> {
  _basementModel: admin.firestore.CollectionReference;
  constructor() {
    super('ga_activities', 'ga_activity'); //rename
    this._basementModel = db.collection('ga_activities');
  }
  async createP3k(object: IP3kBase) {
    const data = await this.createWithSubdocument(
      object,
      'first-aid-kit',
      'ga-first-aid-kits'
    );
    return data;
  }
  async updateP3k(id: string, object: Partial<IP3kBase>) {
    const data = await this.updateSubDocument(
      id,
      object,
      'first-aid-kit',
      'ga-first-aid-kits'
    );
    return data;
  }
}
