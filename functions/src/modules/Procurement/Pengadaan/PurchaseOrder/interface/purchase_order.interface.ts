import { IProviderBase } from '@modules/Provider/interface/provider.interface';
import {
  IPengadaanBarangdanJasa,
  IPengadaanJasaKonsultan,
  IPengadaanSwakelolaPembelian,
} from '@modules/FixedAsset/Pengadaan/PengadaanBarang/interface/pengadaan.interface';

export interface IPurchaseOrderBase {
  tanggal: Date;
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
