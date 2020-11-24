import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import BaseRepository from '@repositories/baseRepository';

import {
  IBasementBase,
  IEngineerBasementWater,
  IEngineerBasementAC,
  IEngineerBasementElectrify,
  IEngineerBasementPlumbing,
  IEngineerBasementSTP,
} from './interface/basement.interface';

export default class EngineerBasementRepository extends BaseRepository<
  IBasementBase
> {
  _basementModel: admin.firestore.CollectionReference;
  constructor() {
    super('pg-basements', 'pg-basement'); //rename
    this._basementModel = db.collection('pg-basements');
  }
  async createWaterMeter(object: IEngineerBasementWater) {
    const data = await this.createWithSubdocument(
      object,
      'water-meter',
      'pg-water-meters'
    );
    return data;
  }
  async updateWaterMeter(id: string, object: Partial<IEngineerBasementWater>) {
    const data = await this.updateSubDocument(
      id,
      object,
      'water-meter',
      'pg-water-meters'
    );
    return data;
  }
  async createElectrify(object: IEngineerBasementElectrify) {
    const data = await this.createWithSubdocument(
      object,
      'electricity',
      'pg-electricities'
    );
    return data;
  }
  async updateElectrify(
    id: string,
    object: Partial<IEngineerBasementElectrify>
  ) {
    const data = await this.updateSubDocument(
      id,
      object,
      'electricity',
      'pg-electricities'
    );
    return data;
  }
  async createAC(object: IEngineerBasementAC) {
    const data = await this.createWithSubdocument(object, 'ac', 'pg-acs');
    return data;
  }
  async updateAC(id: string, object: Partial<IEngineerBasementAC>) {
    const data = await this.updateSubDocument(id, object, 'ac', 'pg-acs');
    return data;
  }
  async createPlumbing(object: IEngineerBasementPlumbing) {
    const data = await this.createWithSubdocument(
      object,
      'plumbing',
      'pg-plumbings'
    );
    return data;
  }
  async updatePlumbing(id: string, object: Partial<IEngineerBasementPlumbing>) {
    const data = await this.updateSubDocument(
      id,
      object,
      'plumbing',
      'pg-plumbings'
    );
    return data;
  }
  async createSTP(object: IEngineerBasementSTP) {
    const data = await this.createWithSubdocument(object, 'stp', 'pg-stps');
    return data;
  }
  async updateSTP(id: string, object: Partial<IEngineerBasementSTP>) {
    const data = await this.updateSubDocument(id, object, 'stp', 'pg-stps');
    return data;
  }
}
