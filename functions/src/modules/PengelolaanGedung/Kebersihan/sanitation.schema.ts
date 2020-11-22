import * as yup from 'yup';
import getAllEnumKey from '@utils/getAllEnumKeys';
import { BaseCondition1 } from '@interfaces/BaseInterface';
import validationWording from '@constants/validationWording';
import {
  TypeInnovationBuilding,
  TypeSaranaPendukung,
} from './interface/sanitation.interface';

const yardSanitation = yup
  .object()
  .shape({
    rumput: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('rumput', ...getAllEnumKey(BaseCondition1))
      ),
    pohon: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('pohon', ...getAllEnumKey(BaseCondition1))
      ),
    kolamIkan: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('kolamIkan', ...getAllEnumKey(BaseCondition1))
      ),
    airMancur: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('airMancur', ...getAllEnumKey(BaseCondition1))
      ),
    pavingBlock: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('pavingBlock', ...getAllEnumKey(BaseCondition1))
      ),
    sampahGulma: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('sampahGulma', ...getAllEnumKey(BaseCondition1))
      ),
    penyiraman: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('penyiraman', ...getAllEnumKey(BaseCondition1))
      ),
    pendangiran: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('pendangiran', ...getAllEnumKey(BaseCondition1))
      ),
    pemupukan: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('pemupukan', ...getAllEnumKey(BaseCondition1))
      ),
    pemangkasan: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('pemangkasan', ...getAllEnumKey(BaseCondition1))
      ),
    pengendalianHama: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf(
          'pengendalianHama',
          ...getAllEnumKey(BaseCondition1)
        )
      ),
    penyulamanTanaman: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf(
          'penyulamanTanaman',
          ...getAllEnumKey(BaseCondition1)
        )
      ),
    penambahanMediaTanam: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf(
          'penambahanMediaTanam',
          ...getAllEnumKey(BaseCondition1)
        )
      ),
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
    plafond: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('plafond', ...getAllEnumKey(BaseCondition1))
      ),
    dinding: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('dinding', ...getAllEnumKey(BaseCondition1))
      ),
    lantai: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('lantai', ...getAllEnumKey(BaseCondition1))
      ),
    pintu: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('pintu', ...getAllEnumKey(BaseCondition1))
      ),
    jendela: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('jendela', ...getAllEnumKey(BaseCondition1))
      ),
    kursi: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('kursi', ...getAllEnumKey(BaseCondition1))
      ),
    meja: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('meja', ...getAllEnumKey(BaseCondition1))
      ),
    lampu: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('lampu', ...getAllEnumKey(BaseCondition1))
      ),
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
    ceiling: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('ceiling', ...getAllEnumKey(BaseCondition1))
      ),
    carpetSholat: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf(
          'carpetSholat',
          ...getAllEnumKey(BaseCondition1)
        )
      ),
    sajadah: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('sajadah', ...getAllEnumKey(BaseCondition1))
      ),
    jamDinding: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('jamDinding', ...getAllEnumKey(BaseCondition1))
      ),
    pajangan: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('pajangan', ...getAllEnumKey(BaseCondition1))
      ),
  })
  .required();

const saranaPendukungSecurityPosSanitation = yup
  .object()
  .shape({
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
    kursi: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('kursi', ...getAllEnumKey(BaseCondition1))
      ),
    meja: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('meja', ...getAllEnumKey(BaseCondition1))
      ),
    lampu: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('lampu', ...getAllEnumKey(BaseCondition1))
      ),
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
    plafond: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('plafond', ...getAllEnumKey(BaseCondition1))
      ),
    dinding: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('dinding', ...getAllEnumKey(BaseCondition1))
      ),
    lantai: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('lantai', ...getAllEnumKey(BaseCondition1))
      ),
    pintu: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('pintu', ...getAllEnumKey(BaseCondition1))
      ),
    jendela: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('jendela', ...getAllEnumKey(BaseCondition1))
      ),
    kursi: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('kursi', ...getAllEnumKey(BaseCondition1))
      ),
    meja: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('meja', ...getAllEnumKey(BaseCondition1))
      ),
    lampu: yup
      .mixed<keyof typeof BaseCondition1>()
      .oneOf(
        getAllEnumKey(BaseCondition1),
        validationWording.oneOf('lampu', ...getAllEnumKey(BaseCondition1))
      ),
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
