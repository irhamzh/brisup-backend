import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    levelJabatan: yup
      .string()
      .required(validationWording.required('Level Jabatan')),
    unitKerja: yup.string().required(validationWording.required('Unit Kerja')),
    formasi: yup.number().required(validationWording.required('Formasi')),
  })
  .required();
export default { create };
