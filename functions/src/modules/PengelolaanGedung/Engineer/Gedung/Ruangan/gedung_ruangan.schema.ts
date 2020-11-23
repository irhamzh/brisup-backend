import * as yup from 'yup';
import getAllEnumKey from '@utils/getAllEnumKeys';
import { BaseCondition1 } from '@constants/BaseCondition';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    roomType: yup.string().required(validationWording.required('roomType')),
    buldingType: yup
      .string()
      .required(validationWording.required('buldingType')),
    ruangan: yup.string().required(validationWording.required('ruangan')),
    tanggal: yup.date().required(validationWording.required('tanggal')),
    information: yup
      .string()
      .required(validationWording.required('information')),
    plafond: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('plafond', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('plafond')),
    lantai: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('lantai', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('lantai')),
    jendela: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('jendela', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('jendela')),
    meja: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('meja', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('meja')),
    kasur: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('kasur', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('kasur')),
    toilet: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('toilet', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('toilet')),
    dinding: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('dinding', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('dinding')),
    pintu: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('pintu', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('pintu')),
    kursi: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('kursi', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('kursi')),
    lampu: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('lampu', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('lampu')),
    lemari: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('lemari', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('lemari')),
    peralatanLainnya: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf(
          'peralatanLainnya',
          ...getAllEnumKey(BaseCondition1)
        )
      )
      .required(validationWording.required('peralatanLainnya')),
  })
  .required();

const update = yup
  .object()
  .shape({
    roomType: yup.string(),
    buldingType: yup.string(),
    ruangan: yup.string(),
    tanggal: yup.date(),
    information: yup.string(),
    plafond: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('plafond', ...getAllEnumKey(BaseCondition1))
      ),

    lantai: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('lantai', ...getAllEnumKey(BaseCondition1))
      ),
    jendela: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('jendela', ...getAllEnumKey(BaseCondition1))
      ),
    meja: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('meja', ...getAllEnumKey(BaseCondition1))
      ),
    kasur: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('kasur', ...getAllEnumKey(BaseCondition1))
      ),
    toilet: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('toilet', ...getAllEnumKey(BaseCondition1))
      ),
    dinding: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('dinding', ...getAllEnumKey(BaseCondition1))
      ),
    pintu: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('pintu', ...getAllEnumKey(BaseCondition1))
      ),
    kursi: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('kursi', ...getAllEnumKey(BaseCondition1))
      ),
    lampu: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('lampu', ...getAllEnumKey(BaseCondition1))
      ),
    lemari: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('lemari', ...getAllEnumKey(BaseCondition1))
      ),
    peralatanLainnya: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf(
          'peralatanLainnya',
          ...getAllEnumKey(BaseCondition1)
        )
      ),
  })
  .required();

export default {
  create,
  update,
};
