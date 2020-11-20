import * as yup from 'yup';
import getAllEnumKey from '@utils/getAllEnumKeys';
import validationWording from '@constants/validationWording';
import { TypeMonitoring } from './interface/vendor.interface';
// import { YesNo } from '@interfaces/BaseInterface';

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
    toilet: yup.boolean(),
    musholla: yup.boolean(),
    lobbyLounge: yup.boolean(),
    ruangMeeting: yup.boolean(),
    ruangKelas: yup.boolean(),
    ruangKerja: yup.boolean(),
    corridor: yup.boolean(),
    tanggaDarurat: yup.boolean(),
    ruangSampah: yup.boolean(),
    ruangShaft: yup.boolean(),
    parkirMotor: yup.boolean(),
    halaman: yup.boolean(),
  })
  .required();

const monitoringPengangkutanSampah = yup
  .object()
  .shape({
    pengangkutanSampah: yup.boolean(),
  })
  .required();

const monitoringTanamanHias = yup
  .object()
  .shape({
    tanamanHiasL1: yup.boolean(),
    tanamanHiasL2: yup.boolean(),
    tanamanHiasL3: yup.boolean(),
    tanamanHiasL4: yup.boolean(),
    tanamanHiasL5: yup.boolean(),
    tanamanHiasL6: yup.boolean(),
  })
  .required();

const monitoringPewangiRuangan = yup
  .object()
  .shape({
    pewangiRuanganL1: yup.boolean(),
    pewangiRuanganL2: yup.boolean(),
    pewangiRuanganL3: yup.boolean(),
    pewangiRuanganL4: yup.boolean(),
    pewangiRuanganL5: yup.boolean(),
    pewangiRuanganL6: yup.boolean(),
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
    cleaningAreaSangkarL1: yup.boolean(),
    cleaningAreaSangkarL2: yup.boolean(),
    cleaningAreaSangkarL3: yup.boolean(),
    cleaningAreaSangkarL4: yup.boolean(),
    cleaningAreaSangkarL5: yup.boolean(),
    cleaningAreaSangkarL6: yup.boolean(),
    oliRelSangkarLift: yup.boolean(),
    taliSelingLift: yup.boolean(),
    pengeremanLift: yup.boolean(),
    exhaustFanLift: yup.boolean(),
    mesinMotorLift: yup.boolean(),
    powerListrikLift: yup.boolean(),
  })
  .required();

const monitoringGondola = yup
  .object()
  .shape({
    sistemKerjaTaliBaja: yup.boolean(),
    panelKelistrikan: yup.boolean(),
    perangkatKerjaGondola: yup.boolean(),
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
