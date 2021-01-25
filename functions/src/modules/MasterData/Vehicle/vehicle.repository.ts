import BaseRepository from '@repositories/baseRepository';

import { IVehicleBase } from './interface/vehicle.interface';

export default class LocationRepository extends BaseRepository<IVehicleBase> {
  constructor() {
    super('vehicles', 'vehicle', 'bri_corpu_vehicles');
  }
}
