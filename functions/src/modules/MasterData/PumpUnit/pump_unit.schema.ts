import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    nameUnit: yup.string().required(validationWording.required('nameUnit')),
    pump: yup.string().required(validationWording.required('pump')),
  })
  .required();

const update = yup
  .object()
  .shape({
    nameUnit: yup.string(),
    pump: yup.string(),
  })
  .required();
export default { create, update };
