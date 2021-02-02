import { IProviderBase } from '@modules/MasterData/Provider/interface/provider.interface';
import { IWorkingOrderBase } from '@modules/WorkingOrder/interface/working_order.interface';

export interface IProcurementATKBase {
  tanggal: Date;
  workingOrder: IWorkingOrderBase;
  provider: IProviderBase;
  noSuratPesanan: string;
  kebutuhan: string;
  barang: IBarang[];
  performance?: number;
  remark?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IBarang {
  nama: string; // digati karena masalah fe
  price: number;
  qty: number;
  other?: string;
}

export const ListBarang = [
  'Bolpoin',
  'Buku tulis',
  'Blocknote',
  'Baterai',
  'Pouch',
  'Spidol',
  'Lain lain',
];

export const EvaluasiValue = [1, 2, 3, 4];
