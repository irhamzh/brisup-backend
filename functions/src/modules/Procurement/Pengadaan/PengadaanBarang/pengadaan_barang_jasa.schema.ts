import * as yup from 'yup';

import getAllEnumKey from '@utils/getAllEnumKeys';
import validationWording from '@constants/validationWording';
import {
  JenisPengadaan,
  TypePengadaan,
} from './interface/pengadaan_barang_jasa.interface';

const baseCreate = yup
  .object()
  .shape({
    typePengadaan: yup
      .mixed<keyof typeof TypePengadaan>()
      .oneOf(
        getAllEnumKey(TypePengadaan),
        validationWording.oneOf(
          'type Pengadaan',
          ...getAllEnumKey(TypePengadaan)
        )
      )
      .required(validationWording.required('type Pengadaan')),
    jenisPengadaan: yup
      .mixed<keyof typeof JenisPengadaan>()
      .oneOf(
        getAllEnumKey(JenisPengadaan),
        validationWording.oneOf(
          'Jenis Pengadaan',
          ...getAllEnumKey(JenisPengadaan)
        )
      )
      .required(validationWording.required('jenis Pengadaan')),
    namaPengadaan: yup
      .string()
      .required(validationWording.required('nama Pengadaan')),
    provider: yup.string(),
    izinPrinsipPengadaan: yup
      .boolean()
      .required(validationWording.required('Izin Prinsip Pengadaan')),
    izinHasilPengadaan: yup
      .boolean()
      .required(validationWording.required('Izin Hasil Pengadaan')),
    suratPemesanan: yup
      .boolean()
      .required(validationWording.required('surat Pemesanan')),
    information: yup
      .string()
      .required(validationWording.required('information')),
  })
  .required();

const baseUpdate = yup
  .object()
  .shape({
    jenisPengadaan: yup
      .mixed<keyof typeof JenisPengadaan>()
      .oneOf(
        getAllEnumKey(JenisPengadaan),
        validationWording.oneOf(
          'Jenis Pengadaan',
          ...getAllEnumKey(JenisPengadaan)
        )
      ),
    namaPengadaan: yup.string(),
    provider: yup.string(),
    izinPrinsipPengadaan: yup.boolean(),
    izinHasilPengadaan: yup.boolean(),
    suratPemesanan: yup.boolean(),
    information: yup.string(),
  })
  .required();

const createTanggalAwalAkhir = yup
  .object()
  .shape({
    tanggalAwal: yup.date().required(validationWording.required('tanggalAwal')),
    tanggalAkhir: yup
      .date()
      .required(validationWording.required('tanggalAkhir')),
  })
  .required();

const updateTanggalAwalAkhir = yup
  .object()
  .shape({
    tanggalAwal: yup.date(),
    tanggalAkhir: yup.date(),
  })
  .required();

const createPembelianLansung = yup
  .object()
  .shape({
    anggaranBiaya: yup
      .boolean()
      .required(validationWording.required('Anggaran Biaya')),
  })
  .required()
  .concat(baseCreate)
  .concat(createTanggalAwalAkhir);

const updatePembelianLansung = yup
  .object()
  .shape({
    anggaranBiaya: yup.boolean(),
  })
  .required()
  .concat(baseUpdate)
  .concat(updateTanggalAwalAkhir);

const createPenunjukanLangsung = yup
  .object()
  .shape({
    izinPrinsipPengadaan: yup
      .boolean()
      .required(validationWording.required('Izin Prinsip Pengadaan')),
    tor: yup.boolean().required(validationWording.required('tor')),
    proposalPenawaran: yup
      .boolean()
      .required(validationWording.required('proposalPenawaran')),
    undangan: yup.boolean().required(validationWording.required('undangan')),
    klarifikasiNegosiasi: yup
      .boolean()
      .required(validationWording.required('klarifikasiNegosiasi')),
    nomorSPK: yup.string().required(validationWording.required('nomor SPK')),
    namaPendidikan: yup
      .string()
      .required(validationWording.required('namaPendidikan')),
    jumlahPeserta: yup
      .number()
      .required(validationWording.required('jumlahPeserta')),
    durasi: yup.string().required(validationWording.required('durasi')),
    jumlahBiaya: yup
      .number()
      .required(validationWording.required('jumlahBiaya')),
    masaBerlaku: yup
      .string()
      .required(validationWording.required('masaBerlaku')),
  })
  .required()
  .concat(baseCreate)
  .concat(createTanggalAwalAkhir);

const updatePenunjukanLangsung = yup
  .object()
  .shape({
    izinPrinsipPengadaan: yup.boolean(),
    tor: yup.boolean(),
    proposalPenawaran: yup.boolean(),
    undangan: yup.boolean(),
    klarifikasiNegosiasi: yup.boolean(),
    nomorSPK: yup.string(),
    namaPendidikan: yup.string(),
    jumlahPeserta: yup.number(),
    durasi: yup.string(),
    jumlahBiaya: yup.number(),
    masaBerlaku: yup.string(),
  })
  .required()
  .concat(baseUpdate)
  .concat(updateTanggalAwalAkhir);

const createPemilihanLangsung = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    izinPrinsipPengadaan: yup
      .boolean()
      .required(validationWording.required('Izin Prinsip Pengadaan')),
    tor: yup.boolean().required(validationWording.required('tor')),
    proposalPenawaran: yup
      .boolean()
      .required(validationWording.required('proposalPenawaran')),
    undangan: yup.boolean().required(validationWording.required('undangan')),
    klarifikasiNegosiasi: yup
      .boolean()
      .required(validationWording.required('klarifikasiNegosiasi')),
    nomorSPK: yup.string().required(validationWording.required('nomor SPK')),
    namaPendidikan: yup
      .string()
      .required(validationWording.required('namaPendidikan')),
    jumlahPeserta: yup
      .number()
      .required(validationWording.required('jumlahPeserta')),
    durasi: yup.string().required(validationWording.required('durasi')),
    jumlahBiaya: yup
      .number()
      .required(validationWording.required('jumlahBiaya')),
    masaBerlaku: yup
      .string()
      .required(validationWording.required('masaBerlaku')),
  })
  .required()
  .concat(baseCreate);

const updatePemilihanLangsung = yup
  .object()
  .shape({
    tanggal: yup.date(),
    izinPrinsipPengadaan: yup.boolean(),
    tor: yup.boolean(),
    proposalPenawaran: yup.boolean(),
    undangan: yup.boolean(),
    klarifikasiNegosiasi: yup.boolean(),
    nomorSPK: yup.string(),
    namaPendidikan: yup.string(),
    jumlahPeserta: yup.number(),
    durasi: yup.string(),
    jumlahBiaya: yup.number(),
    masaBerlaku: yup.string(),
  })
  .required()
  .concat(baseUpdate);

export default {
  baseCreate,
  createPembelianLansung,
  createPenunjukanLangsung,
  createPemilihanLangsung,
  updatePembelianLansung,
  updatePenunjukanLangsung,
  updatePemilihanLangsung,
};
