import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    name: yup.string().required(validationWording.required('name')),
    address: yup.string().required(validationWording.required('address')),
    pic: yup.string().required(validationWording.required('pic')),
    telephone: yup.string().required(validationWording.required('telephone')),
  })
  .required();

const update = yup
  .object()
  .shape({
    name: yup.string(),
    address: yup.string(),
    pic: yup.string(),
    telephone: yup.string(),
  })
  .required();
export default { create, update };
