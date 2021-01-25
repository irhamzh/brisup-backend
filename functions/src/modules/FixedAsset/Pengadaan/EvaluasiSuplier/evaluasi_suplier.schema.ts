import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    pengadaan: yup
      .string()
      .required(validationWording.required('Nama Pengadaan')),
    provider: yup.string(),
    nilai: yup.number().required(validationWording.required('nilai')),
  })
  .required();

const update = yup
  .object()
  .shape({
    pengadaan: yup.string(),
    provider: yup.string(),
    nilai: yup.number(),
  })
  .required();
export default { create, update };
