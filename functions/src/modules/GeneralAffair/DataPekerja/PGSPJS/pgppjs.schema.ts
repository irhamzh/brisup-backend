import * as yup from 'yup';
import validationWording from '@constants/validationWording';

import { Penugasan } from './interface/pgppjs.interface';

const create = yup
  .object()
  .shape({
    penugasan: yup
      .mixed()
      .oneOf(Penugasan)
      .required(validationWording.required('Penugasan')),
    tanggal: yup.date().required(validationWording.required('tanggal')),
    uker: yup.string().required(validationWording.required('uker')),
    name: yup.string().required(validationWording.required('name')),
    jabatan: yup.string().required(validationWording.required('jabatan')),
    berlakuDari: yup.date().required(validationWording.required('berlakuDari')),
    sampaiDengan: yup
      .date()
      .required(validationWording.required('sampaiDengan')),
  })
  .required();

const update = yup
  .object()
  .shape({
    penugasan: yup.mixed().oneOf(Penugasan),
    tanggal: yup.date(),
    uker: yup.string(),
    name: yup.string(),
    jabatan: yup.string(),
    berlakuDari: yup.date(),
    sampaiDengan: yup.date(),
  })
  .required();

export default {
  create,
  update,
};
