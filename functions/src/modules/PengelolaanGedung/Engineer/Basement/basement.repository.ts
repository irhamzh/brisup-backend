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
    super('pg_basements', 'pg_basement'); //rename
    this._basementModel = db.collection('pg_basements');
  }
  async createWaterMeter(object: IEngineerBasementWater) {
    const data = await this.createWithSubdocument(
      object,
      'water_meter',
      'pg_water_meters'
    );
    return data;
  }
  async updateWaterMeter(id: string, object: Partial<IEngineerBasementWater>) {
    const data = await this.updateSubDocument(
      id,
      object,
      'water_meter',
      'pg_water_meters'
    );
    return data;
  }
  async createElectrify(object: IEngineerBasementElectrify) {
    const data = await this.createWithSubdocument(
      object,
      'electricity',
      'pg_electricities'
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
      'pg_electricities'
    );
    return data;
  }
  async createAC(object: IEngineerBasementAC) {
    const data = await this.createWithSubdocument(object, 'ac', 'pg_acs');
    return data;
  }
  async updateAC(id: string, object: Partial<IEngineerBasementAC>) {
    const data = await this.updateSubDocument(id, object, 'ac', 'pg_acs');
    return data;
  }
  async createPlumbing(object: IEngineerBasementPlumbing) {
    const data = await this.createWithSubdocument(
      object,
      'plumbing',
      'pg_plumbings'
    );
    return data;
  }
  async updatePlumbing(id: string, object: Partial<IEngineerBasementPlumbing>) {
    const data = await this.updateSubDocument(
      id,
      object,
      'plumbing',
      'pg_plumbings'
    );
    return data;
  }
  async createSTP(object: IEngineerBasementSTP) {
    const data = await this.createWithSubdocument(object, 'stp', 'pg_stps');
    return data;
  }
  async updateSTP(id: string, object: Partial<IEngineerBasementSTP>) {
    const data = await this.updateSubDocument(id, object, 'stp', 'pg_stps');
    return data;
  }
}
