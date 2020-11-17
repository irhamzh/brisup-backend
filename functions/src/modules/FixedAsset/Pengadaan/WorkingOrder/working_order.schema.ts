import * as yup from 'yup';
import validationWording from '@constants/validationWording';
import getAllEnumKey from '@utils/getAllEnumKeys';
import { TypeKegiatan } from './interface/working_order.interface';

const create = yup
  .object()
  .shape({
    kodeWorkingOrder: yup
      .string()
      .required(validationWording.required('kodeWorkingOrder')),
    namaKegiatan: yup
      .string()
      .required(validationWording.required('namaKegiatan')),
    typeKegiatan: yup
      .mixed<keyof typeof TypeKegiatan>()
      .oneOf(
        getAllEnumKey(TypeKegiatan),
        validationWording.oneOf('TypeKegiatan', ...getAllEnumKey(TypeKegiatan))
      )
      .required(validationWording.required('type kegiatan')),
    kodePelatihan: yup
      .string()
      .required(validationWording.required('kodePelatihan')),
    tanggalTerima: yup
      .date()
      .required(validationWording.required('tanggalTerima')),
    tanggalRevisi: yup
      .date()
      .required(validationWording.required('tanggalRevisi')),
    tanggalKonfirmasi: yup
      .date()
      .required(validationWording.required('tanggalKonfirmasi')),
    catering: yup.string().required(validationWording.required('catering')),
    atk: yup.string().required(validationWording.required('atk')),
    hotel: yup.string().required(validationWording.required('hotel')),
    akomodasi: yup.string().required(validationWording.required('akomodasi')),
    pengajarEksternal: yup
      .string()
      .required(validationWording.required('pengajarEksternal')),
  })
  .required();

const update = yup
  .object()
  .shape({
    kodeWorkingOrder: yup.string(),
    namaKegiatan: yup.string(),
    typeKegiatan: yup
      .mixed<keyof typeof TypeKegiatan>()
      .oneOf(
        getAllEnumKey(TypeKegiatan),
        validationWording.oneOf('TypeKegiatan', ...getAllEnumKey(TypeKegiatan))
      ),
    kodePelatihan: yup.string(),
    tanggalTerima: yup.date(),
    tanggalRevisi: yup.date(),
    tanggalKonfirmasi: yup.date(),
    catering: yup.string(),
    atk: yup.string(),
    hotel: yup.string(),
    akomodasi: yup.string(),
    pengajarEksternal: yup.string(),
  })
  .required();
export default { create, update };
