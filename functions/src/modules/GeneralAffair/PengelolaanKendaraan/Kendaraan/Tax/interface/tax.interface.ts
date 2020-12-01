import { IVehicleBase } from '@modules/MasterData/Vehicle/interface/vehicle.interface';

export interface ITaxBase {
  tanggal: Date;
  vehicle: IVehicleBase;
  jatuhTempo: string;
  biaya: number;
  createdAt?: Date;
  updatedAt?: Date;
}
