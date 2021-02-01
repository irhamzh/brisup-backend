import { ICateringBase } from '@modules/MasterData/Catering/interface/catering.interface';
import { IWorkingOrderBase } from '@modules/WorkingOrder/interface/working_order.interface';

export interface IProcurementCateringBase {
  tanggal: Date;
  workingOrder: IWorkingOrderBase;
  catering: ICateringBase;
  noSuratPesanan: string;
  kebutuhan: string;
  menu: ICateringMenu[];
  performance?: number;
  penyajian?: number;
  sampleMakan?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ICateringMenu {
  nama: string; // digati karena masalah fe
  price: number;
  qty: number;
  other?: string;
}

export const ListMenuCatering = [
  'Snack Pagi',
  'Snack Sore',
  'Snack Malam',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Spesial',
  'Lain-lain',
];
export const EvaluasiValue = [1, 2, 3, 4];
