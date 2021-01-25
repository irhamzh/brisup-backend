import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    pengadaan: yup
      .string()
      .required(validationWording.required('Nama Pengadaan')),
    provider: yup.string(),

    jumlah: yup.number().required(validationWording.required('jumlah')),
    hargaSatuan: yup
      .number()
      .required(validationWording.required('hargaSatuan')),
    totalHarga: yup.number().required(validationWording.required('totalHarga')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    pengadaan: yup.string(),
    provider: yup.string(),
    jumlah: yup.number(),
    hargaSatuan: yup.number(),
    totalHarga: yup.number(),
  })
  .required();
export default { create, update };
