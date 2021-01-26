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
    super('pg_building_sanitations', 'pg_building_sanitation'); //rename
    this._buildingSanitationModel = db.collection('pg_building_sanitations');
  }

  async createYardSanitation(object: ISanitationYard) {
    const data = await this.createWithSubdocument(object, 'yard', 'pg_yard');
    return data;
  }
  async updateYardSanitation(id: string, object: Partial<ISanitationYard>) {
    const data = await this.updateSubDocument(id, object, 'yard', 'pg_yard');
    return data;
  }

  async createSmartBuildingSanitation(object: ISanitationSmartBuilding) {
    const data = await this.createWithSubdocument(
      object,
      'smart_building',
      'pg_smart_building'
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
      'smart_building',
      'pg_smart_building'
    );
    return data;
  }

  async createInnovationBuilding(
    object: IRuang | ISelasarLobby | ITanggaSelasar | IToilet
  ) {
    const data = await this.createWithSubdocument(
      object,
      'innovation_building',
      'pg_innovation_building'
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
      'innovation_building',
      'pg_innovation_building'
    );
    return data;
  }

  async createSaranaPendukung(
    object: ISaranaPendukungMushola | ISaranaPendukungPos
  ) {
    const data = await this.createWithSubdocument(
      object,
      'sarana_pendukung',
      'pg_sarana_pendukung'
    );
    return data;
  }
  async updateSaranaPendukung(
    id: string,
    object: Partial<ISaranaPendukungPos | ISaranaPendukungMushola>
  ) {
    const data = await this.updateSubDocument(
      id,
      object,
      'sarana_pendukung',
      'pg_sarana_pendukung'
    );
    return data;
  }
}
