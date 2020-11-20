import * as yup from 'yup';
import getAllEnumKey from '@utils/getAllEnumKeys';
import validationWording from '@constants/validationWording';
import { JenisAnggaran } from '@interfaces/BaseInterface';
// import {
//   JenisPengadaanBarang,
//   TypePengadaan,
// } from './interface/pengadaan.interface';

const baseCreate = yup
  .object()
  .shape({
    // typePengadaan: yup
    //   .string()
    //   .required(validationWording.required('typePengadaan')),
    // jenisPengadaan: yup
    //   .string()
    //   .required(validationWording.required('jenisPengadaan')),
    tanggalPengadaan: yup
      .date()
      .required(validationWording.required('tanggalPengadaan')),
    namaPengadaan: yup
      .string()
      .required(validationWording.required('namaPengadaan')),
    jenisAnggaran: yup
      .mixed<keyof typeof JenisAnggaran>()
      .oneOf(
        getAllEnumKey(JenisAnggaran),
        validationWording.oneOf(
          'Jenis Anggaran',
          ...getAllEnumKey(JenisAnggaran)
        )
      )
      .required(validationWording.required('jenisAnggaran')),
  })
  .required();

const createSPK = yup
  .object()
  .shape({
    tanggalSPK: yup.date().required(validationWording.required('Tanggal SPK')),
    nomorSPK: yup.string().required(validationWording.required('nomor SPK')),
    provider: yup.string().required(validationWording.required('provider')),
    jenisPekerjaan: yup
      .string()
      .required(validationWording.required('Jenis Pekerjaan')),
    jumlahBiaya: yup
      .number()
      .required(validationWording.required('Jumlah Biaya')),
    jenisBarang: yup
      .string()
      .required(validationWording.required('Jenis Barang')),
    masaBerlaku: yup
      .date()
      .required(validationWording.required('Masa Berlaku')),
    sampai: yup.date().required(validationWording.required('Sampai')),
  })
  .required();

const baseUpdate = yup
  .object()
  .shape({
    tanggalPengadaan: yup.date(),
    namaPengadaan: yup.string(),
    jenisAnggaran: yup
      .mixed<keyof typeof JenisAnggaran>()
      .oneOf(
        getAllEnumKey(JenisAnggaran),
        validationWording.oneOf(
          'Jenis Anggaran',
          ...getAllEnumKey(JenisAnggaran)
        )
      ),
  })
  .required();

const updateSPK = yup
  .object()
  .shape({
    tanggalSPK: yup.date(),
    nomorSPK: yup.string(),
    provider: yup.string(),
    jenisPekerjaan: yup.string(),
    jumlahBiaya: yup.number(),
    jenisBarang: yup.string(),
    masaBerlaku: yup.date(),
    sampai: yup.date(),
  })
  .required();

const createBiayaPutusan = yup
  .object()
  .shape({
    biayaPutusan: yup
      .number()
      .required(validationWording.required('Biaya Putusan')),
  })
  .required();

const updateBiayaPutusan = yup
  .object()
  .shape({
    biayaPutusan: yup.number(),
  })
  .required();

const konsultanSeleksiLangsung = yup
  .object()
  .shape({
    izinPrinsipUser: yup.boolean(),
    izinPrinsipPengadaan: yup.boolean(),
    undangan: yup.boolean(),
    aanwijzing: yup.boolean(),
    klarifikasiNegosiasi: yup.boolean(),
    izinHasilPengadaan: yup.boolean(),
    pengumumanPemenang: yup.boolean(),
  })
  .required();

const konsultanPenunjukanLangsung = yup
  .object()
  .shape({
    izinPrinsipUser: yup.boolean(),
    izinPrinsipPengadaan: yup.boolean(),
    undangan: yup.boolean(),
    klarifikasiNegosiasi: yup.boolean(),
    izinHasilPengadaan: yup.boolean(),
  })
  .required();

const swakelolaPembelian = yup
  .object()
  .shape({
    provider: yup.string(),
    izinPrinsipUser: yup.boolean(),
    izinPrinsipPengadaan: yup.boolean(),
    izinHasilPengadaan: yup.boolean(),
  })
  .required();

const pemasukanSampulProposalTeknis = yup
  .object()
  .shape({
    pemasukanSampulProposalTeknis: yup.boolean(),
  })
  .required();

const lelang = yup
  .object()
  .shape({
    penilaianProposalTeknis: yup.boolean(),
    pembukuanProposalFinancial: yup.boolean(),
  })
  .required();

const createKonsultanSeleksiLangsung = konsultanSeleksiLangsung
  .concat(baseCreate)
  .concat(createSPK)
  .concat(createBiayaPutusan);

const updateKonsultanSeleksiLangsung = konsultanSeleksiLangsung
  .concat(baseUpdate)
  .concat(updateSPK)
  .concat(updateBiayaPutusan);

const createKonsultanPenunjukanLangsung = konsultanPenunjukanLangsung
  .concat(baseCreate)
  .concat(createSPK)
  .concat(createBiayaPutusan);

const updateKonsultanPenunjukanLangsung = konsultanPenunjukanLangsung
  .concat(baseUpdate)
  .concat(updateSPK)
  .concat(updateBiayaPutusan);

const createSwakelolaPembelian = swakelolaPembelian
  .concat(baseCreate)
  .concat(createBiayaPutusan);

const updateSwakelolaPembelian = swakelolaPembelian
  .concat(baseUpdate)
  .concat(updateBiayaPutusan);

const createBarangPenunjukanLangsung = konsultanPenunjukanLangsung
  .concat(baseCreate)
  .concat(createSPK);

const updateBarangPenunjukanLangsung = konsultanPenunjukanLangsung
  .concat(baseUpdate)
  .concat(updateSPK);

const createBarangPemilihanLangsung = konsultanSeleksiLangsung
  .concat(baseCreate)
  .concat(createSPK)
  .concat(pemasukanSampulProposalTeknis);

const updateBarangPemilihanLangsung = konsultanSeleksiLangsung
  .concat(baseUpdate)
  .concat(updateSPK)
  .concat(pemasukanSampulProposalTeknis);

const createBarangLelang = konsultanSeleksiLangsung
  .concat(baseCreate)
  .concat(createSPK)
  .concat(pemasukanSampulProposalTeknis)
  .concat(lelang);

const updateBarangLelang = konsultanSeleksiLangsung
  .concat(baseUpdate)
  .concat(updateSPK)
  .concat(pemasukanSampulProposalTeknis)
  .concat(lelang);

export default {
  createKonsultanSeleksiLangsung,
  createKonsultanPenunjukanLangsung,
  updateKonsultanSeleksiLangsung,
  updateKonsultanPenunjukanLangsung,
  createSwakelolaPembelian,
  updateSwakelolaPembelian,
  createBarangPenunjukanLangsung,
  updateBarangPenunjukanLangsung,
  createBarangPemilihanLangsung,
  updateBarangPemilihanLangsung,
  createBarangLelang,
  updateBarangLelang,
};

//     izinPrinsipUser: yup
//       .mixed<keyof typeof YesNo>()
//       .oneOf(
//         getAllEnumKey(YesNo),
//         validationWording.oneOf('izinPrinsipUser', ...getAllEnumKey(YesNo))
//       ),
//     izinPrinsipPengadaan: yup
//       .mixed<keyof typeof YesNo>()
//       .oneOf(
//         getAllEnumKey(YesNo),
//         validationWording.oneOf('izinPrinsipPengadaan', ...getAllEnumKey(YesNo))
//       ),
//     izinHasilPengadaan: yup
//       .mixed<keyof typeof YesNo>()
//       .oneOf(
//         getAllEnumKey(YesNo),
//         validationWording.oneOf('izinHasilPengadaan', ...getAllEnumKey(YesNo))
//       ),
//     undangan: yup
//       .mixed<keyof typeof YesNo>()
//       .oneOf(
//         getAllEnumKey(YesNo),
//         validationWording.oneOf('undangan', ...getAllEnumKey(YesNo))
//       ),
//     klarifikasiNegosiasi: yup
//       .mixed<keyof typeof YesNo>()
//       .oneOf(
//         getAllEnumKey(YesNo),
//         validationWording.oneOf('klarifikasiNegosiasi', ...getAllEnumKey(YesNo))
//       ),
//     aanwijzing: yup
//       .mixed<keyof typeof YesNo>()
//       .oneOf(
//         getAllEnumKey(YesNo),
//         validationWording.oneOf('aanwijzing', ...getAllEnumKey(YesNo))
//       ),
//     pengumumanPemenang: yup
//       .mixed<keyof typeof YesNo>()
//       .oneOf(
//         getAllEnumKey(YesNo),
//         validationWording.oneOf('pengumumanPemenang', ...getAllEnumKey(YesNo))
//       ),
//     pemasukanSampulProposalTeknis: yup
//       .mixed<keyof typeof YesNo>()
//       .oneOf(
//         getAllEnumKey(YesNo),
//         validationWording.oneOf(
//           'pemasukanSampulProposalTeknis',
//           ...getAllEnumKey(YesNo)
//         )
//       ),
//     penilaianProposalTeknis: yup
//       .mixed<keyof typeof YesNo>()
//       .oneOf(
//         getAllEnumKey(YesNo),
//         validationWording.oneOf(
//           'penilaianProposalTeknis',
//           ...getAllEnumKey(YesNo)
//         )
//       ),
//     pembukuanProposalFinancial: yup
//       .mixed<keyof typeof YesNo>()
//       .oneOf(
//         getAllEnumKey(YesNo),
//         validationWording.oneOf(
//           'pembukuanProposalFinancial',
//           ...getAllEnumKey(YesNo)
//         )
//       ),
