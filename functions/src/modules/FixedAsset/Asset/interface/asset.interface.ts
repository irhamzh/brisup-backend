export interface IAssetBase {
  name: string;
  information: string;
  condition: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum AssetCondition {
  good = 'Baik',
  undefined = 'Belum Ditentukan',
  bad = 'Buruk',
}
