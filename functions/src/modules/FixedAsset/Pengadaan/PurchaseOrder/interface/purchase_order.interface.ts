import { IProviderBase } from '@modules/Provider/interface/provider.interface';
export interface IPurchaseOrderBase {
  pengadaan: string; //ganti dengan Pengadaan Interface
  provider: IProviderBase;
  jumlah: number;
  hargaSatuan: number;
  totalHarga: number;
  createdAt?: Date;
  updatedAt?: Date;
}
