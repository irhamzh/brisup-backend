import * as yup from 'yup';
import validationWording from '@constants/validationWording';

import {
  HotelClasification,
  ListFacilitas,
  Performace,
} from './interface/hotel.interface';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    workingOrder: yup
      .string()
      .required(validationWording.required('workingOrder')),
    noSuratPesanan: yup
      .string()
      .required(validationWording.required('noSuratPesanan')),
    kedudukanJabatan: yup
      .string()
      .required(validationWording.required('kedudukanJabatan')),
    hotel: yup.string().required(validationWording.required('hotel')),
    hotelClasification: yup
      .mixed()
      .oneOf(HotelClasification)
      .required(validationWording.required('hotelClasification')),
    facilities: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            nama: yup
              .mixed()
              .oneOf(ListFacilitas)
              .required(validationWording.required('nama')),
            price: yup.number().required(validationWording.required('price')),
            jumlahPeserta: yup
              .number()
              .required(validationWording.required('jumlahPeserta')),
            other: yup.string(),
          })
          .required()
      )
      .required(validationWording.required('facilities')),
    remark: yup.string(),
    performance: yup.mixed().oneOf(Performace),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    workingOrder: yup.string(),
    noSuratPesanan: yup.string(),
    kedudukanJabatan: yup.string(),
    hotel: yup.string(),
    hotelClasification: yup.mixed().oneOf(HotelClasification),
    facilities: yup.array().of(
      yup
        .object()
        .shape({
          nama: yup
            .mixed()
            .oneOf(ListFacilitas)
            .required(validationWording.required('nama')),
          price: yup.number().required(validationWording.required('price')),
          jumlahPeserta: yup
            .number()
            .required(validationWording.required('jumlahPeserta')),
          other: yup.string(),
        })
        .required()
    ),
    remark: yup.string(),
    performance: yup.mixed().oneOf(Performace),
  })
  .required();
export default { create, update };
