import * as yup from 'yup';
import getAllEnumKey from '@utils/getAllEnumKeys';
// import { BaseCondition1 } from '@constants/BaseCondition';
import validationWording from '@constants/validationWording';
import {
  TypeInnovationBuilding,
  TypeSaranaPendukung,
} from './interface/sanitation.interface';

const yardSanitation = yup
  .object()
  .shape({
    rumput: yup.boolean(),
    pohon: yup.boolean(),
    kolamIkan: yup.boolean(),
    airMancur: yup.boolean(),
    pavingBlock: yup.boolean(),
    sampahGulma: yup.boolean(),
    penyiraman: yup.boolean(),
    pendangiran: yup.boolean(),
    pemupukan: yup.boolean(),
    pemangkasan: yup.boolean(),
    pengendalianHama: yup.boolean(),
    penyulamanTanaman: yup.boolean(),
    penambahanMediaTanam: yup.boolean(),
  })
  .required();

const createYardSanitation = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    information: yup
      .string()
      .required(validationWording.required('information')),
  })
  .required()
  .concat(yardSanitation);

const updateYardSanitation = yup
  .object()
  .shape({
    tanggal: yup.date(),
    information: yup.string(),
  })
  .required()
  .concat(yardSanitation);

const smartBuildingSanitation = yup
  .object()
  .shape({
    plafond: yup.boolean(),
    dinding: yup.boolean(),
    lantai: yup.boolean(),
    pintu: yup.boolean(),
    jendela: yup.boolean(),
    kursi: yup.boolean(),
    meja: yup.boolean(),
    lampu: yup.boolean(),
  })
  .required();

const createSmartBuildingSanitation = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    information: yup
      .string()
      .required(validationWording.required('information')),
    ruangan: yup.string().required(validationWording.required('ruangan')),
    location: yup.string().required(validationWording.required('location')),
    bks: yup.string().required(validationWording.required('bks')),
    lh: yup.string().required(validationWording.required('lh')),
  })
  .required()
  .concat(smartBuildingSanitation);

const updateSmartBuildingSanitation = yup
  .object()
  .shape({
    tanggal: yup.date(),
    information: yup.string(),
    ruangan: yup.string(),
    location: yup.string(),
    bks: yup.string(),
    lh: yup.string(),
  })
  .required()
  .concat(smartBuildingSanitation);

const saranaPendukungMusholaSanitation = yup
  .object()
  .shape({
    dinding: yup.boolean(),
    pintu: yup.boolean(),
    ceiling: yup.boolean(),
    carpetSholat: yup.boolean(),
    sajadah: yup.boolean(),
    jamDinding: yup.boolean(),
    pajangan: yup.boolean(),
  })
  .required();

const saranaPendukungSecurityPosSanitation = yup
  .object()
  .shape({
    dinding: yup.boolean(),
    pintu: yup.boolean(),
    plafond: yup.boolean(),
    lantai: yup.boolean(),
    jendela: yup.boolean(),
    kursi: yup.boolean(),
    meja: yup.boolean(),
    lampu: yup.boolean(),
  })
  .required();

const createSaranaPendukung = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    information: yup
      .string()
      .required(validationWording.required('information')),
    location: yup.string().required(validationWording.required('location')),
    typeSaranaPendukung: yup
      .mixed<keyof typeof TypeSaranaPendukung>()
      .oneOf(
        getAllEnumKey(TypeSaranaPendukung),
        validationWording.oneOf(
          'plafond',
          ...getAllEnumKey(TypeSaranaPendukung)
        )
      )
      .required(validationWording.required('typeSaranaPendukung')),
  })
  .required();

const updateSaranaPendukung = yup
  .object()
  .shape({
    tanggal: yup.date(),
    information: yup.string(),
    location: yup.string(),
  })
  .required();

const createMusholaSanitation = createSaranaPendukung.concat(
  saranaPendukungMusholaSanitation
);
const updateMusholaSanitation = updateSaranaPendukung.concat(
  saranaPendukungMusholaSanitation
);

const createSecurityPosSanitation = createSaranaPendukung.concat(
  saranaPendukungSecurityPosSanitation
);
const updateSecurityPosSanitation = updateSaranaPendukung.concat(
  saranaPendukungSecurityPosSanitation
);

const baseCreateInnovationBuilding = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    information: yup
      .string()
      .required(validationWording.required('information')),
    typeInnovationBuilding: yup
      .mixed<keyof typeof TypeInnovationBuilding>()
      .oneOf(
        getAllEnumKey(TypeInnovationBuilding),
        validationWording.oneOf(
          'plafond',
          ...getAllEnumKey(TypeInnovationBuilding)
        )
      )
      .required(validationWording.required('typeInnovationBuilding')),
  })
  .required();

const baseUpdateInnovationBuilding = yup
  .object()
  .shape({
    tanggal: yup.date(),
    information: yup.string(),
    typeInnovationBuilding: yup
      .mixed<keyof typeof TypeInnovationBuilding>()
      .oneOf(
        getAllEnumKey(TypeInnovationBuilding),
        validationWording.oneOf(
          'plafond',
          ...getAllEnumKey(TypeInnovationBuilding)
        )
      ),
  })
  .required();

const createRuangan = yup
  .object()
  .shape({
    ruangan: yup.string().required(validationWording.required('ruangan')),
  })
  .required();

const updateRuangan = yup
  .object()
  .shape({
    ruangan: yup.string().required(validationWording.required('ruangan')),
  })
  .required();

const createLocation = yup
  .object()
  .shape({
    location: yup.string().required(validationWording.required('location')),
  })
  .required();

const updateLocation = yup
  .object()
  .shape({
    location: yup.string().required(validationWording.required('location')),
  })
  .required();

const baseRuangan = yup
  .object()
  .shape({
    plafond: yup.boolean(),
    dinding: yup.boolean(),
    lantai: yup.boolean(),
    pintu: yup.boolean(),
    jendela: yup.boolean(),
    kursi: yup.boolean(),
    meja: yup.boolean(),
    lampu: yup.boolean(),
  })
  .required();

const baseToilet = yup
  .object()
  .shape({
    wastafel: yup.boolean(),
    kloset: yup.boolean(),
    urinoir: yup.boolean(),
    kaca: yup.boolean(),
    lantai: yup.boolean(),
    dinding: yup.boolean(),
    tempatSampah: yup.boolean(),
    handDryer: yup.boolean(),
    handSoap: yup.boolean(),
    tissue: yup.boolean(),
    pengharum: yup.boolean(),
  })
  .required();

const baseSelasarLobby = yup
  .object()
  .shape({
    lantaiGranit: yup.boolean(),
    dindingGranit: yup.boolean(),
    boxHydrant: yup.boolean(),
    signage: yup.boolean(),
    stainlessSteel: yup.boolean(),
    dropOffArea: yup.boolean(),
    kacaFasad: yup.boolean(),
    frontDesk: yup.boolean(),
    mediaInformasi: yup.boolean(),
    atm: yup.boolean(),
    standingAshtray: yup.boolean(),
    kacaDalam: yup.boolean(),
    plafond: yup.boolean(),
    grillAC: yup.boolean(),
    kapLampu: yup.boolean(),
  })
  .required();

const baseTanggaSelasar = yup
  .object()
  .shape({
    pintu: yup.boolean(),
    handle: yup.boolean(),
    anakTangga: yup.boolean(),
    railingTangga: yup.boolean(),
    dinding: yup.boolean(),
    signage: yup.boolean(),
    ceiling: yup.boolean(),
    exhaustFan: yup.boolean(),
  })
  .required();

const createRuanganInnovationBuilding = baseCreateInnovationBuilding
  .concat(createRuangan)
  .concat(baseRuangan);

const UpdateRuanganInnovationBuilding = baseUpdateInnovationBuilding
  .concat(updateRuangan)
  .concat(baseRuangan);

const createToiletInnovationBuilding = baseCreateInnovationBuilding
  .concat(createLocation)
  .concat(baseToilet);

const UpdateToiletInnovationBuilding = baseUpdateInnovationBuilding
  .concat(updateLocation)
  .concat(baseToilet);

const createTanggaSelasarInnovationBuilding = baseCreateInnovationBuilding
  .concat(createLocation)
  .concat(baseTanggaSelasar);

const UpdateTanggaSelasarInnovationBuilding = baseUpdateInnovationBuilding
  .concat(updateLocation)
  .concat(baseTanggaSelasar);

const createSelasarLobbyInnovationBuilding = baseCreateInnovationBuilding
  .concat(createLocation)
  .concat(baseSelasarLobby);

const UpdateSelasarLobbyInnovationBuilding = baseUpdateInnovationBuilding
  .concat(updateLocation)
  .concat(baseSelasarLobby);

export default {
  createYardSanitation,
  updateYardSanitation,
  createSmartBuildingSanitation,
  updateSmartBuildingSanitation,
  createMusholaSanitation,
  updateMusholaSanitation,
  createSecurityPosSanitation,
  updateSecurityPosSanitation,
  createTanggaSelasarInnovationBuilding,
  UpdateTanggaSelasarInnovationBuilding,
  createRuanganInnovationBuilding,
  UpdateRuanganInnovationBuilding,
  createToiletInnovationBuilding,
  UpdateToiletInnovationBuilding,
  createSelasarLobbyInnovationBuilding,
  UpdateSelasarLobbyInnovationBuilding,
  baseCreateInnovationBuilding,
  createSaranaPendukung,
};
