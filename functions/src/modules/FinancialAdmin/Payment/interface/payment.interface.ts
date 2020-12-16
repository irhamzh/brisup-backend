import { Division } from '@constants/BaseCondition';

interface IBasePayment {
  tanggal: Date;
  typePayment: string;
  typePendidikan: string;
  seksi: string;
  status: string;
  biaya: number;
  lampiran: string[];
  information: string;
}

export interface IDataKelogistikan extends IBasePayment {
  kegiatan: string;
  izinPrinsipPengadaan: boolean;
  invoiceBermateraiKwitansi: boolean;
  fakturPajak: boolean;
  ktpAtauNpwp: boolean;
  notaPembukuan: boolean;
}

export interface ITagihanBBM extends IBasePayment {
  namaPembayaran: string;
  invoiceSPBUBermaterai: boolean;
  rekapStrukPerTransaksi: boolean;
  notaPembukuan: boolean;
}

export interface ITagihanServiceKendaraan extends IBasePayment {
  namaPembayaran: string;
  invoiceBermaterai: boolean;
  fakturPajak: boolean;
  notaPembukuan: boolean;
}

export interface ITagihanSewaBus extends IBasePayment {
  namaPembayaran: string;
  invoice: boolean;
  workingOrder: boolean;
  notaPembukuan: boolean;
}

export interface ITagihanRekreasiSiswa extends IBasePayment {
  namaPembayaran: string;
  tiketKwitansiBukti: boolean;
  rekapBiaya: boolean;
  suratKeteranganRekreasiLOP: boolean;
  workingOrder: boolean;
  notaPembukuan: boolean;
}

export interface ITagihanRohaniHumasRepresentasiRapat extends IBasePayment {
  namaPembayaran: string;
  invoice: boolean;
  notaPembukuan: boolean;
}

export interface ITagihanBrimedika extends IBasePayment {
  invoiceBermaterai: boolean;
  copySPK: boolean;
  notaPembukuan: boolean;
}

export interface IPenihilanPAUK extends IBasePayment {
  namaPAUK: string;
  printPAUK: boolean;
  kodePelatihan: boolean;
}

export interface IPublicCourse extends IBasePayment {
  namaPendidikan: string;
  periode: string;
  invoiceBermaterai: boolean;
  suratPemanggilan: boolean;
  dataBrismart: boolean;
  anggaranKegiatan: boolean;
  fakturPajakBagiWapu: boolean;
}

export interface ITagihanS2 extends IBasePayment {
  namaPendidikan: string;
  periodeBulan: string;
  suratPerintahBayar: boolean;
  suratkeKCK: boolean;
  anggaranKegiatan: boolean;
  rekeningTujuan: boolean;
}

export interface IAAJIWaperd extends IBasePayment {
  namaAsuransi: string;
  suratPerintahBayar: boolean;
}

export interface IHonorSalaryCreaditing extends IBasePayment {
  namaAsuransi: string;
  suratPerintahBayar: boolean;
  cekLainnnya: boolean;
}

export interface IPembayaranLainnya extends IBasePayment {
  namaPembayaran: string;
  invoiceBermaterai: boolean;
  cekKesesuaianPembayaran: boolean;
}

export interface ICatering extends IBasePayment {
  namaPendidikan: string;
  periode: string;
  invoiceBermaterai: boolean;
  copySPKPKS: boolean;
  evaluasiBrismart: boolean;
  suratPemesanan: boolean;
  prd: boolean;
}

export interface IJasaPendidikan extends IBasePayment {
  namaPendidikan: string;
  invoiceBermaterai: boolean;
  bast: string;
  laporanPelaksanaanPekerjaan: string;
  evaluasiBrismart: string;
  suratKonfirmasiPemanggilan: string;
  copySPKPKS: string;
  suratPemesanan: string;
  prd: string;
  copyNPWPbagiprovidernonPKP: string;
  daftarHadir: string;
}

export interface IHotel extends IBasePayment {
  namaPendidikan: string;
  periode: string;
  invoiceBermaterai: boolean;
  copySPKPKS: boolean;
  evaluasiBrismart: boolean;
  rekapBiayaHotel: boolean;
  suratPemesanan: boolean;
  fakturPajak: boolean;
  absensiHotel: boolean;
  room: boolean;
  laundry: boolean;
  dinner: boolean;
}

export interface IAkomodasiAsrama extends IBasePayment {
  namaPendidikan: string;
  periode: string;
  invoiceBermaterai: boolean;
  copySPKPKS: boolean;
  evaluasiBrismart: boolean;
  suratPemesanan: boolean;
  fakturPajak: boolean;
  absensiAkomodasi: boolean;
}

export enum TypePayment {
  Kelogistikan = 'Kelogistikan',
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

export const UtilPayment: {
  [key: string]: {
    [key: string]: string;
  };
} = {
  Kelogisitikan: {
    typePendidikan: 'Non Pendidikan',
    seksi: Division['Fixed Asset'],
  },
  'Tagihan Service Kendaraan': {
    typePendidikan: 'Non Pendidikan',
    seksi: Division['General Affair'],
  },
  'Tagihan BBM': {
    typePendidikan: 'Non Pendidikan',
    seksi: Division['General Affair'],
  },
  'Tagihan Sewa BUS': {
    typePendidikan: 'Non Pendidikan',
    seksi: Division['General Affair'],
  },
  'Tagihan Rekreasi Siswa': {
    typePendidikan: 'Non Pendidikan',
    seksi: Division['General Affair'],
  },
  'Tagihan Biaya Rohani, Humas, Representasi, dan Rapat': {
    typePendidikan: 'Non Pendidikan',
    seksi: Division['General Affair'],
  },
  'Tagihan Brimedika': {
    typePendidikan: 'Pendidikan',
    seksi: Division['General Affair'],
  },
  'Penihilan PAUK': {
    typePendidikan: 'Non Pendidikan',
    seksi: Division['Financial Admin'],
  },
  'Public Course': {
    typePendidikan: 'Pendidikan',
    seksi: Division['Financial Admin'],
  },
  'Tagihan S2 Luar dan Dalam Negeri': {
    typePendidikan: 'Pendidikan',
    seksi: Division['Financial Admin'],
  },
  Waperd: {
    typePendidikan: 'Pendidikan',
    seksi: Division['Financial Admin'],
  },
  Honor: {
    typePendidikan: 'Pendidikan',
    seksi: Division['Financial Admin'],
  },
  'Salary Creaditing': {
    typePendidikan: 'Pendidikan',
    seksi: Division['Financial Admin'],
  },
  'Pembayaran Lainnya': {
    typePendidikan: 'Pendidikan',
    seksi: Division['Financial Admin'],
  },
  Catering: {
    typePendidikan: 'Pendidikan',
    seksi: Division['Procurement'],
  },
  'Jasa Pendidikan': {
    typePendidikan: 'Pendidikan',
    seksi: Division['Procurement'],
  },
  Hotel: {
    typePendidikan: 'Pendidikan',
    seksi: Division['Procurement'],
  },
  'Akomodasi Asrama': {
    typePendidikan: 'Pendidikan',
    seksi: Division['Procurement'],
  },
};

// Kelogistikan;
// tanggal:2020-10-10;
// typePayment:Kelogisitikan;
// information:Aaaaa;
// kegiatan:Ammar;
// izinPrinsipPengadaan:true;
// invoiceBermateraiKwitansi:true;
// fakturPajak:true;
// ktpAtauNpwp:true;
