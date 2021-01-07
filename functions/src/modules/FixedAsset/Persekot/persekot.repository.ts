import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import { StringKeys } from '@interfaces/BaseInterface';
import BaseRepository from '@repositories/baseRepository';
import validationWording from '@constants/validationWording';
import { IUserDecoded } from '@modules/MasterData/User/interface/user.interface';

import {
  IPersekotBase,
  ApprovalStatus,
  IPersekotFinancialAdmin,
} from './interface/persekot.interface';

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

  async pengajuanPenihilan(persekotIds: string[], user: IUserDecoded) {
    const batchCommits = [];
    const invalidRow: StringKeys[] = [];

    let batch = db.batch();
    for (let i = 0; i < persekotIds.length; i++) {
      // -> defined docref
      const docRef = this._persekotModel.doc(persekotIds[i]);

      // -> check exist
      // -> skp if not exist
      const snap = await docRef.get();
      if (!snap.exists) {
        invalidRow.push({
          id: persekotIds[i],
          error: validationWording.notFound('persekot'),
        });
        continue;
      }

      // -> get data
      const data = snap.data();
      if (
        ApprovalStatus['Approved oleh Supervisor I'].toLowerCase() !==
        data?.status?.toLowerCase()
      ) {
        invalidRow.push({
          id: persekotIds[i],
          name: data?.name,
          error: `Untuk diajukan ke Penihilan, Persekot harus berada dalam status "${ApprovalStatus['Approved oleh Supervisor I']}". Status sekarang "${data?.status}"`,
        });
        continue;
      }

      // -> Update Data
      const log = {
        status: ApprovalStatus['Diajukan Penihilan'],
        date: new Date(),
        userId: user.uid,
        name: user.name,
        role: user.role.name,
      };
      const approvalLog = [...data.approvalLog, log];

      // -> execute update data
      batch.set(
        docRef,
        { status: ApprovalStatus['Diajukan Penihilan'], approvalLog },
        { merge: true }
      );
      if ((i + 1) % 500 === 0) {
        console.log(`Writing records[i] ${i + 1}`);
        batchCommits.push(batch.commit());
        batch = db.batch();
      }
    }
    batchCommits.push(batch.commit());
    await Promise.all(batchCommits);
    return invalidRow;
  }
}
