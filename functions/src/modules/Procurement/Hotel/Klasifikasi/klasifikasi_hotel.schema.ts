import * as yup from 'yup';
import validationWording from '@constants/validationWording';

import { HotelClasification } from './interface/klasifikasi_hotel.interface';

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
    hotelName: yup.string().required(validationWording.required('hotelName')),
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
            name: yup.string().required(validationWording.required('name')),
            price: yup.number().required(validationWording.required('price')),
          })
          .required()
      )
      .required(validationWording.required('facilities')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    workingOrder: yup.string(),
    noSuratPesanan: yup.string(),
    kedudukanJabatan: yup.string(),
    hotelName: yup.string(),
    hotelClasification: yup.mixed().oneOf(HotelClasification),
    facilities: yup.array().of(
      yup
        .object()
        .shape({
          name: yup.string().required(validationWording.required('name')),
          price: yup.number().required(validationWording.required('price')),
        })
        .required()
    ),
  })
  .required();
export default { create, update };
