import { IProviderBase } from '@modules/Provider/interface/provider.interface';
import {
  IPengadaanBarangdanJasa,
  IPengadaanJasaKonsultan,
  IPengadaanSwakelolaPembelian,
} from '@modules/FixedAsset/Pengadaan/PengadaanBarang/interface/pengadaan.interface';

export interface ITerimaBarangBase {
  tanggal: Date;
  pengadaan:
    | IPengadaanBarangdanJasa
    | IPengadaanJasaKonsultan
    | IPengadaanSwakelolaPembelian;
  provider: IProviderBase;
  jenisPekerjaan: string;
  jumlahBarang: number;
  hargaBarang: number;
  information: string;
  createdAt?: Date;
  updatedAt?: Date;
}
