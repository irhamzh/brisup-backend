import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import BaseRepository from '@repositories/baseRepository';
import firestoreTimeStampToDate from '@utils/firestoreTimeStampToDate';

import { IPersediaanBase } from './interface/persediaan.interface';
export default class PersediaanRepository extends BaseRepository<
  IPersediaanBase
> {
  _persediaanModel: admin.firestore.CollectionReference;
  constructor() {
    super('fx_persediaans', 'fx_persediaan', 'bri_corpu_fx_persediaans');
    this._persediaanModel = db.collection('fx_persediaans');
  }

  async updatePersediaanById(id: string, object: Partial<IPersediaanBase>) {
    const snap = await this.findByIdWithoutFormat(id);
    const data = snap.data();

    const stokAwal = Number(object.stokAwal) || Number(data?.stokAwal);
    const penambahan = Number(object.penambahan) || Number(data?.penambahan);
    const pengurangan = Number(object.pengurangan) || Number(data?.pengurangan);
    const stokAkhir = stokAwal + penambahan - pengurangan || 0;

    const createParam = {
      ...object,
      pengurangan,
      penambahan,
      stokAwal,
      stokAkhir,
      updatedAt: new Date(),
    };
    await this._collection.doc(id).set(createParam, { merge: true });
    const updateSnap = await this._collection.doc(id).get();
    return firestoreTimeStampToDate({
      id,
      ...updateSnap.data(),
    });
  }
}
