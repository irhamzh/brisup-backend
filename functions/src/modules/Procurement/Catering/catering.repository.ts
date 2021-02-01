import BaseRepository from '@repositories/baseRepository';

import { IProcurementCateringBase } from './interface/catering.interface';

export default class ProcurementCateringRepository extends BaseRepository<
  IProcurementCateringBase
> {
  constructor() {
    super('pr_caterings', 'catering', 'bri_corpu_pr_caterings');
  }
}
