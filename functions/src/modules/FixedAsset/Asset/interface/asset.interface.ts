export interface IAssetBase {
  name: string;
  information: string;
  condition: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum AssetCondition {
  'Baik' = 'Baik',
  'Belum Ditentukan' = 'Belum Ditentukan',
  'Buruk' = 'Buruk',
}
