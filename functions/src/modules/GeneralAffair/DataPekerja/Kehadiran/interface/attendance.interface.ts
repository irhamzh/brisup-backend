export interface IAttendanceBase {
  type: string;
  tanggal: Date;
  name: string;
  jumlahHadir: number;
  jumlahTidakHadir: number;
  jumlahCuti: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Type = [
  'Pegawai Tetap',
  'Outsourcing Man Powe',
  'Security',
  'Driver',
];
