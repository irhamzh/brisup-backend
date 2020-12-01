import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    vehicle: yup.string().required(validationWording.required('vehicle')),
    driverName: yup.string().required(validationWording.required('driverName')),
    passengerName: yup
      .string()
      .required(validationWording.required('passengerName')),
    destination: yup
      .string()
      .required(validationWording.required('destination')),
    rate: yup.number().required(validationWording.required('rate')),
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
    rate: yup.number(),
  })
  .required();

export default {
  create,
  update,
};
