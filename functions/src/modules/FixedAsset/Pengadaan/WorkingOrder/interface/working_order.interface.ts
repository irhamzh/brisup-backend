export interface IWorkingOrderBase {
  kodeWorkingOrder: string;
  namaKegiatan: string;
  typeKegiatan: string;
  kodePelatihan: string;
  tanggalTerima: Date;
  tanggalRevisi: Date;
  tanggalKonfirmasi: Date;
  catering: string;
  atk: string;
  hotel: string;
  akomodasi: string;
  pengajarEksternal: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum TypeKegiatan {
  'Kegiatan Pendidikan' = 'Kegiatan Pendidikan',
  'Kegiatan Lain' = 'Kegiatan Lain',
}

// interface IKebutuhan {
//   catering: string;
//   atk: string;
//   hotel: string;
//   akomodasi: string;
//   pengajarEksternal: string;
// }
