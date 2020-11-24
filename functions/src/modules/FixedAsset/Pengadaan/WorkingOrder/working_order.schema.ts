import * as yup from 'yup';
import validationWording from '@constants/validationWording';
import getAllEnumKey from '@utils/getAllEnumKeys';
import { TypeKegiatan } from './interface/working_order.interface';
import { Division, YesNo } from '@constants/BaseCondition';

const create = yup
  .object()
  .shape({
    // kodeWorkingOrder: yup
    //   .string()
    //   .required(validationWording.required('kodeWorkingOrder')),
    division: yup
      .mixed<keyof typeof Division>()
      .oneOf(
        getAllEnumKey(Division),
        validationWording.oneOf('division', ...getAllEnumKey(Division))
      )
      .required(validationWording.required('division')),
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
    catering: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('catering', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('catering')),
    atk: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('atk', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('atk')),
    hotel: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('hotel', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('hotel')),
    akomodasi: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('akomodasi', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('akomodasi')),
    pengajarEksternal: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('pengajarEksternal', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('pengajarEksternal')),
  })
  .required();

const update = yup
  .object()
  .shape({
    // kodeWorkingOrder: yup.string(),
    division: yup
      .mixed<keyof typeof Division>()
      .oneOf(
        getAllEnumKey(Division),
        validationWording.oneOf('division', ...getAllEnumKey(Division))
      ),
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
    catering: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('catering', ...getAllEnumKey(YesNo))
      ),
    atk: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('atk', ...getAllEnumKey(YesNo))
      ),
    hotel: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('hotel', ...getAllEnumKey(YesNo))
      ),
    akomodasi: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('akomodasi', ...getAllEnumKey(YesNo))
      ),
    pengajarEksternal: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('pengajarEksternal', ...getAllEnumKey(YesNo))
      ),
  })
  .required();
export default { create, update };
