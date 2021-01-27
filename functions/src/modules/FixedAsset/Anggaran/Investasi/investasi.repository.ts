import BaseRepository from '@repositories/baseRepository';

import { IInvestasiAnggaran } from './interface/investasi.interface';

export default class InvestasiAnggaranRepository extends BaseRepository<
  IInvestasiAnggaran
> {
  constructor() {
    super('fx_anggaran_investations', 'fx_anggaran_investation');
  }
}
