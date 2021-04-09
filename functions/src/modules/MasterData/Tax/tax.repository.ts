import BaseRepository from '@repositories/baseRepository';

import { ITaxBase } from './interface/tax.interface';

export default class TaxRepository extends BaseRepository<ITaxBase> {
  constructor() {
    super('taxes', 'tax', 'bri_corpu_taxes');
  }
}
