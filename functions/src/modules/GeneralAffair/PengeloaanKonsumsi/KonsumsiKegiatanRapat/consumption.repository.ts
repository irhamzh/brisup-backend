import BaseRepository from '@repositories/baseRepository';

import { IConsumptionBase } from './interface/consumption.interface';

export default class KlasifikasiCateringRepository extends BaseRepository<
  IConsumptionBase
> {
  constructor() {
    super('ga_consumption', 'consumption', 'bri_corpu_ga_consumption');
  }
}
