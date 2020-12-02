import { IUkerBase } from '@modules/MasterData/Uker/interface/uker.interface';

export interface IPGSPJSBase {
  penugasan: string;
  tanggal: Date;
  uker: IUkerBase;
  name: string;
  jabatan: string;
  berlakuDari: Date;
  sampaiDengan: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Penugasan = ['PGS', 'PJS'];
