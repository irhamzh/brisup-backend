import { IProviderBase } from '@modules/MasterData/Provider/interface/provider.interface';
import {
  IPengadaanBarangdanJasa,
  IPengadaanJasaKonsultan,
  IPengadaanSwakelolaPembelian,
} from '@modules/FixedAsset/Pengadaan/PengadaanBarang/interface/pengadaan.interface';
export interface ITerimaBarangBase {
  pengadaan:
    | IPengadaanBarangdanJasa
    | IPengadaanJasaKonsultan
    | IPengadaanSwakelolaPembelian;
  provider?: IProviderBase;
  jumlah: number;
  information?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
