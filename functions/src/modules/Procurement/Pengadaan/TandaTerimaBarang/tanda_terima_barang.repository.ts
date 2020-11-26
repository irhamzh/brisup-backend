import BaseRepository from '@repositories/baseRepository';
import { ITerimaBarangBase } from './interface/tanda_terima_barang.interface';

export default class TandaTerimaBarangRepository extends BaseRepository<
  ITerimaBarangBase
> {
  constructor() {
    super(
      'pr_pengadaan_tanda_terima_barangs',
      'pr_pengadaan_tanda_terima_barang'
    );
  }
}
