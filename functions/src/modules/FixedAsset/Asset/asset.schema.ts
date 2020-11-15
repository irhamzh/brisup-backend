import * as yup from 'yup';
import validationWording from '@constants/validationWording';
import getAllEnumKey from '@utils/getAllEnumKeys';
import { AssetCondition } from './interface/asset.interface';

const create = yup
  .object()
  .shape({
    name: yup.string().required(validationWording.required('name')),
    information: yup
      .string()
      .required(validationWording.required('information')),
    condition: yup
      .mixed<keyof typeof AssetCondition>()
      .oneOf(
        getAllEnumKey(AssetCondition),
        validationWording.oneOf(
          'AssetCondition',
          ...getAllEnumKey(AssetCondition)
        )
      ),
  })
  .required();

const update = yup
  .object()
  .shape({
    name: yup.string(),
    information: yup.string(),
    condition: yup
      .mixed<keyof typeof AssetCondition>()
      .oneOf(
        getAllEnumKey(AssetCondition),
        validationWording.oneOf(
          'AssetCondition',
          ...getAllEnumKey(AssetCondition)
        )
      ),
  })
  .required();

const deleteArrayIds = yup
  .object()
  .shape({
    assetIds: yup
      .array()
      .of(yup.string().required())
      .required(validationWording.required('Array assetIds')),
  })
  .required();
export default { create, update, deleteArrayIds };
