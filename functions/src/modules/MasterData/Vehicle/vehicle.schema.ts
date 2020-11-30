import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    merk: yup.string().required(validationWording.required('merk')),
    color: yup.string().required(validationWording.required('color')),
    platNomor: yup.string().required(validationWording.required('platNomor')),
  })
  .required();

const update = yup
  .object()
  .shape({
    merk: yup.string(),
    color: yup.string(),
    platNomor: yup.string(),
  })
  .required();
export default { create, update };
