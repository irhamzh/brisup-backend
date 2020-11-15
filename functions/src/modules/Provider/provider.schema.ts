import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    name: yup.string().required(validationWording.required('Name')),
    address: yup.string().required(validationWording.required('Alamat')),
    contact: yup.string().required(validationWording.required('Nomor Kontak')),
  })
  .required();

const update = yup
  .object()
  .shape({
    name: yup.string(),
    address: yup.string(),
    contact: yup.string(),
  })
  .required();

export default { create, update };
