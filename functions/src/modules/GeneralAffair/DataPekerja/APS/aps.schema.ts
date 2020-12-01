import * as yup from 'yup';
import validationWording from '@constants/validationWording';

import { Status } from './interface/aps.interface';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    uker: yup.string().required(validationWording.required('uker')),
    name: yup.string().required(validationWording.required('name')),
    status: yup
      .mixed()
      .oneOf(Status)
      .required(validationWording.required('Status')),
    information: yup
      .string()
      .required(validationWording.required('information')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    uker: yup.string(),
    name: yup.string(),
    status: yup.mixed().oneOf(Status),
    information: yup.string(),
  })
  .required();

export default {
  create,
  update,
};
