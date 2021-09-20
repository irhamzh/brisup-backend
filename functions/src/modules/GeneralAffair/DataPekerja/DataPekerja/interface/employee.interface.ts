import { IFormasiBase } from '@modules/GeneralAffair/DataPekerja/FormasiPekerja/interface/formasi_pekerja.interface';

export interface IEmployeeBase {
  name: string;
  nip: string;
  pernr: string;
  sex: string;
  dateOfBird: Date;
  age: number;
  position: string;
  jobgrade: string;
  mkjg: string;
  pg: string;
  mkpg: string;
  formasi: Pick<IFormasiBase, 'unitKerja' | 'levelJabatan'> | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// export const Type = [
//   'Pegawai Tetap',
//   'Outsourcing Man Power',
//   'Security',
//   'Driver',
// ];

export const Sex = ['L', 'P'];
