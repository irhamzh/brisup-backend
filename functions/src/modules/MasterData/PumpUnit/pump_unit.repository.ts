import BaseRepository from '@repositories/baseRepository';

import { IPumpUnitBase } from './interface/pump_unit.interface';

export default class PumpUnitRepository extends BaseRepository<IPumpUnitBase> {
  constructor() {
    super('pump_units', 'pump_unit', 'bri_corpu_pump_units');
  }
}
