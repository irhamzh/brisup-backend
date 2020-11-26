import * as yup from 'yup';
import validationWording from '@constants/validationWording';

import { Performace } from './interface/evaluasi_atk.interface';

const create = yup
  .object()
  .shape({
    tanggal: yup.date(),
    provider: yup.string().required(validationWording.required('provider')),
    remark: yup.string().required(validationWording.required('remark')),
    performance: yup
      .mixed()
      .oneOf(Performace)
      .required(validationWording.required('performance')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    provider: yup.string(),
    remark: yup.string(),
    performance: yup.mixed().oneOf(Performace),
  })
  .required();
export default { create, update };
