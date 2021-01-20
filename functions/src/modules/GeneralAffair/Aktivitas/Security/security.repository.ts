import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import BaseRepository from '@repositories/baseRepository';

import { IBasementBase } from './interface/security.interface';

export default class EngineerBasementRepository extends BaseRepository<
  IBasementBase
> {
  _basementModel: admin.firestore.CollectionReference;
  constructor() {
    super('ga_activities', 'ga_activity'); //rename
    this._basementModel = db.collection('ga_activities');
  }
  async createSecurity(object: IBasementBase) {
    const data = await this.createWithSubdocument(
      object,
      'security',
      'ga_securities'
    );
    return data;
  }
  async updateSecurity(
    id: string,
    object: Partial<IBasementBase>,
    fileFieldName: string
  ) {
    const data = await this.updateSubDocument(
      id,
      object,
      'security',
      'ga_securities',
      fileFieldName
    );
    return data;
  }
}
