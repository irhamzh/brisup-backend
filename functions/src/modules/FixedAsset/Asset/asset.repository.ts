import BaseRepository from '@repositories/baseRepository';
import { IAssetBase } from '@modules/FixedAsset/Asset/interface/asset.interface';
import { db } from '@utils/admin';
import * as admin from 'firebase-admin';

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
}
