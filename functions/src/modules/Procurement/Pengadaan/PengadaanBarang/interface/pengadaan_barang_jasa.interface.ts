import { IApprovalLog } from '@interfaces/BaseInterface';
import { IProviderBase } from '@modules/MasterData/Provider/interface/provider.interface';
import { IEducationBase } from '@modules/MasterData/Education/interface/education.interface';

// interface ApprovedBy {
//   userId: string;
//   name: string;
// role:string;
//   approvedAt: Date;
// }

interface IPengadaan {
  jenisPengadaan: string;
  typePengadaan: string;
  namaPengadaan: string;
  provider?: IProviderBase;
  izinPrinsipPengadaan: boolean;
  izinHasilPengadaan: boolean;
  suratPemesanan: boolean;
  information: string;
  status: string;
  approvalLog: IApprovalLog[];
  isDraft: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ITanggalAwalAkhir extends IPengadaan {
  tanggalAwal: Date;
  tanggalAkhir: Date;
}

export interface IPenunjukanLangsung extends ITanggalAwalAkhir {
  izinPrinsipPengadaan: boolean;
  tor: boolean;
  proposalPenawaran: boolean;
  undangan: boolean;
  klarifikasiNegosiasi: boolean;
  nomorSPK: string;
  namaPendidikan: string | IEducationBase;
  jumlahPeserta: number;
  durasi: string;
  jumlahBiaya: number;
  masaBerlaku: string;
}
export interface IPembelianLangsung extends ITanggalAwalAkhir {
  anggaranBiaya: boolean;
}

export interface IPemilihanLangsung extends IPengadaan {
  tanggal: Date;
  izinPrinsipPengadaan: boolean;
  tor: boolean;
  proposalPenawaran: boolean;
  undangan: boolean;
  klarifikasiNegosiasi: boolean;
  nomorSPK: string;
  namaPendidikan: string | IEducationBase;
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
