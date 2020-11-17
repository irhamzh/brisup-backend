import BaseRepository from '@repositories/baseRepository';
import {
  IPengadaanSwakelolaPembelian,
  IPengadaanBarangdanJasa,
  IPengadaanJasaKonsultan,
} from './interface/pengadaan.interface';

export default class RoleRepository extends BaseRepository<
  | IPengadaanSwakelolaPembelian
  | IPengadaanBarangdanJasa
  | IPengadaanJasaKonsultan
> {
  constructor() {
    super('pengadaans', 'pengadaan');
  }
}
