import * as yup from 'yup';

import getAllEnumKey from '@utils/getAllEnumKeys';
import { Division } from '@constants/BaseCondition';
import validationWording from '@constants/validationWording';

import { FinancialAdminPersekotType } from './interface/persekot.interface';

const baseCreate = yup
  .object()
  .shape({
    date: yup.date().required(validationWording.required('date')),
    name: yup.string().required(validationWording.required('name')),
    information: yup.string(),
    costNominal: yup
      .number()
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

const crateFinancialAdmin = yup
  .object()
  .shape({
    typePersekot: yup
      .mixed()
      .oneOf(FinancialAdminPersekotType)
      .required(validationWording.required('division')),
  })
  .required()
  .concat(baseCreate);

const baseUpdate = yup
  .object()
  .shape({
    date: yup.date(),
    name: yup.string(),
    information: yup.string(),
    costNominal: yup.number(),
    division: yup
      .mixed<keyof typeof Division>()
      .oneOf(
        getAllEnumKey(Division),
        validationWording.oneOf('division', ...getAllEnumKey(Division))
      ),
  })
  .required();

const updateFinancialAdmin = yup
  .object()
  .shape({
    typePersekot: yup.mixed().oneOf(FinancialAdminPersekotType),
  })
  .required()
  .concat(baseUpdate);

const deleteArrayIds = yup
  .object()
  .shape({
    persekotIds: yup
      .array()
      .of(yup.string().required())
      .required(validationWording.required('Array persekotIds')),
  })
  .required();

export default {
  baseCreate,
  baseUpdate,
  deleteArrayIds,
  crateFinancialAdmin,
  updateFinancialAdmin,
};
