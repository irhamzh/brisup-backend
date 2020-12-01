import { IVehicleBase } from '@modules/MasterData/Vehicle/interface/vehicle.interface';

export interface IDriverAssignmentBase {
  tanggal: Date;
  vehicle: IVehicleBase;
  kmAwal: number;
  kmAkhir: number;
  fuel?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
