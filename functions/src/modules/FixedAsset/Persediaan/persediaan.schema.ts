import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    name: yup.string().required(validationWording.required('name')),
    jenisBarang: yup
      .string()
      .required(validationWording.required('jenisBarang')),
    tanggal: yup.date().required(validationWording.required('tanggal')),
    stokAwal: yup.number().required(validationWording.required('stokAwal')),
    penambahan: yup.number().required(validationWording.required('penambahan')),
    pengurangan: yup
      .number()
      .required(validationWording.required('pengurangan')),
    // stokAkhir: yup.number().required(validationWording.required('stokAkhir')),
  })
  .required();

const update = yup
  .object()
  .shape({
    name: yup.string(),
    jenisBarang: yup.string(),
    tanggal: yup.date(),
    stokAwal: yup.number(),
    penambahan: yup.number(),
    pengurangan: yup.number(),
    // stokAkhir: yup.number(),
  })
  .required();
export default { create, update };
