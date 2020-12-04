import PengadaanRepository from '@repositories/pengadaanRepository';

import { ITerimaBarangBase } from './interface/tanda_terima_barang.interface';

type CreateParam = Omit<ITerimaBarangBase, 'provider' | 'pengadaan'>;
export default class TandaTerimaBarangRepository extends PengadaanRepository<
  CreateParam
> {
  constructor() {
    super(
      'pr_pengadaan_tanda_terima_barangs',
      'pr_pengadaan_tanda_terima_barang'
    );
  }
}
