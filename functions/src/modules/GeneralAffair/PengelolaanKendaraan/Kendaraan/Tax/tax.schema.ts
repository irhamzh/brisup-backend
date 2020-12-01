import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    vehicle: yup.string().required(validationWording.required('vehicle')),
    jatuhTempo: yup.string().required(validationWording.required('jatuhTempo')),
    biayaPajak: yup.number().required(validationWording.required('biayaPajak')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    vehicle: yup.string(),
    jatuhTempo: yup.string(),
    biayaPajak: yup.number(),
  })
  .required();

export default {
  create,
  update,
};
