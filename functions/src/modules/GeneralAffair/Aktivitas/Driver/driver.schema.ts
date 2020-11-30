import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    tujuan: yup.string().required(validationWording.required('tujuan')),
    // foto: yup.string().required(valiationWording.required('foto')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    tujuan: yup.string(),
    foto: yup.string(),
  })
  .required();

export default {
  create,
  update,
};
