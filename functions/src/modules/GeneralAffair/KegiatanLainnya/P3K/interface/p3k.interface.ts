import { IMedicineTypeBase } from '@modules/MasterData/MedicineType/interface/medicine_type.interface';
// import { IAreaBase } from '@modules/MasterData/Area/interface/area.interface';

export interface IP3kBase {
  tanggal: Date;
  area: string;
  medicineType: IMedicineTypeBase;
  jumlah: number;
  expired: Date;
  information: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Lantai = [
  'Lantai 1',
  'Lantai 2',
  'Lantai 3',
  'Lantai 4',
  'Lantai 5',
  'Lantai 6',
];
