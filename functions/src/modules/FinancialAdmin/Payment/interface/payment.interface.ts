export interface ICashBase {
  tanggal: Date;
  nominal: number;
  unitKerjaTujuan: string;
  lampiran: string[];
  information: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BasePayment {
  tanggal: Date;
  typePayment: string;
  seksi: string;
  lampiran: string[];
  information: string;
}

export enum TypePayment {
  Kelogisitikan = 'Kelogisitikan',
  'Tagihan BBM' = 'Tagihan BBM',
  'Tagihan Service Kendaraan' = 'Tagihan Service Kendaraan',
  'Tagihan Sewa BUS' = 'Tagihan Sewa BUS',
  'Tagihan Rekreasi Siswa' = 'Tagihan Rekreasi Siswa',
  'Tagihan Biaya Rohani, Humas, Representasi, dan Rapat' = 'Tagihan Biaya Rohani, Humas, Representasi, dan Rapat',
  'Tagihan Brimedika' = 'Tagihan Brimedika',
  'Penihilan PAUK' = 'Penihilan PAUK',
  'Public Course' = 'Public Course',
  'Tagihan S2 Luar dan Dalam Negeri' = 'Tagihan S2 Luar dan Dalam Negeri',
  Waperd = 'Waperd',
  Honor = 'Honor',
  'Salary Creaditing' = 'Salary Creaditing',
  'Pembayaran Lainnya' = 'Pembayaran Lainnya',
  Catering = 'Catering',
  'Jasa Pendidikan' = 'Jasa Pendidikan',
  Hotel = 'Hotel',
  'Akomodasi Asrama' = 'Akomodasi Asrama',
}
