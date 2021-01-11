import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import { StringKeys } from '@interfaces/BaseInterface';
import BaseRepository from '@repositories/baseRepository';
import validationWording from '@constants/validationWording';
import { IUserDecoded } from '@modules/MasterData/User/interface/user.interface';
import { IAssetBase } from '@modules/FixedAsset/Asset/interface/asset.interface';
import { ApprovalStatusAsset } from './interface/asset.interface';
export default class AssetRepository extends BaseRepository<IAssetBase> {
  _assetModel: admin.firestore.CollectionReference;
  constructor() {
    super('assets', 'aset');
    this._assetModel = db.collection('assets');
  }

  async getAssetArray(assetsIds: string[]) {
    // const first = await this._collection
    //   .where('country', 'in', ['USA', 'Japan']).get();
    //   .get();
  }
  async deleteMultiple(assetIds: string[]) {
    const batch = db.batch();
    for (const asset of assetIds) {
      const ref = this._assetModel.doc(asset);
      batch.delete(ref);
    }
    return batch.commit();
  }

  async pengajuanPenghapusbukuan(persekotIds: string[], user: IUserDecoded) {
    const batchCommits = [];
    const invalidRow: StringKeys[] = [];

    let batch = db.batch();
    for (let i = 0; i < persekotIds.length; i++) {
      // -> defined docref
      const docRef = this._assetModel.doc(persekotIds[i]);

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
        ApprovalStatusAsset['Approved oleh Supervisor I'].toLowerCase() !==
        data?.status?.toLowerCase()
      ) {
        invalidRow.push({
          id: persekotIds[i],
          name: data?.name,
          error: `Untuk diajukan ke Penghapusbukuan, Persekot harus berada dalam status "${ApprovalStatusAsset['Approved oleh Supervisor I']}". Status sekarang "${data?.status}"`,
        });
        continue;
      }

      // -> Update Data
      const log = {
        status: ApprovalStatusAsset['Diajukan Penghapusbukuan'],
        date: new Date(),
        userId: user.uid,
        name: user.name,
        role: user.role.name,
      };
      const approvalLog = [...data.approvalLog, log];

      // -> execute update data
      batch.set(
        docRef,
        {
          status: ApprovalStatusAsset['Diajukan Penghapusbukuan'],
          approvalLog,
        },
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
