export interface IRekreasiBase {
  tanggal: Date;
  name: string;
  jumlahSiswa: number;
  pic: string;
  formPermintaanLop: boolean;
  ijinPenugasan: boolean;
  biayaRekreasi: boolean;
  laporanRekreasi: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
