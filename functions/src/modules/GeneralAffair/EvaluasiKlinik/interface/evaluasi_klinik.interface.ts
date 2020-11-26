export interface IEvaluasiKlinikBase {
  tanggal: Date;
  performance: string;
  information: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum Performance {
  'Puas' = 'Puas',
  'Tidak Puas' = 'Tidak Puas',
}
