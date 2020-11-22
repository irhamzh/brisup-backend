import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import BaseRepository from '@repositories/baseRepository';

import {
  ISanitationBase,
  ISanitationYard,
  ISanitationSmartBuilding,
  ISaranaPendukungMushola,
  ISaranaPendukungPos,
  IRuang,
  ISelasarLobby,
  ITanggaSelasar,
  IToilet,
} from './interface/sanitation.interface';

export default class BuildingSanitationRepository extends BaseRepository<
  ISanitationBase
> {
  _buildingSanitationModel: admin.firestore.CollectionReference;
  constructor() {
    super('pg-building-sanitations', 'pg-building-sanitation');
    this._buildingSanitationModel = db.collection('pg-building-sanitations');
  }
  async createYardSanitation(object: ISanitationYard) {
    const data = await this.createWithSubdocument(object, 'yard', 'pg-yard');
    return data;
  }
  async updateYardSanitation(id: string, object: Partial<ISanitationYard>) {
    const data = await this.updateSubDocument(id, object, 'yard', 'pg-yard');
    return data;
  }
  async createSmartBuildingSanitation(object: ISanitationSmartBuilding) {
    const data = await this.createWithSubdocument(
      object,
      'smart-building',
      'pg-smart-building'
    );
    return data;
  }
  async updateSmartBuildingSanitation(
    id: string,
    object: Partial<ISanitationSmartBuilding>
  ) {
    const data = await this.updateSubDocument(
      id,
      object,
      'smart-building',
      'pg-smart-building'
    );
    return data;
  }

  async createMusholaSanitation(object: ISaranaPendukungMushola) {
    const data = await this.create2LevelSubDocument(
      object,
      'saran-pendukung',
      'pg-saran-pendukung',
      'mushola',
      'pg-mushola'
    );
    return data;
  }
  async updateMusholaSanitation(
    id: string,
    object: Partial<ISaranaPendukungMushola>
  ) {
    const data = await this.update2LevelSubDocument(
      id,
      object,
      'saran-pendukung',
      'pg-saran-pendukung',
      'mushola',
      'pg-mushola'
    );
    return data;
  }
  async createSecurityPosSanitation(object: ISaranaPendukungPos) {
    const data = await this.create2LevelSubDocument(
      object,
      'saran-pendukung',
      'pg-saran-pendukung',
      'security-pos',
      'pg-security-pos'
    );
    return data;
  }

  async updateSecurityPosSanitation(
    id: string,
    object: Partial<ISaranaPendukungPos>
  ) {
    const data = await this.update2LevelSubDocument(
      id,
      object,
      'saran-pendukung',
      'pg-saran-pendukung',
      'security-pos',
      'pg-security-pos'
    );
    return data;
  }
  async createInnovationBuilding(
    object: IRuang | ISelasarLobby | ITanggaSelasar | IToilet
  ) {
    const data = await this.createWithSubdocument(
      object,
      'innovation-building',
      'pg-innovation-building'
    );
    return data;
  }

  async updateInnovationBuilding(
    id: string,
    object: Partial<IRuang | ISelasarLobby | ITanggaSelasar | IToilet>
  ) {
    const data = await this.updateSubDocument(
      id,
      object,
      'innovation-building',
      'pg-innovation-building'
    );
    return data;
  }
}
