import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    information: yup
      .string()
      .required(validationWording.required('information')),
    tanggal: yup.date().required(validationWording.required('tanggal')),
    cctvOutdoor: yup
      .boolean()
      .required(validationWording.required('cctvOutdoor')),
    gedungAlantai1: yup
      .boolean()
      .required(validationWording.required('gedungAlantai1')),
    gedungAlantai2: yup
      .boolean()
      .required(validationWording.required('gedungAlantai2')),
  })
  .required();

const update = yup
  .object()
  .shape({
    information: yup.string(),
    tanggal: yup.date(),
    cctvOutdoor: yup.boolean(),
    gedungAlantai1: yup.boolean(),
    gedungAlantai2: yup.boolean(),
  })
  .required();
export default { update, create };
