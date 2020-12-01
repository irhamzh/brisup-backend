import * as yup from 'yup';
import validationWording from '@constants/validationWording';

import { Type } from './interface/overtime.interface';

const create = yup
  .object()
  .shape({
    month: yup.string().required(validationWording.required('month')),
    uker: yup.string().required(validationWording.required('uker')),
    name: yup.string().required(validationWording.required('name')),
    type: yup.mixed().oneOf(Type).required(validationWording.required('Type')),
    suratPerintahLembur: yup
      .boolean()
      .required(validationWording.required('suratPerintahLembur')),
    rekapPerhitunganLembur: yup
      .boolean()
      .required(validationWording.required('rekapPerhitunganLembur')),
    formPembayaranUangLembur: yup
      .boolean()
      .required(validationWording.required('formPembayaranUangLembur')),
    absensi: yup.boolean().required(validationWording.required('absensi')),
  })
  .required();

const update = yup
  .object()
  .shape({
    month: yup.string(),
    uker: yup.string(),
    name: yup.string(),
    type: yup.mixed().oneOf(Type),
    suratPerintahLembur: yup.boolean(),
    rekapPerhitunganLembur: yup.boolean(),
    formPembayaranUangLembur: yup.boolean(),
    absensi: yup.boolean(),
  })
  .required();

export default {
  create,
  update,
};
