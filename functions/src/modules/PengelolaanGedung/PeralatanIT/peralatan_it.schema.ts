import * as yup from 'yup';
import getAllEnumKey from '@utils/getAllEnumKeys';
import { YesNo } from '@constants/BaseCondition';
import validationWording from '@constants/validationWording';
import { TypeItem } from '@modules/Item/interface/item.interface';

const baseCreate = yup
  .object()
  .shape({
    typePeralatanIT: yup
      .mixed<keyof typeof TypeItem>()
      .oneOf(
        getAllEnumKey(TypeItem),
        validationWording.oneOf('type Peralatan IT', ...getAllEnumKey(TypeItem))
      )
      .required(validationWording.required('typePeralatanIT')),
  })
  .required();

const create = yup
  .object()
  .shape({
    floor: yup.string().required(validationWording.required('floor')),
    ruangan: yup.string().required(validationWording.required('ruangan')),
    item: yup.string().required(validationWording.required('item')),
    information: yup
      .string()
      .required(validationWording.required('information')),
  })
  .required();

const update = yup
  .object()
  .shape({
    floor: yup.string(),
    ruangan: yup.string(),
    item: yup.string(),
    information: yup.string(),
  })
  .required();

const createJaringan = yup
  .object()
  .shape({
    status: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('status', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('status')),
  })
  .required();

const updateJaringan = yup
  .object()
  .shape({
    status: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('status', ...getAllEnumKey(YesNo))
      ),
  })
  .required();

const createFisik = yup
  .object()
  .shape({
    hekonisme: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('hekonisme', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('hekonisme')),
  })
  .required();

const updateFisik = yup
  .object()
  .shape({
    hekonisme: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('hekonisme', ...getAllEnumKey(YesNo))
      ),
  })
  .required();

const createPeralatanFisik = create.concat(createFisik).concat(baseCreate);
const updatePeralatanFisik = update.concat(updateFisik);

const createPeralatanJaringan = create
  .concat(createJaringan)
  .concat(baseCreate);
const updatePeralatanJaringan = update.concat(updateJaringan);

export default {
  createPeralatanJaringan,
  updatePeralatanJaringan,
  baseCreate,
  createPeralatanFisik,
  updatePeralatanFisik,
};
