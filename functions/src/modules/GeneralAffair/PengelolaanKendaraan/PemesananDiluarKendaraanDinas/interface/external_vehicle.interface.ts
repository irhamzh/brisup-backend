interface IExternalVehicleBase {
  tanggal: Date;
  biaya: number;
  type: string;
  prosesPembayaran: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReimburseExternalVehicle extends IExternalVehicleBase {
  buktiReimburse: boolean;
  membuatRegister: boolean;
}

export interface IOrderExternalVehicle extends IExternalVehicleBase {
  suratPemesanan: boolean;
  dokumenPembayaran: boolean;
}

export enum TypeExternalVehicle {
  'Pemesanan Kendaraan' = 'Pemesanan Kendaraan',
  'Reimburse Kendaraan' = 'Reimburse Kendaraan',
}
