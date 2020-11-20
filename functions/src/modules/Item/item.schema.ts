import * as yup from 'yup';
import validationWording from '@constants/validationWording';
import { TypeItem } from './interface/item.interface';
import getAllEnumKey from '@utils/getAllEnumKeys';

const create = yup
  .object()
  .shape({
    name: yup.string().required(validationWording.required('name')),
    typeItem: yup
      .mixed<keyof typeof TypeItem>()
      .oneOf(
        getAllEnumKey(TypeItem),
        validationWording.oneOf('Type Item', ...getAllEnumKey(TypeItem))
      )
      .required(validationWording.required('Type Item')),
  })
  .required();

const update = yup
  .object()
  .shape({
    name: yup.string(),
    typeItem: yup
      .mixed<keyof typeof TypeItem>()
      .oneOf(
        getAllEnumKey(TypeItem),
        validationWording.oneOf('Type Item', ...getAllEnumKey(TypeItem))
      ),
  })
  .required();
export default { create, update };
