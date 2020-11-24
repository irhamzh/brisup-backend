import { IWorkingOrderBase } from '@modules/FixedAsset/Pengadaan/WorkingOrder/interface/working_order.interface';

export interface IKlasifikasiHotelBase {
  tanggal: Date;
  workingOrder: IWorkingOrderBase;
  noSuratPesanan: string;
  kedudukanJabatan: string;
  hotelClasification: number;
  hotelName: string;
  facilities: IFacilities[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface IFacilities {
  name: string;
  price: number;
}

export const HotelClasification = [3, 4, 5];
