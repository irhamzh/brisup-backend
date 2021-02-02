import { IMedicineTypeBase } from '@modules/MasterData/MedicineType/interface/medicine_type.interface';
import { IAreaBase } from '@modules/MasterData/Area/interface/area.interface';

export interface IP3kBase {
  tanggal: Date;
  area: IAreaBase;
  medicineType: IMedicineTypeBase;
  jumlah: number;
  expired: Date;
  information: string;
  createdAt?: Date;
  updatedAt?: Date;
}
