export interface IWorkingOrderBase {
  division: string;
  kodeWorkingOrder: string;
  namaKegiatan: string;
  typeKegiatan: string;
  kodePelatihan: string;
  tanggalTerima: Date;
  status: string;
  tanggalRevisi?: Date;
  tanggalKonfirmasi?: Date;
  catering?: string;
  atk?: string;
  hotel?: string;
  akomodasi?: string;
  pengajarEksternal?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum TypeKegiatan {
  'Kegiatan Pendidikan' = 'Kegiatan Pendidikan',
  'Kegiatan Lain' = 'Kegiatan Lain',
}

export enum TypeGeneralAffair {
  'Sosialisasi' = 'Sosialisasi',
  'Kegiatan Lain' = 'Kegiatan Lain',
  'Rapat' = 'Rapat',
}

// interface IKebutuhan {
//   catering: string;
//   atk: string;
//   hotel: string;
//   akomodasi: string;
//   pengajarEksternal: string;
// }
