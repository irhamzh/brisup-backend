import BaseRepository from '@repositories/baseRepository';

import { IInvestasiAnggaran } from './interface/investasi.interface';

export default class InvestasiAnggaranRepository extends BaseRepository<
  IInvestasiAnggaran
> {
  constructor() {
    super('fa_anggaran_investations', 'fa_anggaran_investation');
  }
}
