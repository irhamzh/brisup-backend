import BaseRepository from '@repositories/baseRepository';

import { ITaxBase } from './interface/tax.interface';

export default class VehicleTaxRepository extends BaseRepository<ITaxBase> {
  constructor() {
    super('ga_vehicles', 'vehicle');
  }
  async createTax(object: ITaxBase) {
    const data = await this.createWithSubdocument(object, 'tax', 'ga_taxes');
    return data;
  }
  async updateTax(id: string, object: Partial<ITaxBase>) {
    const data = await this.updateSubDocument(id, object, 'tax', 'ga_taxes');
    return data;
  }
}
