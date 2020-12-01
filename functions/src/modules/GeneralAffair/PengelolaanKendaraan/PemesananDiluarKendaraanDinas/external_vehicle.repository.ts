import BaseRepository from '@repositories/baseRepository';

import {
  IReimburseExternalVehicle,
  IOrderExternalVehicle,
} from './interface/external_vehicle.interface';

export default class MonitoringCCTVRepository extends BaseRepository<
  IReimburseExternalVehicle | IOrderExternalVehicle
> {
  constructor() {
    super('ga_external_vehicles', 'ga_external_vehicle');
  }
}
