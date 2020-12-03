// import { IFloorBase } from '@modules/Floor/interface/floor.interface';
// import { IPumpBase } from '@modules/MasterData/Pump/interface/pump.interface';
// import { IBuildingBase } from '@modules/MasterData/Building/interface/building.interface';
// import { IPumpUnitBase } from '@modules/MasterData/PumpUnit/interface/pump_unit.interface';
// import { ICompressorBase } from '@modules/MasterData/Compressor/interface/compressor.interface';
// import { IWaterMeterBase } from '@modules/MasterData/WaterMater/interface/water_meter.interface';
import { ILocationBase } from '@modules/MasterData/Location/interface/location.interface';
import { IRuanganBase } from '@modules/MasterData/Ruangan/interface/ruangan.interface';

export interface ISanitationBase {
  name: string;
}

export interface ISanitationYard {
  tanggal: Date;
  rumput?: boolean;
  pohon?: boolean;
  kolamIkan?: boolean;
  airMancur?: boolean;
  pavingBlock?: boolean;
  sampahGulma?: boolean;
  penyiraman?: boolean;
  pendangiran?: boolean;
  pemupukan?: boolean;
  pemangkasan?: boolean;
  pengendalianHama?: boolean;
  penyulamanTanaman?: boolean;
  penambahanMediaTanam?: boolean;
  information: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISanitationSmartBuilding {
  tanggal: Date;
  ruangan: IRuanganBase;
  location: ILocationBase;
  bks: string;
  lh: string;
  information: string;
  plafond?: boolean;
  dinding?: boolean;
  lantai?: boolean;
  pintu?: boolean;
  jendela?: boolean;
  kursi?: boolean;
  meja?: boolean;
  lampu?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISanitationSmartBuilding {
  tanggal: Date;
  ruangan: IRuanganBase;
  location: ILocationBase;
  bks: string;
  lh: string;
  information: string;
  plafond?: boolean;
  dinding?: boolean;
  lantai?: boolean;
  pintu?: boolean;
  jendela?: boolean;
  kursi?: boolean;
  meja?: boolean;
  lampu?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ISaranaPendukungBase {
  tanggal: Date;
  information: string;
  location: ILocationBase;
  dinding?: boolean;
  pintu?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  typeSaranaPendukung: string;
}

export interface ISaranaPendukungMushola extends ISaranaPendukungBase {
  ceiling?: boolean;
  carpetSholat?: boolean;
  sajadah?: boolean;
  jamDinding?: boolean;
  pajangan?: boolean;
}

export interface ISaranaPendukungPos extends ISaranaPendukungBase {
  plafond?: boolean;
  lantai?: boolean;
  jendela?: boolean;
  kursi?: boolean;
  meja?: boolean;
  lampu?: boolean;
}

export enum TypeInnovationBuilding {
  'Ruang Pendidikan' = 'Ruang Pendidikan',
  'Ruang Kerja' = 'Ruang Kerja',
  'Toilet' = 'Toilet',
  'Tangga Darurat' = 'Tangga Darurat',
  'Selasar Dan Lobby' = 'Selasar Dan Lobby',
  'Ruang Lain' = 'Ruang Lain',
}

export enum TypeSaranaPendukung {
  'Pos security' = 'Pos security',
  'Musholla' = 'Musholla',
}

interface IInovationBuildingBase {
  tanggal: Date;
  information: string;
  typeInnovationBuilding: string;
}

export interface IRuang extends IInovationBuildingBase {
  ruangan: IRuanganBase;
  plafond?: boolean;
  dinding?: boolean;
  lantai?: boolean;
  pintu?: boolean;
  jendela?: boolean;
  kursi?: boolean;
  meja?: boolean;
  lampu?: boolean;
}

export interface IToilet extends IInovationBuildingBase {
  location: ILocationBase;
  wastafel?: boolean;
  kloset?: boolean;
  urinoir?: boolean;
  kaca?: boolean;
  lantai?: boolean;
  dinding?: boolean;
  tempatSampah?: boolean;
  handDryer?: boolean;
  handSoap?: boolean;
  tissue?: boolean;
  pengharum?: boolean;
}

export interface ITanggaSelasar extends IInovationBuildingBase {
  location: ILocationBase;
  pintu?: boolean;
  handle?: boolean;
  anakTangga?: boolean;
  railingTangga?: boolean;
  dinding?: boolean;
  signage?: boolean;
  ceiling?: boolean;
  exhaustFan?: boolean;
}

export interface ISelasarLobby extends IInovationBuildingBase {
  location: ILocationBase;
  lantaiGranit?: boolean;
  dindingGranit?: boolean;
  boxHydrant?: boolean;
  signage?: boolean;
  stainlessSteel?: boolean;
  dropOffArea?: boolean;
  kacaFasad?: boolean;
  frontDesk?: boolean;
  mediaInformasi?: boolean;
  atm?: boolean;
  standingAshtray?: boolean;
  kacaDalam?: boolean;
  plafond?: boolean;
  grillAC?: boolean;
  kapLampu?: boolean;
}
