import * as yup from 'yup';
import validationWording from '@constants/validationWording';

import {
  Performace,
  Penyajian,
  SampleMakanan,
} from './interface/evaluasi_catering.interface';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    catering: yup.string().required(validationWording.required('catering')),
    workingOrder: yup
      .string()
      .required(validationWording.required('workingOrder')),
    performance: yup
      .mixed()
      .oneOf(Performace)
      .required(validationWording.required('performance')),
    penyajian: yup
      .mixed()
      .oneOf(Penyajian)
      .required(validationWording.required('penyajian')),
    sampleMakan: yup
      .mixed()
      .oneOf(SampleMakanan)
      .required(validationWording.required('sampleMakan')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    catering: yup.string(),
    workingOrder: yup.string(),
    performance: yup.mixed().oneOf(Performace),
    penyajian: yup.mixed().oneOf(Penyajian),
    sampleMakan: yup.mixed().oneOf(SampleMakanan),
  })
  .required();
export default { create, update };
