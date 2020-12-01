import * as yup from 'yup';
import validationWording from '@constants/validationWording';
import getAllEnumKey from '@utils/getAllEnumKeys';

import { Status, Type } from './interface/internship.interface';

const baseCreate = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    name: yup.string().required(validationWording.required('name')),
    tahunMasuk: yup.number().required(validationWording.required('tahunMasuk')),
    type: yup
      .mixed<keyof typeof Type>()
      .oneOf(
        getAllEnumKey(Type),
        validationWording.oneOf('Type', ...getAllEnumKey(Type))
      )
      .required(validationWording.required('type')),
  })
  .required();

const createSekolah = yup
  .object()
  .shape({
    sekolah: yup.string().required(validationWording.required('sekolah')),
    skor: yup.number().required(validationWording.required('skor')),
    status: yup
      .mixed()
      .oneOf(Status)
      .required(validationWording.required('Status')),
  })
  .required()
  .concat(baseCreate);

const createUniversity = yup
  .object()
  .shape({
    universitas: yup
      .string()
      .required(validationWording.required('universitas')),
  })
  .required()
  .concat(baseCreate);

const baseUpdate = yup
  .object()
  .shape({
    tanggal: yup.date(),
    name: yup.string(),
    tahunMasuk: yup.number(),
  })
  .required();

const updateSekolah = yup
  .object()
  .shape({
    sekolah: yup.string(),
    skor: yup.number(),
    status: yup.mixed().oneOf(Status),
  })
  .required()
  .concat(baseUpdate);

const updateUniversity = yup
  .object()
  .shape({
    universitas: yup.string(),
  })
  .required()
  .concat(baseUpdate);

export default {
  baseCreate,
  createUniversity,
  createSekolah,
  updateSekolah,
  updateUniversity,
};
