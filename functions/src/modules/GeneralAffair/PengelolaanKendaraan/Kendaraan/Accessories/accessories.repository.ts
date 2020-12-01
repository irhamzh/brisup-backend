import BaseRepository from '@repositories/baseRepository';

import { IAccesoriesBase } from './interface/accesories.interface';

export default class VehicleAccessoriesRepository extends BaseRepository<
  IAccesoriesBase
> {
  constructor() {
    super('ga_vehicles', 'vehicle');
  }
  async createAccessories(object: IAccesoriesBase) {
    const data = await this.createWithSubdocument(
      object,
      'accessories',
      'ga_accessories'
    );
    return data;
  }
  async updateAccessories(id: string, object: Partial<IAccesoriesBase>) {
    const data = await this.updateSubDocument(
      id,
      object,
      'accessories',
      'ga_accessories'
    );
    return data;
  }
}
