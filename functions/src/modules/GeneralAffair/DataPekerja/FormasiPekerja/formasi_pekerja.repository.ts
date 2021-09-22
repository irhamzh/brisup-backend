import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import NotFoundError from '@interfaces/NotFoundError';
import applyFilterQuery from '@utils/applyFilterQuery';
import BaseRepository from '@repositories/baseRepository';
import validationWording from '@constants/validationWording';
import firestoreTimeStampToDate from '@utils/firestoreTimeStampToDate';

import { IFormasiBase } from './interface/formasi_pekerja.interface';
import InvalidRequestError from '@interfaces/InvalidRequestError';

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

  async validateSisaPemenuhanFormasi(id: string, count: number) {
    const ref: admin.firestore.DocumentReference = this._formasiModel.doc(id);
    const snap: admin.firestore.DocumentSnapshot = await ref.get();
    if (!snap.exists) {
      return {
        error: true,
        message: validationWording.notFound(this._name),
      };
    }

    const oldData = snap.data();
    const sisaPemenuhan =
      Number(oldData?.formasi || 0) -
      (Number(oldData?.pemenuhan || 0) + Number(count));

    return {
      pemenuhan: oldData?.pemenuhan,
      sisaPemenuhan,
      unitKerja: oldData?.unitKerja,
      levelJabatan: oldData?.levelJabatan,
    };
  }

  async setPemenuhanFormasi(id: string, count: number) {
    const ref: admin.firestore.DocumentReference = this._formasiModel.doc(id);
    const updateParam = {
      pemenuhan: count,
      updatedAt: new Date(),
    };
    await ref.set(updateParam, { merge: true });
    const updateSnap = await ref.get();
    return {
      error: false,
      data: firestoreTimeStampToDate({
        id: ref.id,
        ...updateSnap.data(),
      }),
    };
  }

  async addPemenuhan(unitKerja: string, levelJabatan: string) {
    const formasiPemenuhan = await this.findOne(
      '',
      this._formasiModel
        .where('unitKerja', '==', unitKerja)
        .where('levelJabatan', '==', levelJabatan)
    );

    if (!formasiPemenuhan?.id) {
      throw new NotFoundError(
        validationWording.notFound('Formasi'),
        'Data Pekera'
      );
    }

    const sisaPemenuhan =
      Number(formasiPemenuhan?.formasi) - Number(formasiPemenuhan?.pemenuhan);
    if (!sisaPemenuhan || sisaPemenuhan < 1) {
      throw new InvalidRequestError(
        `Alokasi formasi "Unit Kerja  ${formasiPemenuhan?.unitKerja}" "Level Jabatan ${formasiPemenuhan?.levelJabatan}" telah penuh`,
        'Data Pekera'
      );
    }

    const createParam = {
      pemenuhan: Number(formasiPemenuhan?.pemenuhan) + 1,
      updatedAt: new Date(),
    };
    const ref = this._formasiModel.doc(formasiPemenuhan.id);
    await ref.set(createParam, { merge: true });
    const updateSnap = await ref.get();
    const data = updateSnap.data() as IFormasiBase;

    return {
      id: ref.id,
      unitKerja: data.unitKerja,
      levelJabatan: data.levelJabatan,
    };
  }

  async deletePemenuhan(id: string) {
    const ref: admin.firestore.DocumentReference = this._formasiModel.doc(id);
    const snap: admin.firestore.DocumentSnapshot = await ref.get();
    if (snap.exists) {
      const oldData = snap.data();
      const updateParam = {
        pemenuhan: Number(oldData?.pemenuhan) - 1,
        updatedAt: new Date(),
      };
      await ref.set(updateParam, { merge: true });
    }
  }
}
