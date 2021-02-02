import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    information: yup
      .string()
      .required(validationWording.required('information')),
    tanggal: yup.date().required(validationWording.required('tanggal')),
    outdoor: yup
      .boolean()
      .required(validationWording.required('outdoor')),
    innovationBuilding: yup
      .boolean()
      .required(validationWording.required('innovationBuilding')),
    smartBuilding: yup
      .boolean()
      .required(validationWording.required('smartBuilding')),
  })
  .required();

const update = yup
  .object()
  .shape({
    information: yup.string(),
    tanggal: yup.date(),
    outdoor: yup.boolean(),
    innovationBuilding: yup.boolean(),
    smartBuilding: yup.boolean(),
  })
  .required();
export default { update, create };
