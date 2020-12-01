import { IUkerBase } from '@modules/MasterData/Uker/interface/uker.interface';

export interface IOvertimeBase {
  type: string;
  month: string;
  uker: IUkerBase;
  name: string;
  suratPerintahLembur: boolean;
  rekapPerhitunganLembur: boolean;
  formPembayaranUangLembur: boolean;
  absensi: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Type = ['Pramubakti', 'Driver'];
