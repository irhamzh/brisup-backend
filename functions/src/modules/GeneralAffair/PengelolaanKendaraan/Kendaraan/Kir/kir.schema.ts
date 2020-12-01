import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    vehicle: yup.string().required(validationWording.required('vehicle')),
    biaya: yup.number().required(validationWording.required('biaya')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    vehicle: yup.string(),
    biaya: yup.number(),
  })
  .required();

export default {
  create,
  update,
};
