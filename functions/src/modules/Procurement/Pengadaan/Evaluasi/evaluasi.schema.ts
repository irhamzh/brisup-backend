import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('Tanggal')),
    information: yup
      .string()
      .required(validationWording.required('Information')),
    pengadaan: yup.string().required(validationWording.required('Pengadaan')),
    provider: yup.string(),
    nilai: yup.number().required(validationWording.required('nilai')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    information: yup.string(),
    pengadaan: yup.string(),
    provider: yup.string(),
    nilai: yup.number(),
  })
  .required();
export default { create, update };
