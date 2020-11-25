import BaseRepository from '@repositories/baseRepository';

import { IStokOpnameATKBase } from './interface/stock_opname.interface';

export default class StockOpnameATKRepository extends BaseRepository<
  IStokOpnameATKBase
> {
  constructor() {
    super('pr_stock_opname_atks', 'stock_opname_atks');
  }
}
