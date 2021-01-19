import { IWorkingOrderBase } from '@modules/WorkingOrder/interface/working_order.interface';
import { ICateringBase } from '@modules/MasterData/Catering/interface/catering.interface';

export interface IConsumptionBase {
  tanggal: Date;
  consumptionType: string;
  workingOrder: IWorkingOrderBase;
  catering: ICateringBase;
  noSuratPesanan: string;
  kebutuhan: string;
  menu: ICateringMenu[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface ICateringMenu {
  nama: string; // digati karena masalah fe
  price: number;
}

export const ConsumptionType = ['Sosialisasi', 'Rapat', 'Kegiatan Lain'];
