import BaseRepository from '@repositories/baseRepository';

import { IPumpBase } from './interface/pump.interface';

export default class PumpRepository extends BaseRepository<IPumpBase> {
  constructor() {
    super('pumps', 'pump', 'bri_corpu_pumps');
  }
}
