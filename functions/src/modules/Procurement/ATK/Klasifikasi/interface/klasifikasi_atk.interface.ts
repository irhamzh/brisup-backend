import { IWorkingOrderBase } from '@modules/FixedAsset/Pengadaan/WorkingOrder/interface/working_order.interface';
import { IProviderBase } from '@modules/Provider/interface/provider.interface';

export interface IKlasifikasiATKBase {
  tanggal: Date;
  workingOrder: IWorkingOrderBase;
  provider: IProviderBase;
  noSuratPesanan: string;
  kebutuhan: string;
  barang: IBarang[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface IBarang {
  name: string;
  price: number;
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
