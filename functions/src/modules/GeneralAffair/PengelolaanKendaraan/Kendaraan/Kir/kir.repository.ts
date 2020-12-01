import BaseRepository from '@repositories/baseRepository';

import { IKIRBase } from './interface/kir.interface';

export default class VehicleKIRRepository extends BaseRepository<IKIRBase> {
  constructor() {
    super('ga_vehicles', 'vehicle');
  }
  async createKIR(object: IKIRBase) {
    const data = await this.createWithSubdocument(object, 'kir', 'ga_kirs');
    return data;
  }
  async updateKIR(id: string, object: Partial<IKIRBase>) {
    const data = await this.updateSubDocument(id, object, 'kir', 'ga_kirs');
    return data;
  }
}
