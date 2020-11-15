import BaseRepository from '@repositories/baseRepository';
import { ITerimaBarangBase } from '@modules/FixedAsset/Pengadaan/TandaTerimaBarang/interface/tanda_terima_barang.interface';

export default class TandaTerimaBarangRepository extends BaseRepository<
  ITerimaBarangBase
> {
  constructor() {
    super('tanda_terima_barangs', 'tanda_terima_barang');
  }
}
