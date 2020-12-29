import * as yup from 'yup';
import validationWording from '@constants/validationWording';

import { Perlimpahan } from './interface/anggaran.interface';

const create = yup
  .object()
  .shape({
    tipe: yup.string().required(validationWording.required('tipe')),
    nilai: yup.number().required(validationWording.required('nilai')),
    tanggalPembukuan: yup
      .date()
      .required(validationWording.required('tanggalPembukuan')),
    keperluan: yup.string().required(validationWording.required('keperluan')),
    tanggalPelimpahan: yup
      .date()
      .required(validationWording.required('tanggalPelimpahan')),
    pelimpahan: yup
      .mixed()
      .oneOf(Perlimpahan)
      .required(validationWording.required('Perlimpahan')),
  })
  .required();

const createPenggunaan = {
  nilai: yup.number().required(validationWording.required('nilai')),
  tanggalPembukuan: yup
    .date()
    .required(validationWording.required('tanggalPembukuan')),
  keperluan: yup.string().required(validationWording.required('keperluan')),
  tanggalPelimpahan: yup
    .date()
    .required(validationWording.required('tanggalPelimpahan')),
  pelimpahan: yup
    .mixed()
    .oneOf(Perlimpahan)
    .required(validationWording.required('Perlimpahan')),
};

const createYearMonth = yup
  .object()
  .shape({
    year: yup.number().required(validationWording.required('year')),
    month: yup.number().required(validationWording.required('month')),
  })
  .required();

const createExcel = yup
  .object()
  .shape({
    breakdown: yup.number().required(validationWording.required('breakdown')),
    penggunaan: yup
      .array()
      .of(
        yup
          .object()
          .shape(createPenggunaan)
          .required(validationWording.required('penggunaan'))
      ),
  })
  .concat(createYearMonth)
  .required();

export default { create, createYearMonth, createExcel };
