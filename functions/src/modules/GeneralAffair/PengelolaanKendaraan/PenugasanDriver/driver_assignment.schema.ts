import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    tanggal: yup.date(),
    vehicle: yup.string(),
    driverName: yup.string(),
    passengerName: yup
      .string()
      .required(validationWording.required('passengerName')),
    destination: yup
      .string()
      .required(validationWording.required('destination')),
    rate: yup.string().required(validationWording.required('rate')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    vehicle: yup.string(),
    driverName: yup.string(),
    passengerName: yup.string(),
    destination: yup.string(),
    rate: yup.string(),
  })
  .required();

export default {
  create,
  update,
};
