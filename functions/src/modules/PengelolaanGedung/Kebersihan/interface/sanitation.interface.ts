// import { IFloorBase } from '@modules/Floor/interface/floor.interface';
// import { IPumpBase } from '@modules/MasterData/Pump/interface/pump.interface';
// import { IBuildingBase } from '@modules/MasterData/Building/interface/building.interface';
// import { IPumpUnitBase } from '@modules/MasterData/PumpUnit/interface/pump_unit.interface';
// import { ICompressorBase } from '@modules/MasterData/Compressor/interface/compressor.interface';
// import { IWaterMeterBase } from '@modules/MasterData/WaterMater/interface/water_meter.interface';
import { ILocationBase } from '@modules/MasterData/Location/interface/location.interface';
import { IRuanganBase } from '@modules/Ruangan/interface/ruangan.interface';

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
  dinding?: string;
  pintu?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISaranaPendukungMushola extends ISaranaPendukungBase {
  ceiling?: string;
  carpetSholat?: string;
  sajadah?: string;
  jamDinding?: string;
  pajangan?: string;
}

export interface ISaranaPendukungPos extends ISaranaPendukungBase {
  plafond?: string;
  lantai?: string;
  jendela?: string;
  kursi?: string;
  meja?: string;
  lampu?: string;
}
