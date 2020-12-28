import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const createAccess = {
  create: yup.boolean().required(validationWording.required('create')),
  update: yup.boolean().required(validationWording.required('update')),
  delete: yup.boolean().required(validationWording.required('delete')),
  read: yup.boolean().required(validationWording.required('read')),
};
const createRoleAccess = {
  ...createAccess,
  dashboard: yup.boolean().required(validationWording.required('dashboard')),
  approvalKabag: yup
    .boolean()
    .required(validationWording.required('approvalKabag')),
  approvalWakabag: yup
    .boolean()
    .required(validationWording.required('approvalWakabag')),
};

const create = yup
  .object()
  .shape({
    name: yup.string().required(validationWording.required('name')),
    fixedAsset: yup
      .object(createRoleAccess)
      .required(validationWording.required('fixedAsset')),
    procurement: yup
      .object(createRoleAccess)
      .required(validationWording.required('procurement')),
    generalAffair: yup
      .object(createRoleAccess)
      .required(validationWording.required('generalAffair')),
    financialAdmin: yup
      .object(createRoleAccess)
      .required(validationWording.required('financialAdmin')),
    masterData: yup
      .object(createAccess)
      .required(validationWording.required('masterData')),
  })
  .required();
export default { create };
