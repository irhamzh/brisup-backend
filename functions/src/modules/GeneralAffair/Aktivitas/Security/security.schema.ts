import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    checkpoint: yup.string().required(validationWording.required('checkpoint')),
    foto: yup.string().required(validationWording.required('foto')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    checkpoint: yup.string(),
    foto: yup.string(),
  })
  .required();

export default {
  create,
  update,
};
