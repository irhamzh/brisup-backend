import { IRuanganBase } from '@modules/Ruangan/interface/ruangan.interface';
import { IRoomTypeBase } from '@modules/RoomType/interface/room_type.interface';
import { IBuildingTypeBase } from '@modules/BuildingType/interface/building_type.interface';

export interface IGedungRuanganBase {
  roomType: IRoomTypeBase;
  buildingType: IBuildingTypeBase;
  ruangan: IRuanganBase;
  tanggal: Date;
  information: string;
  plafond: string;
  lantai: string;
  jendela: string;
  meja: string;
  kasur: string;
  toilet: string;
  dinding: string;
  pintu: string;
  kursi: string;
  lampu: string;
  lemari: string;
  peralatanLainnya: string;
  createdAt?: Date;
  updatedAt?: Date;
}
