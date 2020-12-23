import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import BaseRepository from '@repositories/baseRepository';
import applyFilterQuery from '@utils/applyFilterQuery';
import firestoreTimeStampToDate from '@utils/firestoreTimeStampToDate';

import { IFormasiBase } from './interface/formasi_pekerja.interface';

export default class FormasiRepository extends BaseRepository<IFormasiBase> {
  _formasiModel: admin.firestore.CollectionReference;
  constructor() {
    super('ga_employe_formations', 'ga_employe_formation');
    this._formasiModel = db.collection('ga_employe_formations');
  }

  async findAllFormasi(
    page: number | string = 1,
    limit: number | string = 10,
    filtered: string,
    sorted: string
  ) {
    const parsedPage = parseInt(page as string);
    const parsedLimit = parseInt(limit as string);
    let skip = (parsedPage - 1) * parsedLimit || 1;
    if (parsedPage > 1) {
      skip = Number(skip) + 1;
    }
    let query = filtered
      ? applyFilterQuery(this._collection, JSON.parse(filtered))
      : this._collection;

    const first = await query.limit(skip).get();
    if (first.docs.length <= 0 || first.docs.length < skip) {
      return [];
    }
    const last = first.docs[first.docs.length - 1];

    const ref = await query.startAt(last).limit(parsedLimit).get();
    const data: admin.firestore.DocumentData = [];
    ref.forEach((doc: firebase.firestore.DocumentData) => {
      const currentData = doc.data();
      const sisa =
        Number(currentData.formasi) || 0 - Number(currentData.pemenuhan) || 0;
      const snap = { id: doc.id, ...currentData, sisa };
      return data.push(snap);
    });
    return firestoreTimeStampToDate(data);
  }
}
