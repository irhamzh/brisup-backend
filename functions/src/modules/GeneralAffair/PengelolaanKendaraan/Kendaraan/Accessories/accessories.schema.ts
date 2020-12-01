import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    vehicle: yup.string().required(validationWording.required('vehicle')),
    tisuBasah: yup.boolean().required(validationWording.required('tisuBasah')),
    tisuKering: yup
      .boolean()
      .required(validationWording.required('tisuKering')),
    airMinum: yup.boolean().required(validationWording.required('airMinum')),
    pengharum: yup.boolean().required(validationWording.required('pengharum')),
    permen: yup.boolean().required(validationWording.required('permen')),
    handSanitizer: yup
      .boolean()
      .required(validationWording.required('handSanitizer')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    vehicle: yup.string(),
    tisuBasah: yup.boolean(),
    tisuKering: yup.boolean(),
    airMinum: yup.boolean(),
    pengharum: yup.boolean(),
    permen: yup.boolean(),
    handSanitizer: yup.boolean(),
  })
  .required();

export default {
  create,
  update,
};
