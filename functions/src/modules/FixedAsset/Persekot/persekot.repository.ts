import BaseRepository from '@repositories/baseRepository';
import {
  IPersekotBase,
  IPersekotFinancialAdmin,
} from '@modules/FixedAsset/Persekot/interface/persekot.interface';
import { db } from '@utils/admin';
import * as admin from 'firebase-admin';

export default class PersekotRepository extends BaseRepository<
  IPersekotBase | IPersekotFinancialAdmin
> {
  _persekotModel: admin.firestore.CollectionReference;
  constructor() {
    super('persekots', 'persekot');
    this._persekotModel = db.collection('persekots');
  }

  async deleteMultiple(persekotIds: string[]) {
    const batch = db.batch();
    for (const persekot of persekotIds) {
      const ref = this._persekotModel.doc(persekot);
      batch.delete(ref);
    }
    return batch.commit();
  }

  async pengajuanPenihilan(persekotIds: string[]) {
    const batch = db.batch();
    for (const persekot of persekotIds) {
      const ref = this._persekotModel.doc(persekot);
      batch.delete(ref);
    }
    return batch.commit();
  }
}
