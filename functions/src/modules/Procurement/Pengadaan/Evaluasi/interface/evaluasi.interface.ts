import { IProviderBase } from '@modules/Provider/interface/provider.interface';
import {
  IPengadaanBarangdanJasa,
  IPengadaanJasaKonsultan,
  IPengadaanSwakelolaPembelian,
} from '@modules/FixedAsset/Pengadaan/PengadaanBarang/interface/pengadaan.interface';
export interface IEvaluasiSuplierBase {
  tanggal: Date;
  pengadaan:
    | IPengadaanBarangdanJasa
    | IPengadaanJasaKonsultan
    | IPengadaanSwakelolaPembelian;
  provider: IProviderBase;
  nilai: number;
  information: string;
  createdAt?: Date;
  updatedAt?: Date;
}
