import { IFloorBase } from '@modules/MasterData/Floor/interface/floor.interface';
import { IBuildingTypeBase } from '@modules/MasterData/BuildingType/interface/building_type.interface';

export interface IMechanicalElectricalBase {
  floor: IFloorBase;
  buildingType: IBuildingTypeBase;
  expiredTabung: Date;
  information: string;
  smokeDetector: string;
  thermostat: string;
  fireAlarm: string;
  ceillingSpeaker: string;
  cctv: string;
  acSystem: string;
  telephone: string;
  exhaust: string;
  headSprinkler: string;
  mccb: string;
  valves: string;
  segel: string;
  selang: string;
  hose: string;
  pintu: string;
  apar: string;
  pin: string;
  nozle: string;
  lampuIndikator: string;
  createdAt?: Date;
  updatedAt?: Date;
}
