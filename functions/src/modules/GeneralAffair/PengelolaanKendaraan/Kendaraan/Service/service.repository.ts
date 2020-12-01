import BaseRepository from '@repositories/baseRepository';

import { IServiceBase } from './interface/service.interface';

export default class VehicleServiceRepository extends BaseRepository<
  IServiceBase
> {
  constructor() {
    super('ga_vehicles', 'vehicle');
  }
  async createService(object: IServiceBase) {
    const data = await this.createWithSubdocument(
      object,
      'service',
      'ga_services'
    );
    return data;
  }
  async updateService(id: string, object: Partial<IServiceBase>) {
    const data = await this.updateSubDocument(
      id,
      object,
      'service',
      'ga_services'
    );
    return data;
  }
}
