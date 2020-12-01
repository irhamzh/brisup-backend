import { IVehicleBase } from '@modules/MasterData/Vehicle/interface/vehicle.interface';

export interface ITaxBase {
  tanggal: Date;
  vehicle: IVehicleBase;
  jatuhTempo: string;
  biayaPajak: number;
  createdAt?: Date;
  updatedAt?: Date;
}
