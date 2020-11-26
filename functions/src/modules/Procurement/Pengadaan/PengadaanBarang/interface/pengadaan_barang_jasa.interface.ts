import { IProviderBase } from '@modules/Provider/interface/provider.interface';
import { IEducationBase } from '@modules/MasterData/Education/interface/education.interface';

interface IPengadaan {
  typePengadaan: string;
  jenisPengadaan: string;
  namaPengadaan: string;
  provider: IProviderBase;
  izinPrinsipPengadaan: boolean;
  izinHasilPengadaan: boolean;
  suratPemesanan: boolean;
  information: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ITanggalAwalAkhir extends IPengadaan {
  tanggalAwal: Date;
  tanggalAkhir: Date;
}

export interface IPembelianLangusng extends ITanggalAwalAkhir {
  anggaranBiaya: boolean;
}

export interface IPenunjukanLangsung extends ITanggalAwalAkhir {
  izinPrinsipPengadaan: boolean;
  tor: boolean;
  proposalPenawaran: boolean;
  undangan: boolean;
  klarifikasiNegosiasi: boolean;
  nomorSPK: string;
  namaPendidikan: IEducationBase;
  jumlahPeserta: number;
  durasi: string;
  jumlahBiaya: number;
  masaBerlaku: string;
}

export interface IPemilihanLangsung extends IPengadaan {
  tanggal: Date;
  izinPrinsipPengadaan: boolean;
  tor: boolean;
  proposalPenawaran: boolean;
  undangan: boolean;
  klarifikasiNegosiasi: boolean;
  nomorSPK: string;
  namePendidikan: IEducationBase;
  jumlahPeserta: number;
  durasi: string;
  jumlahBiaya: number;
  masaBerlaku: string;
}

export enum TypePengadaan {
  'Penunjukan Langsung' = 'Penunjukan Langsung',
  'Pembelian Langsung' = 'Pembelian Langsung',
  'Pemilihan Langsung' = 'Pemilihan Langsung',
}

export enum JenisPengadaan {
  barang = 'barang',
  jasa = 'jasa',
}
