import * as yup from 'yup';

import getAllEnumKey from '@utils/getAllEnumKeys';
import validationWording from '@constants/validationWording';

import { TypePayment } from './interface/payment.interface';

export const baseCreate = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    typePayment: yup
      .mixed<keyof typeof TypePayment>()
      .oneOf(
        getAllEnumKey(TypePayment),
        validationWording.oneOf('Type Payment', ...getAllEnumKey(TypePayment))
      )
      .required(validationWording.required('Type Payment')),
    information: yup
      .string()
      .required(validationWording.required('information')),
    biaya: yup.number().required(validationWording.required('biaya')),
  })
  .required();

const createDataKelogistikan = yup
  .object()
  .shape({
    kegiatan: yup.string().required(validationWording.required('kegiatan')),
    izinPrinsipPengadaan: yup
      .boolean()
      .required(validationWording.required('izinPrinsipPengadaan')),
    invoiceBermateraiKwitansi: yup
      .boolean()
      .required(validationWording.required('invoiceBermateraiKwitansi')),
    fakturPajak: yup
      .boolean()
      .required(validationWording.required('fakturPajak')),
    ktpAtauNpwp: yup
      .boolean()
      .required(validationWording.required('ktpAtauNpwp')),
    notaPembukuan: yup
      .boolean()
      .required(validationWording.required('notaPembukuan')),
  })
  .required()
  .concat(baseCreate);

const createTagihanBBM = yup
  .object()
  .shape({
    namaPembayaran: yup
      .string()
      .required(validationWording.required('namaPembayaran')),
    invoiceSPBUBermaterai: yup
      .boolean()
      .required(validationWording.required('invoiceSPBUBermaterai')),
    rekapStrukPerTransaksi: yup
      .boolean()
      .required(validationWording.required('rekapStrukPerTransaksi')),
    notaPembukuan: yup
      .boolean()
      .required(validationWording.required('notaPembukuan')),
  })
  .required()
  .concat(baseCreate);

const createTagihanServiceKendaraan = yup
  .object()
  .shape({
    namaPembayaran: yup
      .string()
      .required(validationWording.required('namaPembayaran')),
    invoiceBermaterai: yup
      .boolean()
      .required(validationWording.required('invoiceBermaterai')),
    fakturPajak: yup
      .boolean()
      .required(validationWording.required('fakturPajak')),
    notaPembukuan: yup
      .boolean()
      .required(validationWording.required('notaPembukuan')),
  })
  .required()
  .concat(baseCreate);

const createTagihanSewaBus = yup
  .object()
  .shape({
    namaPembayaran: yup
      .string()
      .required(validationWording.required('namaPembayaran')),
    invoice: yup.boolean().required(validationWording.required('invoice')),
    workingOrder: yup
      .boolean()
      .required(validationWording.required('workingOrder')),
    notaPembukuan: yup
      .boolean()
      .required(validationWording.required('notaPembukuan')),
  })
  .required()
  .concat(baseCreate);

const createTagihanRekreasiSiswa = yup
  .object()
  .shape({
    namaPembayaran: yup
      .string()
      .required(validationWording.required('namaPembayaran')),
    tiketKwitansiBukti: yup
      .boolean()
      .required(validationWording.required('tiketKwitansiBukti')),
    rekapBiaya: yup
      .boolean()
      .required(validationWording.required('rekapBiaya')),
    suratKeteranganRekreasiLOP: yup
      .boolean()
      .required(validationWording.required('suratKeteranganRekreasiLOP')),
    workingOrder: yup
      .boolean()
      .required(validationWording.required('workingOrder')),
    notaPembukuan: yup
      .boolean()
      .required(validationWording.required('notaPembukuan')),
  })
  .required()
  .concat(baseCreate);

const createTagihanRohaniHumasRepresentasiRapat = yup
  .object()
  .shape({
    namaPembayaran: yup
      .string()
      .required(validationWording.required('namaPembayaran')),
    invoice: yup.boolean().required(validationWording.required('invoice')),
    notaPembukuan: yup
      .boolean()
      .required(validationWording.required('notaPembukuan')),
  })
  .required()
  .concat(baseCreate);

const createTagihanBrimedika = yup
  .object()
  .shape({
    invoiceBermaterai: yup
      .boolean()
      .required(validationWording.required('invoiceBermaterai')),
    copySPK: yup.boolean().required(validationWording.required('copySPK')),
    notaPembukuan: yup
      .boolean()
      .required(validationWording.required('notaPembukuan')),
  })
  .required()
  .concat(baseCreate);

const createPublicCourse = yup
  .object()
  .shape({
    namaPendidikan: yup
      .string()
      .required(validationWording.required('namaPendidikan')),
    periode: yup.string().required(validationWording.required('periode')),
    invoiceBermaterai: yup
      .boolean()
      .required(validationWording.required('invoiceBermaterai')),
    suratPemanggilan: yup
      .boolean()
      .required(validationWording.required('suratPemanggilan')),
    dataBrismart: yup
      .boolean()
      .required(validationWording.required('dataBrismart')),
    anggaranKegiatan: yup
      .boolean()
      .required(validationWording.required('anggaranKegiatan')),
    fakturPajakBagiWapu: yup
      .boolean()
      .required(validationWording.required('fakturPajakBagiWapu')),
  })
  .required()
  .concat(baseCreate);

const createPenihilanPAUK = yup
  .object()
  .shape({
    namaPAUK: yup.string().required(validationWording.required('namaPAUK')),
    printPAUK: yup.boolean().required(validationWording.required('printPAUK')),
    kodePelatihan: yup
      .boolean()
      .required(validationWording.required('kodePelatihan')),
  })
  .required()
  .concat(baseCreate);

const createTagihanS2 = yup
  .object()
  .shape({
    namaPendidikan: yup
      .string()
      .required(validationWording.required('namaPendidikan')),
    periodeBulan: yup
      .string()
      .required(validationWording.required('periodeBulan')),
    suratPerintahBayar: yup
      .boolean()
      .required(validationWording.required('suratPerintahBayar')),
    suratkeKCK: yup
      .boolean()
      .required(validationWording.required('suratkeKCK')),
    anggaranKegiatan: yup
      .boolean()
      .required(validationWording.required('anggaranKegiatan')),
    rekeningTujuan: yup
      .boolean()
      .required(validationWording.required('rekeningTujuan')),
  })
  .required()
  .concat(baseCreate);

const createAAJIWaperd = yup
  .object()
  .shape({
    namaAsuransi: yup
      .string()
      .required(validationWording.required('namaAsuransi')),
    suratPerintahBayar: yup
      .boolean()
      .required(validationWording.required('suratPerintahBayar')),
  })
  .required()
  .concat(baseCreate);

const createHonorSalaryCreaditing = yup
  .object()
  .shape({
    namaAsuransi: yup
      .string()
      .required(validationWording.required('namaAsuransi')),
    suratPerintahBayar: yup
      .boolean()
      .required(validationWording.required('suratPerintahBayar')),
    cekLainnya: yup
      .boolean()
      .required(validationWording.required('cekLainnya')),
  })
  .required()
  .concat(baseCreate);

const createPembayaranLainnya = yup
  .object()
  .shape({
    namaPembayaran: yup
      .string()
      .required(validationWording.required('namaPembayaran')),
    invoiceBermaterai: yup
      .boolean()
      .required(validationWording.required('invoiceBermaterai')),
    cekKesesuaianPembayaran: yup
      .boolean()
      .required(validationWording.required('cekKesesuaianPembayaran')),
  })
  .required()
  .concat(baseCreate);

const createCatering = yup
  .object()
  .shape({
    namaPendidikan: yup
      .string()
      .required(validationWording.required('namaPendidikan')),
    periode: yup.string().required(validationWording.required('periode')),
    invoiceBermaterai: yup
      .boolean()
      .required(validationWording.required('invoiceBermaterai')),
    copySPKPKS: yup
      .boolean()
      .required(validationWording.required('copySPKPKS')),
    evaluasiBrismart: yup
      .boolean()
      .required(validationWording.required('evaluasiBrismart')),
    suratPemesanan: yup
      .boolean()
      .required(validationWording.required('suratPemesanan')),
    prd: yup.boolean().required(validationWording.required('prd')),
  })
  .required()
  .concat(baseCreate);

const createJasaPendidikan = yup
  .object()
  .shape({
    namaPendidikan: yup
      .string()
      .required(validationWording.required('namaPendidikan')),
    invoiceBermaterai: yup
      .boolean()
      .required(validationWording.required('invoiceBermaterai')),
    bast: yup.boolean().required(validationWording.required('bast')),
    laporanPelaksanaanPekerjaan: yup
      .boolean()
      .required(validationWording.required('laporanPelaksanaanPekerjaan')),
    evaluasiBrismart: yup
      .boolean()
      .required(validationWording.required('evaluasiBrismart')),
    suratKonfirmasiPemanggilan: yup
      .boolean()
      .required(validationWording.required('suratKonfirmasiPemanggilan')),
    copySPKPKS: yup
      .boolean()
      .required(validationWording.required('copySPKPKS')),
    suratPemesanan: yup
      .boolean()
      .required(validationWording.required('suratPemesanan')),
    prd: yup.boolean().required(validationWording.required('prd')),
    copyNPWPbagiprovidernonPKP: yup
      .boolean()
      .required(validationWording.required('copyNPWPbagiprovidernonPKP')),
    daftarHadir: yup
      .boolean()
      .required(validationWording.required('daftarHadir')),
  })
  .required()
  .concat(baseCreate);

const createHotel = yup
  .object()
  .shape({
    namaPendidikan: yup
      .string()
      .required(validationWording.required('namaPendidikan')),
    periode: yup.string().required(validationWording.required('periode')),
    invoiceBermaterai: yup
      .boolean()
      .required(validationWording.required('invoiceBermaterai')),
    copySPKPKS: yup
      .boolean()
      .required(validationWording.required('copySPKPKS')),
    evaluasiBrismart: yup
      .boolean()
      .required(validationWording.required('evaluasiBrismart')),
    rekapBiayaHotel: yup
      .boolean()
      .required(validationWording.required('rekapBiayaHotel')),
    suratPemesanan: yup
      .boolean()
      .required(validationWording.required('suratPemesanan')),
    fakturPajak: yup
      .boolean()
      .required(validationWording.required('fakturPajak')),
    absensiHotel: yup
      .boolean()
      .required(validationWording.required('absensiHotel')),
    room: yup.boolean().required(validationWording.required('room')),
    laundry: yup.boolean().required(validationWording.required('laundry')),
    dinner: yup.boolean().required(validationWording.required('dinner')),
  })
  .required()
  .concat(baseCreate);

const createAkomodasiAsrama = yup
  .object()
  .shape({
    namaPendidikan: yup
      .string()
      .required(validationWording.required('namaPendidikan')),
    periode: yup.string().required(validationWording.required('periode')),
    invoiceBermaterai: yup
      .boolean()
      .required(validationWording.required('invoiceBermaterai')),
    copySPKPKS: yup
      .boolean()
      .required(validationWording.required('copySPKPKS')),
    evaluasiBrismart: yup
      .boolean()
      .required(validationWording.required('evaluasiBrismart')),
    suratPemesanan: yup
      .boolean()
      .required(validationWording.required('suratPemesanan')),
    fakturPajak: yup
      .boolean()
      .required(validationWording.required('fakturPajak')),
    absensiAkomodasi: yup
      .boolean()
      .required(validationWording.required('absensiAkomodasi')),
  })
  .required()
  .concat(baseCreate);

export const create: { [key: string]: yup.ObjectSchema<any> } = {
  Kelogisitikan: createDataKelogistikan,
  'Tagihan BBM': createTagihanBBM,
  'Tagihan Service Kendaraan': createTagihanServiceKendaraan,
  'Tagihan Sewa BUS': createTagihanSewaBus,
  'Tagihan Rekreasi Siswa': createTagihanRekreasiSiswa,
  'Tagihan Biaya Rohani, Humas, Representasi, dan Rapat': createTagihanRohaniHumasRepresentasiRapat,
  'Tagihan Brimedika': createTagihanBrimedika,
  'Penihilan PAUK': createPenihilanPAUK,
  'Public Course': createPublicCourse,
  'Tagihan S2 Luar dan Dalam Negeri': createTagihanS2,
  Waperd: createAAJIWaperd,
  Honor: createHonorSalaryCreaditing,
  'Salary Creaditing': createHonorSalaryCreaditing,
  'Pembayaran Lainnya': createPembayaranLainnya,
  Catering: createCatering,
  'Jasa Pendidikan': createJasaPendidikan,
  Hotel: createHotel,
  'Akomodasi Asrama': createAkomodasiAsrama,
};
// ======================================END of Create

export const baseUpdate = yup
  .object()
  .shape({
    tanggal: yup.date(),
    information: yup.string(),
    biaya: yup.number(),
  })
  .required();

const updateDataKelogistikan = yup
  .object()
  .shape({
    kegiatan: yup.string(),
    izinPrinsipPengadaan: yup.boolean(),
    invoiceBermateraiKwitansi: yup.boolean(),
    fakturPajak: yup.boolean(),
    ktpAtauNpwp: yup.boolean(),
    notaPembukuan: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);

const updateTagihanBBM = yup
  .object()
  .shape({
    namaPembayaran: yup.string(),
    invoiceSPBUBermaterai: yup.boolean(),
    rekapStrukPerTransaksi: yup.boolean(),
    notaPembukuan: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);

const updateTagihanServiceKendaraan = yup
  .object()
  .shape({
    namaPembayaran: yup.string(),
    invoiceBermaterai: yup.boolean(),
    fakturPajak: yup.boolean(),
    notaPembukuan: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);

const updateTagihanSewaBus = yup
  .object()
  .shape({
    namaPembayaran: yup.string(),
    invoice: yup.boolean(),
    workingOrder: yup.boolean(),
    notaPembukuan: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);

const updateTagihanRekreasiSiswa = yup
  .object()
  .shape({
    namaPembayaran: yup.string(),
    tiketKwitansiBukti: yup.boolean(),
    rekapBiaya: yup.boolean(),
    suratKeteranganRekreasiLOP: yup.boolean(),
    workingOrder: yup.boolean(),
    notaPembukuan: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);

const updateTagihanRohaniHumasRepresentasiRapat = yup
  .object()
  .shape({
    namaPembayaran: yup.string(),
    invoice: yup.boolean(),
    notaPembukuan: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);

const updateTagihanBrimedika = yup
  .object()
  .shape({
    invoiceBermaterai: yup.boolean(),
    copySPK: yup.boolean(),
    notaPembukuan: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);

const updatePublicCourse = yup
  .object()
  .shape({
    namaPendidikan: yup.string(),
    periode: yup.string(),
    invoiceBermaterai: yup.boolean(),
    suratPemanggilan: yup.boolean(),
    dataBrismart: yup.boolean(),
    anggaranKegiatan: yup.boolean(),
    fakturPajakBagiWapu: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);

const updatePenihilanPAUK = yup
  .object()
  .shape({
    namaPAUK: yup.string(),
    printPAUK: yup.boolean(),
    kodePelatihan: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);

const updateTagihanS2 = yup
  .object()
  .shape({
    namaPendidikan: yup.string(),
    periodeBulan: yup.string(),
    suratPerintahBayar: yup.boolean(),
    suratkeKCK: yup.boolean(),
    anggaranKegiatan: yup.boolean(),
    rekeningTujuan: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);

const updateAAJIWaperd = yup
  .object()
  .shape({
    namaAsuransi: yup.string(),
    suratPerintahBayar: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);

const updateHonorSalaryCreaditing = yup
  .object()
  .shape({
    namaAsuransi: yup.string(),
    suratPerintahBayar: yup.boolean(),
    cekLainnya: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);

const updatePembayaranLainnya = yup
  .object()
  .shape({
    namaPembayaran: yup.string(),
    invoiceBermaterai: yup.boolean(),
    cekKesesuaianPembayaran: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);

const updateCatering = yup
  .object()
  .shape({
    namaPendidikan: yup.string(),
    periode: yup.string(),
    invoiceBermaterai: yup.boolean(),
    copySPKPKS: yup.boolean(),
    evaluasiBrismart: yup.boolean(),
    suratPemesanan: yup.boolean(),
    prd: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);

const updateJasaPendidikan = yup
  .object()
  .shape({
    namaPendidikan: yup.string(),
    invoiceBermaterai: yup.boolean(),
    bast: yup.boolean(),
    laporanPelaksanaanPekerjaan: yup.boolean(),
    evaluasiBrismart: yup.boolean(),
    suratKonfirmasiPemanggilan: yup.boolean(),
    copySPKPKS: yup.boolean(),
    suratPemesanan: yup.boolean(),
    prd: yup.boolean(),
    copyNPWPbagiprovidernonPKP: yup.boolean(),
    daftarHadir: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);

const updateHotel = yup
  .object()
  .shape({
    namaPendidikan: yup.string(),
    periode: yup.string(),
    invoiceBermaterai: yup.boolean(),
    copySPKPKS: yup.boolean(),
    evaluasiBrismart: yup.boolean(),
    rekapBiayaHotel: yup.boolean(),
    suratPemesanan: yup.boolean(),
    fakturPajak: yup.boolean(),
    absensiHotel: yup.boolean(),
    room: yup.boolean(),
    laundry: yup.boolean(),
    dinner: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);

const updateAkomodasiAsrama = yup
  .object()
  .shape({
    namaPendidikan: yup.string(),
    periode: yup.string(),
    invoiceBermaterai: yup.boolean(),
    copySPKPKS: yup.boolean(),
    evaluasiBrismart: yup.boolean(),
    suratPemesanan: yup.boolean(),
    fakturPajak: yup.boolean(),
    absensiAkomodasi: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);

export const update: { [key: string]: yup.ObjectSchema<any> } = {
  Kelogisitikan: updateDataKelogistikan,
  'Tagihan BBM': updateTagihanBBM,
  'Tagihan Service Kendaraan': updateTagihanServiceKendaraan,
  'Tagihan Sewa BUS': updateTagihanSewaBus,
  'Tagihan Rekreasi Siswa': updateTagihanRekreasiSiswa,
  'Tagihan Biaya Rohani, Humas, Representasi, dan Rapat': updateTagihanRohaniHumasRepresentasiRapat,
  'Tagihan Brimedika': updateTagihanBrimedika,
  'Penihilan PAUK': updatePenihilanPAUK,
  'Public Course': updatePublicCourse,
  'Tagihan S2 Luar dan Dalam Negeri': updateTagihanS2,
  Waperd: updateAAJIWaperd,
  Honor: updateHonorSalaryCreaditing,
  'Salary Creaditing': updateHonorSalaryCreaditing,
  'Pembayaran Lainnya': updatePembayaranLainnya,
  Catering: updateCatering,
  'Jasa Pendidikan': updateJasaPendidikan,
  Hotel: updateHotel,
  'Akomodasi Asrama': updateAkomodasiAsrama,
};

export const multiplePenihilan = yup
  .object()
  .shape({
    paukIds: yup
      .array()
      .of(yup.string().required())
      .required(validationWording.required('Array paukIds')),
  })
  .required();
