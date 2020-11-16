import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    pengadaan: yup
      .string()
      .required(validationWording.required('Nama Pengadaan')),
    provider: yup
      .string()
      .required(validationWording.required('Nama Provider')),
    jumlah: yup.number().required(validationWording.required('jumlah')),
  })
  .required();

const update = yup
  .object()
  .shape({
    pengadaan: yup.string(),
    provider: yup.string(),
    jumlah: yup.number(),
  })
  .required();
export default { create, update };
