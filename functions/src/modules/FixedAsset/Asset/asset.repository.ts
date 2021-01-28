import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import { StringKeys } from '@interfaces/BaseInterface';

import BaseRepository from '@repositories/baseRepository';
import validationWording from '@constants/validationWording';

import { IAssetBase } from '@modules/FixedAsset/Asset/interface/asset.interface';
import { IUserDecoded } from '@modules/MasterData/User/interface/user.interface';
import { ApprovalStatusAsset } from './interface/asset.interface';

export default class AssetRepository extends BaseRepository<IAssetBase> {
  _assetModel: admin.firestore.CollectionReference;
  constructor() {
    super('fx_assets', 'fx_asset', 'bri_corpu_fx_assets');
    this._assetModel = db.collection('fx_assets');
  }

  async deleteMultiple(assetIds: string[]) {
    const batch = db.batch();
    for (const asset of assetIds) {
      const ref = this._assetModel.doc(asset);
      batch.delete(ref);
    }
    return batch.commit();
  }

  async pengajuanPenghapusbukuan(assetIds: string[], user: IUserDecoded) {
    const batchCommits = [];
    const invalidRow: StringKeys[] = [];

    let batch = db.batch();
    for (let i = 0; i < assetIds.length; i++) {
      // -> defined docref
      const docRef = this._assetModel.doc(assetIds[i]);

      // -> check exist
      // -> skp if not exist
      const snap = await docRef.get();
      if (!snap.exists) {
        invalidRow.push({
          id: assetIds[i],
          error: validationWording.notFound('asset'),
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
          id: assetIds[i],
          name: data?.name,
          error: `Untuk diajukan ke Penghapusbukuan, asset harus berada dalam status "${ApprovalStatusAsset['Approved oleh Supervisor I']}". Status sekarang "${data?.status}"`,
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
