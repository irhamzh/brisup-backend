import * as yup from 'yup';
import validationWording from '@constants/validationWording';

import { Specialization } from './interface/partner.interface';

const create = yup
  .object()
  .shape({
    name: yup.string().required(validationWording.required('Nama')),
    address: yup.string().required(validationWording.required('Alamat')),
    specialization: yup
      .array()
      .of(
        yup
          .string()
          .oneOf(Specialization)
          .required(validationWording.required('Spesialiasi'))
      )
      .required(validationWording.required('Array Spesialiasi')),
    contact: yup.string().required(validationWording.required('Nomor Kontak')),
  })
  .required();

const update = yup
  .object()
  .shape({
    name: yup.string(),
    address: yup.string(),
    specialization: yup
      .array()
      .of(
        yup
          .string()
          .oneOf(Specialization)
          .required(validationWording.required('Spesialiasi'))
      ),
    contact: yup.string(),
  })
  .required();

export default { create, update };
