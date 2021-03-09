import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    information: yup
      .string()
      .required(validationWording.required('information')),
    tanggal: yup.date().required(validationWording.required('tanggal')),
    cctvOutdoor: yup.boolean(),
    innovationBuilding: yup.boolean(),
    smartBuilding: yup.boolean(),
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
