export interface IAnggaranBase {
  year: number;
  month: number;
  totalBreakdown: number;
  sisaAnggaran: number;
  categoryAnggaran: string;
  detail: IPenggunaan[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPenggunaan {
  id: string;
  type: string;
  nilai: number;
  tanggalPembukuan?: Date;
  keperluan?: string;
  pelimpahan?: string;
  tanggalPelimpahan?: Date;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAnggaran {
  year: number;
  month: number;
  categoryAnggaran: string;
  type: string;
  nilai: number;
  id?: string;
  tanggalPembukuan?: Date;
  keperluan?: string;
  pelimpahan?: string;
  tanggalPelimpahan?: Date;
  status?: string;
}

export const Pelimpahan = ['Done', 'Not Yet'];
export const CategoryAnggaran = ['Humas', 'Representatif', 'Rapat'];
export enum TypeAnggaran {
  'Breakdown' = 'Breakdown',
  'Penggunaan' = 'Penggunaan',
}
