import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    email: yup
      .string()
      .email(validationWording.invalid('email'))
      .required(validationWording.required('email')),
    password: yup
      .string()
      .min(8, validationWording.minLength(8))
      .required(validationWording.required('password')),
    name: yup.string().required(validationWording.required('name')),
    role: yup.string().required(validationWording.required('role')),
    // role: yup
    //   .mixed()
    //   .oneOf(
    //     ['admin', 'user'],
    //     validationWording.oneOf('role', ['admin', 'user'].toString())
    //   )
    //   .required('role'),
  })
  .required();
const login = yup
  .object()
  .shape({
    email: yup
      .string()
      .email(validationWording.invalid('email'))
      .required(validationWording.required('email')),
    password: yup
      .string()
      .min(8, validationWording.minLength(8))
      .required(validationWording.required('password')),
  })
  .required();

const update = yup
  .object()
  .shape({
    email: yup.string().email(validationWording.invalid('email')),
    password: yup.string().min(8, validationWording.minLength(8)),
    name: yup.string(),
    role: yup.string(),
  })
  .required();

export default { login, create, update };
