import * as yup from 'yup';
import validationWording from '@constants/validationWording';

import {
  HotelClasification,
  ListFacilitas,
} from './interface/klasifikasi_hotel.interface';

// declare module 'yup' {
//   // tslint:disable-next-line
//   interface ArraySchema<T> {
//     unique(mapper: (a: T) => T, message?: any): ArraySchema<T>;
//   }
// }

// yup.addMethod(yup.array, 'unique', function (
//   mapper = (a: any) => a,
//   message: string = '${path} may not have duplicates'
// ) {
//   return this.test('unique', message, (list) => {
//     return list.length === new Set(list.map(mapper)).size;
//   });
// });

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
            nama: yup
              .mixed()
              .oneOf(ListFacilitas)
              .required(validationWording.required('nama')),
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
          nama: yup
            .mixed()
            .oneOf(ListFacilitas)
            .required(validationWording.required('nama')),
          price: yup.number().required(validationWording.required('price')),
        })
        .required()
    ),
  })
  .required();
export default { create, update };
