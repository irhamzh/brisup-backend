import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    name: yup.string().required(validationWording.required('name')),
    pn: yup.string().required(validationWording.required('pn')),
    value: yup.number().required(validationWording.required('value')),
    year: yup.string().required(validationWording.required('year')),
  })
  .required();

const update = yup
  .object()
  .shape({
    name: yup.string(),
    pn: yup.string(),
    value: yup.number(),
    year: yup.string(),
  })
  .required();

export default { create, update };
