import { IApprovalLog } from '@interfaces/BaseInterface';

export interface IAssetBase {
  name: string;
  information: string;
  condition: string;
  status: string;
  approvalLog: IApprovalLog[];
  createdAt?: Date;
  updatedAt?: Date;
}

export enum AssetCondition {
  'Baik' = 'Baik',
  'Belum Ditentukan' = 'Belum Ditentukan',
  'Buruk' = 'Buruk',
}
