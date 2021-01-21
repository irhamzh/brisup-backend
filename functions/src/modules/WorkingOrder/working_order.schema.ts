import * as yup from 'yup';
import validationWording from '@constants/validationWording';
import getAllEnumKey from '@utils/getAllEnumKeys';
import {
  TypeKegiatan,
  TypeGeneralAffair,
} from './interface/working_order.interface';
import { Division, YesNo } from '@constants/BaseCondition';

const baseCreate = yup
  .object()
  .shape({
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
    kodePelatihan: yup.string(),
    tanggalTerima: yup
      .date()
      .required(validationWording.required('tanggalTerima')),
  })
  .required();

const createGeneralAffair = yup
  .object()
  .shape({
    typeKegiatan: yup
      .mixed<keyof typeof TypeGeneralAffair>()
      .oneOf(
        getAllEnumKey(TypeGeneralAffair),
        validationWording.oneOf(
          'TypeGeneralAffair',
          ...getAllEnumKey(TypeGeneralAffair)
        )
      )
      .required(validationWording.required('type kegiatan')),
  })
  .required()
  .concat(baseCreate);

const create = yup
  .object()
  .shape({
    typeKegiatan: yup
      .mixed<keyof typeof TypeKegiatan>()
      .oneOf(
        getAllEnumKey(TypeKegiatan),
        validationWording.oneOf('TypeKegiatan', ...getAllEnumKey(TypeKegiatan))
      )
      .required(validationWording.required('type kegiatan')),

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
  .required()
  .concat(baseCreate);

const baseUpdate = yup
  .object()
  .shape({
    namaKegiatan: yup.string(),
    kodePelatihan: yup.string(),
    tanggalTerima: yup.date(),
  })
  .required();

const updateGeneralAffair = yup
  .object()
  .shape({
    typeKegiatan: yup
      .mixed<keyof typeof TypeGeneralAffair>()
      .oneOf(
        getAllEnumKey(TypeGeneralAffair),
        validationWording.oneOf(
          'TypeGeneralAffair',
          ...getAllEnumKey(TypeGeneralAffair)
        )
      ),
  })
  .required()
  .concat(baseUpdate);
const update = yup
  .object()
  .shape({
    typeKegiatan: yup
      .mixed<keyof typeof TypeKegiatan>()
      .oneOf(
        getAllEnumKey(TypeKegiatan),
        validationWording.oneOf('TypeKegiatan', ...getAllEnumKey(TypeKegiatan))
      ),
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
  .required()
  .concat(baseUpdate);
export default {
  baseCreate,
  baseUpdate,
  create,
  createGeneralAffair,
  update,
  updateGeneralAffair,
};
