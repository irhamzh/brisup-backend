import BaseRepository from '@repositories/baseRepository';

import {
  IPembelianLangsung,
  IPemilihanLangsung,
  IPenunjukanLangsung,
} from './interface/pengadaan_barang_jasa.interface';

export default class PengadaanRepository extends BaseRepository<
  IPenunjukanLangsung | IPemilihanLangsung | IPembelianLangsung
> {
  constructor() {
    super('pr_pengadaan_jasa_barangs', 'pr_pengadaan_jasa_barang');
  }
}
