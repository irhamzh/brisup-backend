import { IVehicleBase } from '@modules/MasterData/Vehicle/interface/vehicle.interface';

export interface IDriverAssignmentBase {
  tanggal: Date;
  vehicle: IVehicleBase;
  driverName: string;
  passengerName: string;
  destination: string;
  rate: string;
  createdAt?: Date;
  updatedAt?: Date;
}
