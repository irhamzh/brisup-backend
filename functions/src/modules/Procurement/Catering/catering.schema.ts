import * as yup from 'yup';
import validationWording from '@constants/validationWording';

import {
  EvaluasiValue,
  ListMenuCatering,
} from './interface/catering.interface';

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
            nama: yup
              .mixed()
              .oneOf(ListMenuCatering)
              .required(validationWording.required('nama')),
            price: yup.number().required(validationWording.required('price')),
            qty: yup.number().required(validationWording.required('qty')),
            other: yup.string(),
          })
          .required()
      )
      .required(validationWording.required('menu')),
    performance: yup.mixed().oneOf(EvaluasiValue),
    penyajian: yup.mixed().oneOf(EvaluasiValue),
    sampleMakan: yup.mixed().oneOf(EvaluasiValue),
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
          nama: yup
            .mixed()
            .oneOf(ListMenuCatering)
            .required(validationWording.required('nama')),
          price: yup.number().required(validationWording.required('price')),
          qty: yup.number().required(validationWording.required('qty')),
          other: yup.string(),
        })
        .required()
    ),
    performance: yup.mixed().oneOf(EvaluasiValue),
    penyajian: yup.mixed().oneOf(EvaluasiValue),
    sampleMakan: yup.mixed().oneOf(EvaluasiValue),
  })
  .required();
export default { create, update };
