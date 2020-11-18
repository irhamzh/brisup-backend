import { IProviderBase } from '@modules/Provider/interface/provider.interface';
import {
  IPengadaanBarangdanJasa,
  IPengadaanJasaKonsultan,
  IPengadaanSwakelolaPembelian,
} from '@modules/FixedAsset/Pengadaan/PengadaanBarang/interface/pengadaan.interface';
export interface IPurchaseOrderBase {
  pengadaan:
    | IPengadaanBarangdanJasa
    | IPengadaanJasaKonsultan
    | IPengadaanSwakelolaPembelian;
  provider: IProviderBase;
  jumlah: number;
  hargaSatuan: number;
  totalHarga: number;
  createdAt?: Date;
  updatedAt?: Date;
}
