import { IWorkingOrderBase } from '@modules/WorkingOrder/interface/working_order.interface';
import { IEducationBase } from '@modules/MasterData/Education/interface/education.interface';

export interface IStokOpnameATKBase {
  tanggal: Date;
  workingOrder: IWorkingOrderBase;
  education: IEducationBase;
  barang: IBarang[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface IBarang {
  nama: string; // digati karena masalah fe
  stockAwal: number;
  jumlahMasuk: number;
  jumlahKeluar: number;
  stockAkhir: number;
}
