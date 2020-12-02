export interface IEmployeeBase {
  name: string;
  nip: string;
  pernr: string;
  age: number;
  position: string;
  jobgrade: string;
  mkjg: string;
  pg: string;
  mkpg: string;
  levelJabatan?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// export const Type = [
//   'Pegawai Tetap',
//   'Outsourcing Man Power',
//   'Security',
//   'Driver',
// ];
