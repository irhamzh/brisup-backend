import * as yup from 'yup';

import validationWording from '@constants/validationWording';
import { TypeUpload } from './interface/upload.interface';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    typeUpload: yup
      .mixed()
      .oneOf(TypeUpload)
      .required(validationWording.required('Type Upload')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    typeUpload: yup.mixed().oneOf(TypeUpload),
  })
  .required();

export default { create, update };
