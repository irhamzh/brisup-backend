import * as yup from 'yup';
import validationWording from '@constants/validationWording';

import { ListBarang } from './interface/klasifikasi_atk.interface';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    workingOrder: yup
      .string()
      .required(validationWording.required('workingOrder')),
    provider: yup.string().required(validationWording.required('provider')),
    noSuratPesanan: yup
      .string()
      .required(validationWording.required('noSuratPesanan')),
    kebutuhan: yup.string().required(validationWording.required('kebutuhan')),
    barang: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            nama: yup
              .mixed()
              .oneOf(ListBarang)
              .required(validationWording.required('nama')),
            price: yup.number().required(validationWording.required('price')),
          })
          .required()
      )
      .required(validationWording.required('barang')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    workingOrder: yup.string(),
    provider: yup.string(),
    noSuratPesanan: yup.string(),
    kebutuhan: yup.string(),
    barang: yup.array().of(
      yup
        .object()
        .shape({
          nama: yup
            .mixed()
            .oneOf(ListBarang)
            .required(validationWording.required('nama')),
          price: yup.number().required(validationWording.required('price')),
        })
        .required()
    ),
  })
  .required();
export default { create, update };
