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
    cctvOutdoor: yup.boolean(),
    innovationBuilding: yup.boolean(),
    smartBuilding: yup.boolean(),
  })
  .required();
export default { update, create };
