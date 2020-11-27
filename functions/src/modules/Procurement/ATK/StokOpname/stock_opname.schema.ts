import * as yup from 'yup';
import validationWording from '@constants/validationWording';
import { ListBarang } from '../Klasifikasi/interface/klasifikasi_atk.interface';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    workingOrder: yup
      .string()
      .required(validationWording.required('workingOrder')),
    education: yup.string().required(validationWording.required('education')),
    barang: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            name: yup
              .mixed()
              .oneOf(ListBarang)
              .required(validationWording.required('name')),
            stockAwal: yup
              .number()
              .required(validationWording.required('stockAwal')),
            jumlahMasuk: yup
              .number()
              .required(validationWording.required('jumlahMasuk')),
            jumlahKeluar: yup
              .number()
              .required(validationWording.required('jumlahKeluar')),
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
    education: yup.string(),
    barang: yup.array().of(
      yup
        .object()
        .shape({
          name: yup.mixed().oneOf(ListBarang),
          stockAwal: yup.number(),
          jumlahMasuk: yup.number(),
          jumlahKeluar: yup.number(),
        })
        .required()
    ),
  })
  .required();
export default { create, update };
