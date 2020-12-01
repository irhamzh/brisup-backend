import { IVehicleBase } from '@modules/MasterData/Vehicle/interface/vehicle.interface';

export interface IAccesoriesBase {
  tanggal: Date;
  vehicle: IVehicleBase;
  tisuBasah: boolean;
  tisuKering: boolean;
  airMinum: boolean;
  pengharum: boolean;
  permen: boolean;
  handSanitizer: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
