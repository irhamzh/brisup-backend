import * as yup from 'yup';
import getAllEnumKey from '@utils/getAllEnumKeys';
import validationWording from '@constants/validationWording';
import { TypeMonitoring } from './interface/vendor.interface';
import { YesNo } from '@interfaces/BaseInterface';

const baseCreateMonitoring = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    typeMonitoring: yup
      .mixed<keyof typeof TypeMonitoring>()
      .oneOf(
        getAllEnumKey(TypeMonitoring),
        validationWording.oneOf(
          'Type Monitoring',
          ...getAllEnumKey(TypeMonitoring)
        )
      )
      .required(validationWording.required('Type Monitoring')),
  })
  .required();

const baseCreatePartner = yup
  .object()
  .shape({
    partner: yup.string().required(validationWording.required('partner')),
  })
  .required();

const baseUpdateMonitoring = yup
  .object()
  .shape({
    tanggal: yup.date(),
  })
  .required();

const baseUpdatePartner = yup
  .object()
  .shape({
    partner: yup.string(),
  })
  .required();

const monitoringPestControl = yup
  .object()
  .shape({
    toilet: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('toilet', ...getAllEnumKey(YesNo))
      ),
    musholla: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('musholla', ...getAllEnumKey(YesNo))
      ),
    lobbyLounge: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('lobbyLounge', ...getAllEnumKey(YesNo))
      ),
    ruangMeeting: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('ruangMeeting', ...getAllEnumKey(YesNo))
      ),
    ruangKelas: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('ruangKelas', ...getAllEnumKey(YesNo))
      ),
    ruangKerja: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('ruangKerja', ...getAllEnumKey(YesNo))
      ),
    corridor: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('corridor', ...getAllEnumKey(YesNo))
      ),
    tanggaDarurat: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('tanggaDarurat', ...getAllEnumKey(YesNo))
      ),
    ruangSampah: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('ruangSampah', ...getAllEnumKey(YesNo))
      ),
    ruangShaft: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('ruangShaft', ...getAllEnumKey(YesNo))
      ),
    parkirMotor: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('parkirMotor', ...getAllEnumKey(YesNo))
      ),
    halaman: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('halaman', ...getAllEnumKey(YesNo))
      ),
  })
  .required();

const monitoringPengangkutanSampah = yup
  .object()
  .shape({
    pengangkutanSampah: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('pengangkutanSampah', ...getAllEnumKey(YesNo))
      ),
  })
  .required();

const monitoringTanamanHias = yup
  .object()
  .shape({
    tanamanHiasL1: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('tanamanHiasL1', ...getAllEnumKey(YesNo))
      ),
    tanamanHiasL2: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('tanamanHiasL2', ...getAllEnumKey(YesNo))
      ),
    tanamanHiasL3: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('tanamanHiasL3', ...getAllEnumKey(YesNo))
      ),
    tanamanHiasL4: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('tanamanHiasL4', ...getAllEnumKey(YesNo))
      ),
    tanamanHiasL5: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('tanamanHiasL5', ...getAllEnumKey(YesNo))
      ),
    tanamanHiasL6: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('tanamanHiasL6', ...getAllEnumKey(YesNo))
      ),
  })
  .required();

const monitoringPewangiRuangan = yup
  .object()
  .shape({
    pewangiRuanganL1: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('pewangiRuanganL1', ...getAllEnumKey(YesNo))
      ),
    pewangiRuanganL2: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('pewangiRuanganL2', ...getAllEnumKey(YesNo))
      ),
    pewangiRuanganL3: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('pewangiRuanganL3', ...getAllEnumKey(YesNo))
      ),
    pewangiRuanganL4: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('pewangiRuanganL4', ...getAllEnumKey(YesNo))
      ),
    pewangiRuanganL5: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('pewangiRuanganL5', ...getAllEnumKey(YesNo))
      ),
    pewangiRuanganL6: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('pewangiRuanganL6', ...getAllEnumKey(YesNo))
      ),
  })
  .required();

const createLift = yup
  .object()
  .shape({
    lift: yup.string().required(validationWording.required('lift')),
  })
  .required();

const updateLift = yup
  .object()
  .shape({
    lift: yup.string(),
  })
  .required();

const createInformation = yup
  .object()
  .shape({
    information: yup
      .string()
      .required(validationWording.required('information')),
  })
  .required();

const updateInformation = yup
  .object()
  .shape({
    information: yup.string(),
  })
  .required();

const monitoringLift = yup
  .object()
  .shape({
    cleaningAreaSangkarL1: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf(
          'cleaningAreaSangkarL1',
          ...getAllEnumKey(YesNo)
        )
      ),
    cleaningAreaSangkarL2: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf(
          'cleaningAreaSangkarL2',
          ...getAllEnumKey(YesNo)
        )
      ),
    cleaningAreaSangkarL3: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf(
          'cleaningAreaSangkarL3',
          ...getAllEnumKey(YesNo)
        )
      ),
    cleaningAreaSangkarL4: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf(
          'cleaningAreaSangkarL4',
          ...getAllEnumKey(YesNo)
        )
      ),
    cleaningAreaSangkarL5: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf(
          'cleaningAreaSangkarL5',
          ...getAllEnumKey(YesNo)
        )
      ),
    cleaningAreaSangkarL6: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf(
          'cleaningAreaSangkarL6',
          ...getAllEnumKey(YesNo)
        )
      ),
    oliRelSangkarLift: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('oliRelSangkarLift', ...getAllEnumKey(YesNo))
      ),
    taliSelingLift: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('taliSelingLift', ...getAllEnumKey(YesNo))
      ),
    pengeremanLift: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('pengeremanLift', ...getAllEnumKey(YesNo))
      ),
    exhaustFanLift: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('exhaustFanLift', ...getAllEnumKey(YesNo))
      ),
    mesinMotorLift: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('mesinMotorLift', ...getAllEnumKey(YesNo))
      ),
    powerListrikLift: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('powerListrikLift', ...getAllEnumKey(YesNo))
      ),
  })
  .required();

const monitoringGondola = yup
  .object()
  .shape({
    sistemKerjaTaliBaja: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('sistemKerjaTaliBaja', ...getAllEnumKey(YesNo))
      ),
    panelKelistrikan: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('panelKelistrikan', ...getAllEnumKey(YesNo))
      ),
    perangkatKerjaGondola: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf(
          'perangkatKerjaGondola',
          ...getAllEnumKey(YesNo)
        )
      ),
  })
  .required();

const createMonitoringPestControl = baseCreateMonitoring
  .concat(baseCreatePartner)
  .concat(monitoringPestControl);

const updateMonitoringPestControl = baseUpdateMonitoring
  .concat(baseUpdatePartner)
  .concat(monitoringPestControl);

const createPengangkutanSampah = baseCreateMonitoring
  .concat(baseCreatePartner)
  .concat(monitoringPengangkutanSampah);

const updatePengangkutanSampah = baseUpdateMonitoring
  .concat(baseUpdatePartner)
  .concat(monitoringPengangkutanSampah);

const createTanamanHias = baseCreateMonitoring
  .concat(baseCreatePartner)
  .concat(monitoringTanamanHias);

const updateTanamanHias = baseUpdateMonitoring
  .concat(baseUpdatePartner)
  .concat(monitoringTanamanHias);

const createPewangiRuangan = baseCreateMonitoring
  .concat(baseCreatePartner)
  .concat(monitoringPewangiRuangan);

const updatePewangiRuangan = baseUpdateMonitoring
  .concat(baseUpdatePartner)
  .concat(monitoringPewangiRuangan);

const createMonitoringLift = baseCreateMonitoring
  .concat(createLift)
  .concat(monitoringLift);

const updateMonitoringLift = baseUpdateMonitoring
  .concat(updateLift)
  .concat(monitoringLift);

const createMonitoringGondola = baseCreateMonitoring
  .concat(createInformation)
  .concat(monitoringGondola);

const updateMonitoringGondola = baseUpdateMonitoring
  .concat(updateInformation)
  .concat(monitoringGondola);

export default {
  createMonitoringPestControl,
  updateMonitoringPestControl,
  createPengangkutanSampah,
  updatePengangkutanSampah,
  createTanamanHias,
  updateTanamanHias,
  createPewangiRuangan,
  updatePewangiRuangan,
  createMonitoringLift,
  updateMonitoringLift,
  createMonitoringGondola,
  updateMonitoringGondola,
  baseCreateMonitoring,
};
