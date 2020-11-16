import { IProviderBase } from '@modules/Provider/interface/provider.interface';
export interface IEvaluasiSuplierBase {
  pengadaan: string; //ganti dengan Pengadaan Interface
  provider: IProviderBase;
  nilai: number;
  createdAt?: Date;
  updatedAt?: Date;
}
