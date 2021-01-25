import BaseRepository from '@repositories/baseRepository';
import { IJenisBarangBase } from './interface/jenis_barang.interface';

export default class JenisBarang extends BaseRepository<IJenisBarangBase> {
  constructor() {
    super('jenis_barangs', 'jenis_barang', 'bri_corpu_jenis_barangs');
  }
}
