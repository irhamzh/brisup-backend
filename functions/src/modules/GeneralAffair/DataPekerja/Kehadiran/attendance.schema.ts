import * as yup from 'yup';
import validationWording from '@constants/validationWording';

import { Type } from './interface/attendance.interface';

const create = yup
  .object()
  .shape({
    type: yup.mixed().oneOf(Type).required(validationWording.required('Type')),
    tanggal: yup.date().required(validationWording.required('tanggal')),
    name: yup.string().required(validationWording.required('name')),
    jumlahHadir: yup
      .number()
      .required(validationWording.required('jumlahHadir')),
    jumlahTidakHadir: yup
      .number()
      .required(validationWording.required('jumlahTidakHadir')),
    jumlahCuti: yup.number().required(validationWording.required('jumlahCuti')),
  })
  .required();

const update = yup
  .object()
  .shape({
    type: yup.mixed().oneOf(Type),
    tanggal: yup.date(),
    name: yup.string(),
    jumlahHadir: yup.number(),
    jumlahTidakHadir: yup.number(),
    jumlahCuti: yup.number(),
  })
  .required();

export default {
  create,
  update,
};
