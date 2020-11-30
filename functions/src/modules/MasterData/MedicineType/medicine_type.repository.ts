import BaseRepository from '@repositories/baseRepository';

import { IMedicineTypeBase } from './interface/medicine_type.interface';

export default class LocationRepository extends BaseRepository<
  IMedicineTypeBase
> {
  constructor() {
    super('medicine-types', 'medicine-type');
  }
}
