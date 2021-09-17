import * as yup from 'yup';
import validationWording from '@constants/validationWording';

import { Sex } from './interface/employee.interface';

const create = yup
  .object()
  .shape({
    // type: yup.mixed().oneOf(Type).required(validationWording.required('Type')),
    name: yup.string().required(validationWording.required('name')),
    nip: yup.string().required(validationWording.required('nip')),
    pernr: yup.string().required(validationWording.required('pernr')),
    sex: yup.mixed().oneOf(Sex).required(validationWording.required('sex')),
    dateOfBird: yup.date().required(validationWording.required('dateOfBird')),
    age: yup.number().required(validationWording.required('age')),
    position: yup.string().required(validationWording.required('position')),
    jobgrade: yup.string().required(validationWording.required('jobgrade')),
    mkjg: yup.string().required(validationWording.required('mkjg')),
    pg: yup.string().required(validationWording.required('pg')),
    mkpg: yup.string().required(validationWording.required('mkpg')),
    formasi: yup.string().required(validationWording.required('formasi')),
  })
  .required();

const createFromExcel = yup
  .object()
  .shape({
    // type: yup.mixed().oneOf(Type).required(validationWording.required('Type')),
    name: yup.string().required(validationWording.required('name')),
    nip: yup.string().required(validationWording.required('nip')),
    pernr: yup
      .string()
      .nullable()
      .transform((v, o) => (o === '' ? null : v)),
    sex: yup
      .mixed()
      .oneOf(Sex)
      .nullable()
      .transform((v, o) => (o === '' ? null : v)),
    dateOfBird: yup
      .date()
      .nullable()
      .transform((v, o) => (o === '' ? null : v)),
    age: yup
      .number()
      .nullable()
      .transform((v, o) => (o === '' ? null : v)),
    position: yup
      .string()
      .nullable()
      .transform((v, o) => (o === '' ? null : v)),
    jobgrade: yup
      .string()
      .nullable()
      .transform((v, o) => (o === '' ? null : v)),
    mkjg: yup
      .string()
      .nullable()
      .transform((v, o) => (o === '' ? null : v)),
    pg: yup
      .string()
      .nullable()
      .transform((v, o) => (o === '' ? null : v)),
    mkpg: yup
      .string()
      .nullable()
      .transform((v, o) => (o === '' ? null : v)),
    formasi: yup
      .string()
      .nullable()
      .transform((v, o) => (o === '' ? null : v)),
  })
  .required();

const update = yup
  .object()
  .shape({
    // type: yup.mixed().oneOf(Type),
    name: yup.string(),
    nip: yup.string(),
    pernr: yup.string(),
    sex: yup.mixed().oneOf(Sex),
    dateOfBird: yup.date(),
    age: yup.number(),
    position: yup.string(),
    jobgrade: yup.string(),
    mkjg: yup.string(),
    pg: yup.string(),
    mkpg: yup.string(),
  })
  .required();

export default {
  create,
  createFromExcel,
  update,
};
