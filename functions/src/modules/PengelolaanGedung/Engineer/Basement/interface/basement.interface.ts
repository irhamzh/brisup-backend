import { IFloorBase } from '@modules/Floor/interface/floor.interface';
import { IPumpBase } from '@modules/MasterData/Pump/interface/pump.interface';
import { IBuildingBase } from '@modules/MasterData/Building/interface/building.interface';
import { IPumpUnitBase } from '@modules/MasterData/PumpUnit/interface/pump_unit.interface';
import { ICompressorBase } from '@modules/MasterData/Compressor/interface/compressor.interface';
import { IWaterMeterBase } from '@modules/MasterData/WaterMater/interface/water_meter.interface';

export interface IBasementBase {
  name: string;
}

export interface IEngineerBasementWater {
  tanggal: Date;
  waterMeter: IWaterMeterBase;
  meterAwal: string;
  meterAkhir: string;
  penggunaan: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEngineerBasementElectrify {
  tanggal: Date;
  meterAwal: string;
  meterAkhir: string;
  penggunaan: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEngineerBasementAC {
  tanggal: Date;
  building: IBuildingBase;
  compressor: ICompressorBase;
  floor: IFloorBase;
  ukuranAmpereR: string;
  ukuranAmpereS: string;
  ukuranAmpereT: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEngineerBasementPlumbing {
  tanggal: Date;
  pump: IPumpBase;
  unit: IPumpUnitBase;
  voltase: string;
  valve: string;
  bearing: string;
  oli: string;
  kebocoran: string;
  information: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEngineerBasementSTP {
  yearMonth: string;
  pompa: string;
  oli: string;
  waterLevelControl: string;
  operasional: string;
  information: string;
  createdAt?: Date;
  updatedAt?: Date;
}
