import { IProviderBase } from '@modules/Provider/interface/provider.interface';
export interface ITerimaBarangBase {
  pengadaan: string; //ganti dengan Pengadaan Interface
  provider: IProviderBase;
  jumlah: number;
  createdAt?: Date;
  updatedAt?: Date;
}
