import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    unitKerjaTujuan: yup
      .string()
      .required(validationWording.required('unitKerjaTujuan')),
    information: yup
      .string()
      .required(validationWording.required('information')),
    nominal: yup.number().required(validationWording.required('nominal')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    unitKerjaTujuan: yup.string(),
    information: yup.string(),
    nominal: yup.number(),
  })
  .required();

export default {
  create,
  update,
};
