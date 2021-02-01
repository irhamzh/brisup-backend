import BaseRepository from '@repositories/baseRepository';

import { IProcurementATKBase } from './interface/atk.interface';

export default class ATKRepository extends BaseRepository<IProcurementATKBase> {
  constructor() {
    super('pr_atks', 'atks', 'bri_corpu_pr_atks');
  }
}
