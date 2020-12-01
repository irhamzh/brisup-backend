import * as yup from 'yup';

import getAllEnumKey from '@utils/getAllEnumKeys';
import validationWording from '@constants/validationWording';

import { TypeExternalVehicle } from './interface/external_vehicle.interface';

const baseCreate = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    type: yup
      .mixed<keyof typeof TypeExternalVehicle>()
      .oneOf(
        getAllEnumKey(TypeExternalVehicle),
        validationWording.oneOf(
          'TypeExternalVehicle',
          ...getAllEnumKey(TypeExternalVehicle)
        )
      )
      .required(validationWording.required('type')),
    biaya: yup.number().required(validationWording.required('biaya')),
    name: yup.string().required(validationWording.required('name')),
    prosesPembayaran: yup
      .boolean()
      .required(validationWording.required('prosesPembayaran')),
  })
  .required();

const createOrder = yup
  .object()
  .shape({
    suratPemesanan: yup
      .boolean()
      .required(validationWording.required('suratPemesanan')),
    dokumenPembayaran: yup
      .boolean()
      .required(validationWording.required('dokumenPembayaran')),
  })
  .required()
  .concat(baseCreate);

const createReimburse = yup
  .object()
  .shape({
    buktiReimburse: yup
      .boolean()
      .required(validationWording.required('buktiReimburse')),
    membuatRegister: yup
      .boolean()
      .required(validationWording.required('membuatRegister')),
  })
  .required()
  .concat(baseCreate);

const baseUpdate = yup
  .object()
  .shape({
    name: yup.string(),
    biaya: yup.number(),
    tanggal: yup.date(),
    prosesPembayaran: yup.boolean(),
  })
  .required();

const updateOrder = yup
  .object()
  .shape({
    suratPemesanan: yup.boolean(),
    dokumenPembayaran: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);

const updateReimburse = yup
  .object()
  .shape({
    buktiReimburse: yup.boolean(),
    membuatRegister: yup.boolean(),
  })
  .required()
  .concat(baseUpdate);
export default {
  baseCreate,
  createOrder,
  createReimburse,
  updateOrder,
  updateReimburse,
};
