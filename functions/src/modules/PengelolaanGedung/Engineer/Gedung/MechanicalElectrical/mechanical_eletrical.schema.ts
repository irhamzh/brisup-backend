import * as yup from 'yup';
import getAllEnumKey from '@utils/getAllEnumKeys';
import { BaseCondition1 } from '@constants/BaseCondition';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    floor: yup.string().required(validationWording.required('floor')),
    buildingType: yup
      .string()
      .required(validationWording.required('buildingType')),
    expiredTabung: yup
      .date()
      .required(validationWording.required('expiredTabung')),
    information: yup
      .string()
      .required(validationWording.required('information')),
    smokeDetector: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf(
          'smokeDetector',
          ...getAllEnumKey(BaseCondition1)
        )
      )
      .required(validationWording.required('smokeDetector')),
    thermostat: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('thermostat', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('thermostat')),
    fireAlarm: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('fireAlarm', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('fireAlarm')),
    ceillingSpeaker: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf(
          'ceillingSpeaker',
          ...getAllEnumKey(BaseCondition1)
        )
      )
      .required(validationWording.required('ceillingSpeaker')),
    cctv: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('cctv', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('cctv')),
    acSystem: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('acSystem', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('acSystem')),
    telephone: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('telephone', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('telephone')),
    exhaust: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('exhaust', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('exhaust')),
    headSprinkler: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf(
          'headSprinkler',
          ...getAllEnumKey(BaseCondition1)
        )
      )
      .required(validationWording.required('headSprinkler')),
    mccb: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('mccb', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('mccb')),
    valves: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('valves', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('valves')),
    segel: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('segel', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('segel')),
    selang: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('selang', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('selang')),
    hose: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('hose', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('hose')),
    pintu: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('pintu', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('pintu')),
    apar: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('apar', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('apar')),
    pin: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('pin', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('pin')),
    nozle: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('nozle', ...getAllEnumKey(BaseCondition1))
      )
      .required(validationWording.required('nozle')),
    lampuIndikator: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf(
          'lampuIndikator',
          ...getAllEnumKey(BaseCondition1)
        )
      )
      .required(validationWording.required('lampuIndikator')),
  })
  .required();

const update = yup
  .object()
  .shape({
    floor: yup.string(),
    buildingType: yup.string(),
    expiredTabung: yup.date(),
    information: yup.string(),
    smokeDetector: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf(
          'smokeDetector',
          ...getAllEnumKey(BaseCondition1)
        )
      ),
    thermostat: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('thermostat', ...getAllEnumKey(BaseCondition1))
      ),
    fireAlarm: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('fireAlarm', ...getAllEnumKey(BaseCondition1))
      ),
    ceillingSpeaker: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf(
          'ceillingSpeaker',
          ...getAllEnumKey(BaseCondition1)
        )
      ),
    cctv: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('cctv', ...getAllEnumKey(BaseCondition1))
      ),
    acSystem: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('acSystem', ...getAllEnumKey(BaseCondition1))
      ),
    telephone: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('telephone', ...getAllEnumKey(BaseCondition1))
      ),
    exhaust: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('exhaust', ...getAllEnumKey(BaseCondition1))
      ),
    headSprinkler: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf(
          'headSprinkler',
          ...getAllEnumKey(BaseCondition1)
        )
      ),
    mccb: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('mccb', ...getAllEnumKey(BaseCondition1))
      ),
    valves: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('valves', ...getAllEnumKey(BaseCondition1))
      ),
    segel: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('segel', ...getAllEnumKey(BaseCondition1))
      ),
    selang: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('selang', ...getAllEnumKey(BaseCondition1))
      ),
    hose: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('hose', ...getAllEnumKey(BaseCondition1))
      ),
    pintu: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('pintu', ...getAllEnumKey(BaseCondition1))
      ),
    apar: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('apar', ...getAllEnumKey(BaseCondition1))
      ),
    pin: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('pin', ...getAllEnumKey(BaseCondition1))
      ),
    nozle: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('nozle', ...getAllEnumKey(BaseCondition1))
      ),
    lampuIndikator: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf(
          'lampuIndikator',
          ...getAllEnumKey(BaseCondition1)
        )
      ),
  })
  .required();

export default {
  create,
  update,
};
