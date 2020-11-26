import * as yup from 'yup';
import getAllEnumKey from '@utils/getAllEnumKeys';
import { YesNo } from '@constants/BaseCondition';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    roomType: yup.string().required(validationWording.required('roomType')),
    buildingType: yup
      .string()
      .required(validationWording.required('buildingType')),
    ruangan: yup.string().required(validationWording.required('ruangan')),
    tanggal: yup.date().required(validationWording.required('tanggal')),
    information: yup
      .string()
      .required(validationWording.required('information')),
    plafond: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('plafond', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('plafond')),
    lantai: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('lantai', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('lantai')),
    jendela: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('jendela', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('jendela')),
    meja: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('meja', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('meja')),
    kasur: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('kasur', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('kasur')),
    toilet: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('toilet', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('toilet')),
    dinding: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('dinding', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('dinding')),
    pintu: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('pintu', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('pintu')),
    kursi: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('kursi', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('kursi')),
    lampu: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('lampu', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('lampu')),
    lemari: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('lemari', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('lemari')),
    peralatanLainnya: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('peralatanLainnya', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('peralatanLainnya')),
  })
  .required();

const update = yup
  .object()
  .shape({
    roomType: yup.string(),
    buildingType: yup.string(),
    ruangan: yup.string(),
    tanggal: yup.date(),
    information: yup.string(),
    plafond: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('plafond', ...getAllEnumKey(YesNo))
      ),

    lantai: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('lantai', ...getAllEnumKey(YesNo))
      ),
    jendela: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('jendela', ...getAllEnumKey(YesNo))
      ),
    meja: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('meja', ...getAllEnumKey(YesNo))
      ),
    kasur: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('kasur', ...getAllEnumKey(YesNo))
      ),
    toilet: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('toilet', ...getAllEnumKey(YesNo))
      ),
    dinding: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('dinding', ...getAllEnumKey(YesNo))
      ),
    pintu: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('pintu', ...getAllEnumKey(YesNo))
      ),
    kursi: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('kursi', ...getAllEnumKey(YesNo))
      ),
    lampu: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('lampu', ...getAllEnumKey(YesNo))
      ),
    lemari: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('lemari', ...getAllEnumKey(YesNo))
      ),
    peralatanLainnya: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('peralatanLainnya', ...getAllEnumKey(YesNo))
      ),
  })
  .required();

export default {
  create,
  update,
};
