import * as yup from 'yup';
import validationWording from '@constants/validationWording';

import { ConsumptionType } from './interface/consumption.interface';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    workingOrder: yup
      .string()
      .required(validationWording.required('workingOrder')),
    catering: yup.string().required(validationWording.required('catering')),
    noSuratPesanan: yup
      .string()
      .required(validationWording.required('noSuratPesanan')),
    kebutuhan: yup.string().required(validationWording.required('kebutuhan')),
    menu: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            name: yup.string().required(validationWording.required('name')),
            price: yup.number().required(validationWording.required('price')),
          })
          .required()
      )
      .required(validationWording.required('menu')),
    consumptionType: yup
      .mixed()
      .oneOf(ConsumptionType)
      .required(validationWording.required('Consumption Type')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    workingOrder: yup.string(),
    catering: yup.string(),
    noSuratPesanan: yup.string(),
    kebutuhan: yup.string(),
    menu: yup.array().of(
      yup
        .object()
        .shape({
          name: yup.string().required(validationWording.required('name')),
          price: yup.number().required(validationWording.required('price')),
        })
        .required()
    ),
    consumptionType: yup.mixed().oneOf(ConsumptionType),
  })
  .required();
export default { create, update };
