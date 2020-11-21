import { IPumpBase } from '@modules/MasterData/Pump/interface/pump.interface';

export interface IPumpUnitBase {
  nameUnit: string;
  pump: IPumpBase;
  createdAt?: Date;
  updatedAt?: Date;
}
