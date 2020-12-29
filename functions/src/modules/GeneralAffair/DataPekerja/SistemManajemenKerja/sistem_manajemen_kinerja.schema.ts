import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    name: yup.string().required(validationWording.required('name')),
    pn: yup.number().required(validationWording.required('pn')),
    value: yup.string().required(validationWording.required('value')),
    year: yup.string().required(validationWording.required('year')),
  })
  .required();

const update = yup
  .object()
  .shape({
    name: yup.string(),
    pn: yup.number(),
    value: yup.string(),
    year: yup.string(),
  })
  .required();

export default { create, update };
