import { IVehicleBase } from '@modules/MasterData/Vehicle/interface/vehicle.interface';

export interface IDriverAssignmentBase {
  tanggal: Date;
  vehicle: IVehicleBase;
  driverName: string;
  passengerName: string;
  destination: string;
  rate: number;
  createdAt?: Date;
  updatedAt?: Date;
}
