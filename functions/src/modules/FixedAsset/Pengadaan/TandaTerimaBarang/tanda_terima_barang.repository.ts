import BaseRepository from '@repositories/baseRepository';
import { ITerimaBarangBase } from '@modules/FixedAsset/Pengadaan/TandaTerimaBarang/interface/tanda_terima_barang.interface';

export default class TandaTerimaBarangRepository extends BaseRepository<
  ITerimaBarangBase
> {
  constructor() {
    super(
      'fx_tanda_terima_barangs',
      'fx_tanda_terima_barang',
      'bri_corpu_fx_tanda_terima_barangs'
    );
  }
}
