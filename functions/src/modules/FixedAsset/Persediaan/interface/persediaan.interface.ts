import { IJenisBarangBase } from '@modules/MasterData/JenisBarang/interface/jenis_barang.interface';

export interface IPersediaanBase {
  name: string;
  jenisBarang: IJenisBarangBase;
  tanggal: Date;
  stokAwal: number;
  penambahan: number;
  pengurangan: number;
  stokAkhir: number;
  createdAt?: Date;
  updatedAt?: Date;
}
