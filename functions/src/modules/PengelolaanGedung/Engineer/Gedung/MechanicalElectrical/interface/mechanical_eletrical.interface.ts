import { IFloorBase } from '@modules/Floor/interface/floor.interface';
import { IBuildingTypeBase } from '@modules/BuildingType/interface/building_type.interface';

export interface IMechanicalElectricalBase {
  floor: IFloorBase;
  buldingType: IBuildingTypeBase;
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
  hedSprinkler: string;
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
