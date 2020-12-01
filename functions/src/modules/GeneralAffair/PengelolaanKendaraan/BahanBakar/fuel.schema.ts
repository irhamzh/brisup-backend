import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    tanggal: yup.date(),
    vehicle: yup.string().required(validationWording.required('vehicle')),
    kmAkhir: yup.number().required(validationWording.required('kmAkhir')),
    fuel: yup.string(),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    vehicle: yup.string(),
    kmAkhir: yup.number(),
    fuel: yup.string(),
  })
  .required();

export default {
  create,
  update,
};
