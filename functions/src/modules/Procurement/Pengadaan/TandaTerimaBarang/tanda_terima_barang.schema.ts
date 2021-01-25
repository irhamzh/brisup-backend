import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('Tanggal')),
    pengadaan: yup
      .string()
      .required(validationWording.required('Nama Pengadaan')),
    provider: yup.string(),
    jenisPekerjaan: yup
      .string()
      .required(validationWording.required('jenisPekerjaan')),
    jumlahBarang: yup
      .number()
      .required(validationWording.required('jumlahBarang')),
    hargaBarang: yup
      .number()
      .required(validationWording.required('jumlahBarang')),
    information: yup
      .string()
      .required(validationWording.required('information')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    pengadaan: yup.string(),
    provider: yup.string(),
    jenisPekerjaan: yup.string(),
    jumlahBarang: yup.number(),
    hargaBarang: yup.number(),
    information: yup.string(),
  })
  .required();
export default { create, update };
