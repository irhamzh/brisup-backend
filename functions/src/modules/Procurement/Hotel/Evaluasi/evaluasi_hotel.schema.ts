import * as yup from 'yup';
import validationWording from '@constants/validationWording';

import { Performace } from './interface/evaluasi_hotel.interface';
const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    hotelName: yup.string().required(validationWording.required('hotelName')),
    namaPendidikan: yup
      .string()
      .required(validationWording.required('namaPendidikan')),
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
    hotelName: yup.string(),
    namaPendidikan: yup.string(),
    remark: yup.string(),
    performance: yup.mixed().oneOf(Performace),
  })
  .required();
export default { create, update };
