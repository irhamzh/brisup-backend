import { IVendorBase } from '@modules/MasterData/Vendor/interface/vendor.interface';

export interface IEvaluasiATKBase {
  tanggal: Date;
  vendor: IVendorBase;
  performance: number;
  remark: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Performace = [1, 2, 3, 4];
