import * as yup from 'yup';
import getAllEnumKey from '@utils/getAllEnumKeys';
import { YesNo } from '@constants/BaseCondition';
import validationWording from '@constants/validationWording';
import { TypePeralatanKerja } from './interface/peralatan_kerja.interface';

const baseCreate = yup
  .object()
  .shape({
    typePeralatanKerja: yup
      .mixed<keyof typeof TypePeralatanKerja>()
      .oneOf(
        getAllEnumKey(TypePeralatanKerja),
        validationWording.oneOf(
          'type Peralatan Kerja',
          ...getAllEnumKey(TypePeralatanKerja)
        )
      )
      .required(validationWording.required('typePeralatanKerja')),
    tanggal: yup.date().required(validationWording.required('tanggal')),
  })
  .required();

const pekerjaanCreate = yup
  .object()
  .shape({
    pekerjaan: yup.string().required(validationWording.required('pekerjaan')),
  })
  .required();

const pekerjaanUpdate = yup
  .object()
  .shape({
    pekerjaan: yup.string(),
  })
  .required();

const informationCreate = yup
  .object()
  .shape({
    information: yup
      .string()
      .required(validationWording.required('information')),
  })
  .required();

const informationUpdate = yup
  .object()
  .shape({
    information: yup.string(),
  })
  .required();

const peralatanTekis = yup
  .object()
  .shape({
    pelindungKepala: yup.boolean(),
    pelindungMata: yup.boolean(),
    pelindungPernafasan: yup.boolean(),
    pelindungBadan: yup.boolean(),
    pelindungKaki: yup.boolean(),
  })
  .required();

const peralatanMachinery = yup
  .object()
  .shape({
    lowSpeedPolisherMachine: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf(
          'lowSpeedPolisherMachine',
          ...getAllEnumKey(YesNo)
        )
      ),
    wetDryVacuumCleaner: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('wetDryVacuumCleaner', ...getAllEnumKey(YesNo))
      ),
    jetSprayer: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('jetSprayer', ...getAllEnumKey(YesNo))
      ),
    blower: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('blower', ...getAllEnumKey(YesNo))
      ),
    signed: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('signed', ...getAllEnumKey(YesNo))
      ),
  })
  .required();

const peralatanEquipmentConsumable = yup
  .object()
  .shape({
    doubleBucket: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('doubleBucket', ...getAllEnumKey(YesNo))
      ),
    singleBucket: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('singleBucket', ...getAllEnumKey(YesNo))
      ),
    lobbyDusterStick: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('lobbyDusterStick', ...getAllEnumKey(YesNo))
      ),
    mopSet: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('mopSet', ...getAllEnumKey(YesNo))
      ),
    windowSqueeze: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('windowSqueeze', ...getAllEnumKey(YesNo))
      ),
    windowWasher: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('windowWasher', ...getAllEnumKey(YesNo))
      ),
    teleskopicPool: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('teleskopicPool', ...getAllEnumKey(YesNo))
      ),
    floorSqueeze: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('floorSqueeze', ...getAllEnumKey(YesNo))
      ),
    ember: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('ember', ...getAllEnumKey(YesNo))
      ),
    gayung: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('gayung', ...getAllEnumKey(YesNo))
      ),
    tanggaAlumunium: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('tanggaAlumunium', ...getAllEnumKey(YesNo))
      ),
  })
  .required();

const peralatanChemical = yup
  .object()
  .shape({
    floorKlin: yup.boolean(),
    glassCleaner: yup.boolean(),
    allPurposeCleaner: yup.boolean(),
    metalPolish: yup.boolean(),
    handSoap: yup.boolean(),
    furniturePolish: yup.boolean(),
    vim: yup.boolean(),
    bubukDetergen: yup.boolean(),
    thiner: yup.boolean(),
    bayFresh: yup.boolean(),
    fresPhone: yup.boolean(),
    marblePowder: yup.boolean(),
    karbolWangi: yup.boolean(),
  })
  .required();

const createPeralatanTeknis = baseCreate
  .concat(peralatanTekis)
  .concat(pekerjaanCreate);
const updatePeralatanTeknis = baseCreate
  .concat(peralatanTekis)
  .concat(pekerjaanUpdate);

const createMachinery = baseCreate
  .concat(peralatanMachinery)
  .concat(informationCreate);
const updateMachinery = baseCreate
  .concat(peralatanMachinery)
  .concat(informationUpdate);

const createEquipmentConsumable = baseCreate
  .concat(peralatanEquipmentConsumable)
  .concat(informationCreate);
const updateEquipmentConsumable = baseCreate
  .concat(peralatanTekis)
  .concat(informationUpdate);

const createChemical = baseCreate
  .concat(peralatanChemical)
  .concat(informationCreate);
const updateChemical = baseCreate
  .concat(peralatanChemical)
  .concat(informationUpdate);

export default {
  createPeralatanTeknis,
  updatePeralatanTeknis,
  createMachinery,
  updateMachinery,
  createEquipmentConsumable,
  updateEquipmentConsumable,
  createChemical,
  updateChemical,
  baseCreate,
};
