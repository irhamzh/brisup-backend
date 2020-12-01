import BaseRepository from '@repositories/baseRepository';

import { IAPSBase } from './interface/aps.interface';

export default class APSRepository extends BaseRepository<IAPSBase> {
  constructor() {
    super('ga_employees', 'employee');
  }
  async createAPS(object: IAPSBase) {
    const data = await this.createWithSubdocument(object, 'aps', 'ga_aps');
    return data;
  }
  async updateAPS(id: string, object: Partial<IAPSBase>) {
    const data = await this.updateSubDocument(id, object, 'aps', 'ga_aps');
    return data;
  }
}
