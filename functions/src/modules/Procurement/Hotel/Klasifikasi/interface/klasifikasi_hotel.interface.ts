import { IWorkingOrderBase } from '@modules/WorkingOrder/interface/working_order.interface';
import { IHotelBase } from '@modules/MasterData/Hotel/interface/hotel.interface';

export interface IKlasifikasiHotelBase {
  tanggal: Date;
  workingOrder: IWorkingOrderBase;
  noSuratPesanan: string;
  kedudukanJabatan: string;
  hotelClasification: number;
  hotelName: IHotelBase;
  facilities: IFacilities[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface IFacilities {
  nama: string; // digati karena masalah fe
  price: number;
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
