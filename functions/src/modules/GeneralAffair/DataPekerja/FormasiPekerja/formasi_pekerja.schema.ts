import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    levelJabatan: yup
      .string()
      .required(validationWording.required('levelJabatan')),
    unitKerja: yup.string().required(validationWording.required('unitKerja')),
    formasi: yup.number().required(validationWording.required('formasi')),
  })
  .required();
export default { create };
