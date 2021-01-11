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

export enum ApprovalStatusAsset {
  'Unapproved' = 'Unapproved',
  'Approved oleh Supervisor I' = 'Approved oleh Supervisor I',
  'Diajukan Penghapusbukuan' = 'Diajukan Penghapusbukuan',
  'Approved oleh Supervisor II' = 'Approved oleh Supervisor II',
  'Approved oleh Wakabag' = 'Approved oleh Wakabag',
  'Approved oleh Kabag' = 'Approved oleh Kabag',
}

export enum ApprovalNextStatusAsset {
  'Unapproved' = 'Approved oleh Supervisor I',
  'Approved oleh Supervisor I' = 'Diajukan Penghapusbukuan',
  'Diajukan Penghapusbukuan' = 'Approved oleh Supervisor II',
}
