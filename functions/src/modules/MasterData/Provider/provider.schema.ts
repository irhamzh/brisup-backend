import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    name: yup.string().required(validationWording.required('Nama')),
    address: yup.string().required(validationWording.required('Alamat')),
    pic: yup.string().required(validationWording.required('Pic')),
    contact: yup.string().required(validationWording.required('Nomor Kontak')),
  })
  .required();

const update = yup
  .object()
  .shape({
    name: yup.string(),
    address: yup.string(),
    pic: yup.string(),
    contact: yup.string(),
  })
  .required();

export default { create, update };
