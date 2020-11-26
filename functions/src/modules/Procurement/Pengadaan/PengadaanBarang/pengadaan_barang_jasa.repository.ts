import BaseRepository from '@repositories/baseRepository';

import {
  IPembelianLangusng,
  IPemilihanLangsung,
  IPenunjukanLangsung,
} from './interface/pengadaan_barang_jasa.interface';

export default class PengadaanRepository extends BaseRepository<
  IPembelianLangusng | IPemilihanLangsung,
  IPenunjukanLangsung
> {
  constructor() {
    super('pr_pengadaan_jasa_barangs', 'pr_pengadaan_jasa_barang');
  }
}
