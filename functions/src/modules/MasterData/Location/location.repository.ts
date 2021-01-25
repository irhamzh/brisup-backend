import BaseRepository from '@repositories/baseRepository';

import { ILocationBase } from './interface/location.interface';

export default class LocationRepository extends BaseRepository<ILocationBase> {
  constructor() {
    super('locations', 'location', 'bri_corpu_locations');
  }
}
