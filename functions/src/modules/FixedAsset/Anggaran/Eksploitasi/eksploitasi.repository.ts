import BaseRepository from '@repositories/baseRepository';

import { IEksploitasiAnggaran } from './interface/eksploitasi.interface';

export default class EksplotasiAnggaranRepository extends BaseRepository<
  IEksploitasiAnggaran
> {
  constructor() {
    super('fx_anggaran_exploitations', 'fx_anggaran_exploitation');
  }
}
