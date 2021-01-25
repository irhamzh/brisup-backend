import { IProviderBase } from '@modules/MasterData/Provider/interface/provider.interface';
import {
  IPengadaanBarangdanJasa,
  IPengadaanJasaKonsultan,
  IPengadaanSwakelolaPembelian,
} from '@modules/FixedAsset/Pengadaan/PengadaanBarang/interface/pengadaan.interface';
export interface IEvaluasiSuplierBase {
  pengadaan:
    | IPengadaanBarangdanJasa
    | IPengadaanJasaKonsultan
    | IPengadaanSwakelolaPembelian;
  provider?: IProviderBase;
  nilai: number;
  createdAt?: Date;
  updatedAt?: Date;
}
