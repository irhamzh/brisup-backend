export interface IAnggaranBase {
  year: number;
  month: number;
  breakdown: number;
  sisaAnggaran: number;
  typeAnggaran: string;
  penggunaan: IPenggunaan[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPenggunaan {
  nilai: number;
  tanggalPembukuan: Date;
  keperluan: string;
  pelimpahan: string;
  tanggalPelimpahan: Date;
}

export const Perlimpahan = ['Done', 'Not Yet'];
export const TypeAnggaran = ['Humas', 'Representatif', 'Rapat'];
