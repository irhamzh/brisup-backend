import { IVehicleBase } from '@modules/MasterData/Vehicle/interface/vehicle.interface';

export interface IKIRBase {
  tanggal: Date;
  vehicle: IVehicleBase;
  biaya: number;
  createdAt?: Date;
  updatedAt?: Date;
}
