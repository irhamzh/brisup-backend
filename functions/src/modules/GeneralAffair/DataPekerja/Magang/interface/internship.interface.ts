interface IInternshipBase {
  type: string;
  tanggal: Date;
  name: string;
  tahunMasuk: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUniversitas extends IInternshipBase {
  universitas: string;
}

export interface ISMK extends IInternshipBase {
  sekolah: string;
  status: string;
  skor: number;
}

export const Status = ['Rekomendasi', 'Derekomendasi'];

export enum Type {
  'Universitas' = 'Universitas',
  'Sekolah' = 'Sekolah',
}
