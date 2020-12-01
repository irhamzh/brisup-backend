import { IUkerBase } from '@modules/MasterData/Uker/interface/uker.interface';

export interface IAPSBase {
  tanggal: Date;
  uker: IUkerBase;
  name: string;
  status: string;
  information: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Status = ['Selesai', 'Belum Selesai'];
