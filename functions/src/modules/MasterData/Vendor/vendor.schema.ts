import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    name: yup.string().required(validationWording.required('Name')),
  })
  .required();

// const update = yup
//   .object()
//   .shape({
//     name: yup.string(),
//   })
//   .required();

export default { create };
