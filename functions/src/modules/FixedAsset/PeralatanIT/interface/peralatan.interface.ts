import { IRuanganBase } from '@modules/MasterData/Ruangan/interface/ruangan.interface';
import { IJenisPCBase } from '@modules/MasterData/JenisPC/interface/jenis_pc.interface';
interface IPeralatan {
  jenisPeralatan: string;
  merk: string;
  sn: string;
  ruangan: IRuanganBase;
  condition: string;
  information?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum JenisPeralatan {
  'Sound' = 'Sound',
  'Printer dan Scanner' = 'Printer dan Scanner',
  'Laptop' = 'Laptop',
  'Infocus' = 'Infocus',
  'PC' = 'PC',
}
export interface IPeralatanBase {
  model: string;
}

export interface IPeralatanInfocus extends IPeralatanBase {
  tanggal: Date;
  lampTimer: string;
  gantiLampu: string;
}
export interface IPeralatanPC extends IPeralatan {
  namaPengguna: string;
  jenisPc: IJenisPCBase;
  jumlahPc: number;
  snMonitor: string;
  jumlahMonitor: number;
}
