export interface IItemBase {
  name: string;
  typeItem: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export enum TypeItem {
  fisik = 'fisik',
  jaringan = 'jaringan',
}
