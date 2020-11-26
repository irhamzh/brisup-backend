import * as yup from 'yup';
import getAllEnumKey from '@utils/getAllEnumKeys';
import { YesNo } from '@constants/BaseCondition';
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
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('smokeDetector', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('smokeDetector')),
    thermostat: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('thermostat', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('thermostat')),
    fireAlarm: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('fireAlarm', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('fireAlarm')),
    ceillingSpeaker: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('ceillingSpeaker', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('ceillingSpeaker')),
    cctv: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('cctv', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('cctv')),
    acSystem: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('acSystem', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('acSystem')),
    telephone: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('telephone', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('telephone')),
    exhaust: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('exhaust', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('exhaust')),
    headSprinkler: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('headSprinkler', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('headSprinkler')),
    mccb: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('mccb', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('mccb')),
    valves: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('valves', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('valves')),
    segel: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('segel', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('segel')),
    selang: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('selang', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('selang')),
    hose: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('hose', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('hose')),
    pintu: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('pintu', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('pintu')),
    apar: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('apar', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('apar')),
    pin: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('pin', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('pin')),
    nozle: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('nozle', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('nozle')),
    lampuIndikator: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('lampuIndikator', ...getAllEnumKey(YesNo))
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
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('smokeDetector', ...getAllEnumKey(YesNo))
      ),
    thermostat: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('thermostat', ...getAllEnumKey(YesNo))
      ),
    fireAlarm: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('fireAlarm', ...getAllEnumKey(YesNo))
      ),
    ceillingSpeaker: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('ceillingSpeaker', ...getAllEnumKey(YesNo))
      ),
    cctv: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('cctv', ...getAllEnumKey(YesNo))
      ),
    acSystem: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('acSystem', ...getAllEnumKey(YesNo))
      ),
    telephone: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('telephone', ...getAllEnumKey(YesNo))
      ),
    exhaust: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('exhaust', ...getAllEnumKey(YesNo))
      ),
    headSprinkler: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('headSprinkler', ...getAllEnumKey(YesNo))
      ),
    mccb: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('mccb', ...getAllEnumKey(YesNo))
      ),
    valves: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('valves', ...getAllEnumKey(YesNo))
      ),
    segel: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('segel', ...getAllEnumKey(YesNo))
      ),
    selang: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('selang', ...getAllEnumKey(YesNo))
      ),
    hose: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('hose', ...getAllEnumKey(YesNo))
      ),
    pintu: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('pintu', ...getAllEnumKey(YesNo))
      ),
    apar: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('apar', ...getAllEnumKey(YesNo))
      ),
    pin: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('pin', ...getAllEnumKey(YesNo))
      ),
    nozle: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('nozle', ...getAllEnumKey(YesNo))
      ),
    lampuIndikator: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('lampuIndikator', ...getAllEnumKey(YesNo))
      ),
  })
  .required();

export default {
  create,
  update,
};
