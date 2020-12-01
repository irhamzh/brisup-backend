import { IVehicleBase } from '@modules/MasterData/Vehicle/interface/vehicle.interface';

export interface IServiceBase {
  tanggal: Date;
  vehicle: IVehicleBase;
  totalKm: number;
  biaya: number;
  createdAt?: Date;
  updatedAt?: Date;
}
