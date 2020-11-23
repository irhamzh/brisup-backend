import { IProviderBase } from '@modules/Provider/interface/provider.interface';

interface IPengadaan {
  typePengadaan: string;
  jenisPengadaan: string;
  tanggalPengadaan: Date;
  namaPengadaan: string;
  jenisAnggaran: string;
  izinPrinsipUser?: boolean;
  izinPrinsipPengadaan?: boolean;
  izinHasilPengadaan?: boolean;
  undangan?: boolean;
  klarifikasiNegosiasi?: boolean;
  aanwijzing?: boolean;
  pengumumanPemenang?: boolean;
  pemasukanSampulProposalTeknis?: boolean;
  penilaianProposalTeknis?: boolean;
  pembukuanProposalFinancial?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IPengadaanSPK extends IPengadaan {
  tanggalSPK: Date;
  nomorSPK: string;
  provider: IProviderBase;
  jenisPekerjaan: string;
  jumlahBiaya: number;
  jenisBarang: string;
  masaBerlaku: Date;
  sampai: Date;
}

export interface IPengadaanSwakelolaPembelian extends IPengadaan {
  biayaPutusan: number;
  provider?: IProviderBase;
}

//kecuali swakelola dan pembelian langsung
export interface IPengadaanBarangdanJasa extends IPengadaanSPK {}
export interface IPengadaanJasaKonsultan extends IPengadaanSPK {
  biayaPutusan: number;
}

export enum JenisPengadaanBarang {
  'Penunjukan Langsung' = 'Penunjukan Langsung',
  'Swakelola' = 'Swakelola',
  'Pembelian Langsung' = 'Pembelian Langsung',
  'Pemilihan Langsung' = 'Pemilihan Langsung',
  'Lelang' = 'Lelang',
}
export enum JenisPengadaan {
  'Penunjukan Langsung' = 'Penunjukan Langsung',
  'Swakelola' = 'Swakelola',
  'Pembelian Langsung' = 'Pembelian Langsung',
  'Pemilihan Langsung' = 'Pemilihan Langsung',
  'Seleksi Langsung' = 'Seleksi Langsung',
  'Lelang' = 'Lelang',
}

export enum JenisPengadaanJasaKonsultan {
  'Penunjukan Langsung' = 'Penunjukan Langsung',
  'Seleksi Langsung' = 'Seleksi Langsung',
}

export enum TypePengadaan {
  'barang' = 'barang',
  'konsultan' = 'konsultan',
}

// Jenis Pengadaan *
// Tanggal Pengadaan *
// Nama Pengadaan *
// Jenis Anggaran *
// Biaya Putusan *

// Tanggal SPK *
// Nomor SPK *
// Nama Provider *
// Jenis Pekerjaan *
// Jumlah Biaya *
// Jenis Barang *
// Masa Berlaku *
// Sampai *

// Penunjukan Langsung
// Izin Prinsip User
// Izin Prinsip Pengadaan
// Undangan
// Klarifikasi dan negosiasi
// Izin Hasil Pengadaan

// Seleksi Langsung
// Izin Prinsip User
// Izin Prinsip Pengadaan
// Undangan
// Aanwijzing
// Klarifikasi dan negosiasi
// Izin Hasil Pengadaan
// Pengumuman Pemenang
