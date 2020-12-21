import BaseRepository from '@repositories/baseRepository';

import { IEksploitasiAnggaran } from './interface/eksploitasi.interface';

export default class EksplotasiAnggaranRepository extends BaseRepository<
  IEksploitasiAnggaran
> {
  constructor() {
    super('fa_anggaran_exploitations', 'fa_anggaran_exploitation');
  }
}
