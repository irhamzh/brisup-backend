import BaseRepository from '@repositories/baseRepository';

import { IWaterMeterBase } from './interface/water_meter.interface';

export default class WaterMeterRepository extends BaseRepository<
  IWaterMeterBase
> {
  constructor() {
    super('water-meters', 'water-meter');
  }
}
