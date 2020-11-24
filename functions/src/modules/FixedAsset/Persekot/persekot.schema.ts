import * as yup from 'yup';
import validationWording from '@constants/validationWording';
import getAllEnumKey from '@utils/getAllEnumKeys';
import { Division } from '@constants/BaseCondition';

const create = yup
  .object()
  .shape({
    date: yup.date().required(validationWording.required('date')),
    name: yup.string().required(validationWording.required('name')),
    costNominal: yup
      .string()
      .required(validationWording.required('costNominal')),
    division: yup
      .mixed<keyof typeof Division>()
      .oneOf(
        getAllEnumKey(Division),
        validationWording.oneOf('division', ...getAllEnumKey(Division))
      )
      .required(validationWording.required('division')),
  })
  .required();

const update = yup
  .object()
  .shape({
    date: yup.date(),
    name: yup.string(),
    costNominal: yup.string(),
    division: yup
      .mixed<keyof typeof Division>()
      .oneOf(
        getAllEnumKey(Division),
        validationWording.oneOf('division', ...getAllEnumKey(Division))
      ),
  })
  .required();

const deleteArrayIds = yup
  .object()
  .shape({
    persekotIds: yup
      .array()
      .of(yup.string().required())
      .required(validationWording.required('Array persekotIds')),
  })
  .required();
export default { create, update, deleteArrayIds };
