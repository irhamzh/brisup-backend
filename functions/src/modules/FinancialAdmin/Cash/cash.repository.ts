import BaseRepository from '@repositories/baseRepository';

import { ICashBase } from './interface/cash.interface';

export default class CashRepositoryRepository extends BaseRepository<
  ICashBase
> {
  constructor() {
    super('fa_cashes', 'fa_cash', 'bri_corpu_fa_cashes');
  }
}
