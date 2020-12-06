import { IHotelBase } from '@modules/MasterData/Hotel/interface/hotel.interface';
export interface IEvaluasiHotelBase {
  tanggal: Date;
  hotelName: IHotelBase;
  namaPendidikan: string;
  performance: number;
  remark: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Performace = [1, 2, 3, 4];
