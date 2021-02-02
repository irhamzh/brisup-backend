import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    expired: yup.date().required(validationWording.required('expired')),
    area: yup.string().required(validationWording.required('area')),
    medicineType: yup
      .string()
      .required(validationWording.required('Medicine Type')),
    information: yup
      .string()
      .required(validationWording.required('information')),
    jumlah: yup.number().required(validationWording.required('jumlah')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    expired: yup.date(),
    area: yup.string(),
    medicineType: yup.string(),
    information: yup.string(),
    jumlah: yup.number(),
  })
  .required();

export default {
  create,
  update,
};
