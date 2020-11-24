import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    workingOrder: yup
      .string()
      .required(validationWording.required('workingOrder')),
    vendor: yup.string().required(validationWording.required('vendor')),
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
            name: yup.string().required(validationWording.required('name')),
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
    vendor: yup.string(),
    noSuratPesanan: yup.string(),
    kebutuhan: yup.string(),
    barang: yup.array().of(
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
