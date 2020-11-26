import { IProviderBase } from '@modules/Provider/interface/provider.interface';

export interface IEvaluasiATKBase {
  tanggal: Date;
  provider: IProviderBase;
  performance: number;
  remark: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Performace = [1, 2, 3, 4];
