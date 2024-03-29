import * as yup from 'yup';
import getAllEnumKey from '@utils/getAllEnumKeys';
import { YesNo } from '@constants/BaseCondition';
import validationWording from '@constants/validationWording';

const createWaterMeter = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    waterMeter: yup.string().required(validationWording.required('waterMeter')),
    meterAwal: yup.string().required(validationWording.required('meterAwal')),
    meterAkhir: yup.string().required(validationWording.required('meterAkhir')),
    penggunaan: yup.string().required(validationWording.required('penggunaan')),
  })
  .required();

const updateWaterMeter = yup
  .object()
  .shape({
    tanggal: yup.date(),
    waterMeter: yup.string(),
    meterAwal: yup.string(),
    meterAkhir: yup.string(),
    penggunaan: yup.string(),
  })
  .required();

const createElectrify = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    meterAwal: yup.string().required(validationWording.required('meterAwal')),
    meterAkhir: yup.string().required(validationWording.required('meterAkhir')),
    penggunaan: yup.string().required(validationWording.required('penggunaan')),
  })
  .required();

const updateElectrify = yup
  .object()
  .shape({
    tanggal: yup.date(),
    meterAwal: yup.string(),
    meterAkhir: yup.string(),
    penggunaan: yup.string(),
  })
  .required();

const createAC = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    building: yup.string().required(validationWording.required('building')),
    compressor: yup.string().required(validationWording.required('compressor')),
    floor: yup.string().required(validationWording.required('floor')),
    ukuranAmpereR: yup
      .string()
      .required(validationWording.required('ukuranAmpereR')),
    ukuranAmpereS: yup
      .string()
      .required(validationWording.required('ukuranAmpereS')),
    ukuranAmpereT: yup
      .string()
      .required(validationWording.required('ukuranAmpereT')),
  })
  .required();

const updateAC = yup
  .object()
  .shape({
    tanggal: yup.date(),
    building: yup.string(),
    compressor: yup.string(),
    floor: yup.string(),
    ukuranAmpereR: yup.string(),
    ukuranAmpereS: yup.string(),
    ukuranAmpereT: yup.string(),
  })
  .required();

const plumbing = yup
  .object()
  .shape({
    valve: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('valve', ...getAllEnumKey(YesNo))
      ),
    bearing: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('bearing', ...getAllEnumKey(YesNo))
      ),
    oli: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('oli', ...getAllEnumKey(YesNo))
      ),
  })
  .required();
const baseCretaePlumbing = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    pump: yup.string().required(validationWording.required('pump')),
    unit: yup.string().required(validationWording.required('unit')),
    voltase: yup.string().required(validationWording.required('voltase')),
    information: yup
      .string()
      .required(validationWording.required('information')),
    kebocoran: yup.string().required(validationWording.required('kebocoran')),
  })
  .required();

const baseUpdatePlumbing = yup
  .object()
  .shape({
    tanggal: yup.date(),
    pump: yup.string(),
    unit: yup.string(),
    voltase: yup.string(),
    information: yup.string(),
    kebocoran: yup.string(),
  })
  .required();

const stp = yup
  .object()
  .shape({
    pompa: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('pompa', ...getAllEnumKey(YesNo))
      ),
    oli: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('oli', ...getAllEnumKey(YesNo))
      ),
    waterLevelControl: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('waterLevelControl', ...getAllEnumKey(YesNo))
      ),
    operasional: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('operasional', ...getAllEnumKey(YesNo))
      ),
  })
  .required();
const baseCretaeSTP = yup
  .object()
  .shape({
    yearMonth: yup.string().required(validationWording.required('tanggal')),
    information: yup
      .string()
      .required(validationWording.required('information')),
  })
  .required();

const baseUpdateSTP = yup
  .object()
  .shape({
    yearMonth: yup.string(),
    information: yup.string(),
  })
  .required();

const createPlumbing = plumbing.concat(baseCretaePlumbing);
const updatePlumbing = plumbing.concat(baseUpdatePlumbing);
const createSTP = stp.concat(baseCretaeSTP);
const updateSTP = stp.concat(baseUpdateSTP);

export default {
  createWaterMeter,
  updateWaterMeter,
  createElectrify,
  updateElectrify,
  createAC,
  updateAC,
  createPlumbing,
  updatePlumbing,
  createSTP,
  updateSTP,
};
