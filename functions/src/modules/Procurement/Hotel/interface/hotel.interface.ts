import { IHotelBase } from '@modules/MasterData/Hotel/interface/hotel.interface';
import { IWorkingOrderBase } from '@modules/WorkingOrder/interface/working_order.interface';

export interface IHotelProcurementBase {
  tanggal: Date;
  workingOrder: IWorkingOrderBase;
  noSuratPesanan: string;
  kedudukanJabatan: string;
  hotelClasification: number;
  hotel: IHotelBase;
  facilities: IFacilities[];
  performance?: number;
  remark?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IFacilities {
  nama: string; // digati karena masalah fe
  price: number;
  other?: string;
  jumlahPeserta: number;
}

export const ListFacilitas = [
  'Deluxe Single',
  'Deluxe Twin',
  'Residential Meeting Single',
  'Residential Meeting Twin',
  'Full Board Meeting',
  'Fullday Meeting',
  'Meeting Room',
  'Lain-lain',
];

export const HotelClasification = [3, 4, 5];
export const Performace = [1, 2, 3, 4];
