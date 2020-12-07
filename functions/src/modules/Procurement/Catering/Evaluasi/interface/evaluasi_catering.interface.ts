import { IWorkingOrderBase } from '@modules/WorkingOrder/interface/working_order.interface';
import { ICateringBase } from '@modules/MasterData/Catering/interface/catering.interface';

export interface IEvaluasiCateringBase {
  tanggal: Date;
  catering: ICateringBase;
  workingOrder: IWorkingOrderBase;
  performance: string;
  penyajian: string;
  sampleMakan: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Performace = ['Puas', 'Tidak Puas'];

export const Penyajian = ['Baik', 'Tidak Baik'];

export const SampleMakanan = ['Enak', 'Tidak Enak'];
