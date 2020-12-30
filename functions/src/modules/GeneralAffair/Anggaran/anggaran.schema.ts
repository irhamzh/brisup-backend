import * as yup from 'yup';

import getAllEnumKey from '@utils/getAllEnumKeys';
import validationWording from '@constants/validationWording';
import {
  Pelimpahan,
  CategoryAnggaran,
  TypeAnggaran,
} from './interface/anggaran.interface';

const create = yup
  .object()
  .shape({
    year: yup.number().required(validationWording.required('year')),
    month: yup.number().required(validationWording.required('month')),
    categoryAnggaran: yup
      .mixed()
      .oneOf(CategoryAnggaran)
      .required(validationWording.required('Pelimpahan')),
    type: yup
      .mixed<keyof typeof TypeAnggaran>()
      .oneOf(
        getAllEnumKey(TypeAnggaran),
        validationWording.oneOf('type', ...getAllEnumKey(TypeAnggaran))
      )
      .required(validationWording.required('Tipe Anggaran')),
    nilai: yup.number().required(validationWording.required('nilai')),
  })
  .required();

const createPenggunaan = yup
  .object()
  .shape({
    tanggalPembukuan: yup
      .date()
      .required(validationWording.required('tanggalPembukuan')),
    keperluan: yup.string().required(validationWording.required('keperluan')),
    tanggalPelimpahan: yup
      .date()
      .required(validationWording.required('tanggalPelimpahan')),
    pelimpahan: yup
      .mixed()
      .oneOf(Pelimpahan)
      .required(validationWording.required('Pelimpahan')),
  })
  .concat(create)
  .required();

const update = yup
  .object()
  .shape({
    id: yup.string().required(validationWording.required('id')),
    nilai: yup.number(),
    tanggalPembukuan: yup.date(),
    keperluan: yup.string(),
    tanggalPelimpahan: yup.date(),
    pelimpahan: yup.mixed().oneOf(Pelimpahan),
  })
  .required();

export default { create, createPenggunaan, update };
