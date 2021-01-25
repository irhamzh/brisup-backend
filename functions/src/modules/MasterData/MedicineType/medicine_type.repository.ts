import BaseRepository from '@repositories/baseRepository';

import { IMedicineTypeBase } from './interface/medicine_type.interface';

export default class LocationRepository extends BaseRepository<
  IMedicineTypeBase
> {
  constructor() {
    super('medicine_types', 'medicine_type', 'bri_corpu_medicine_types');
  }
}
