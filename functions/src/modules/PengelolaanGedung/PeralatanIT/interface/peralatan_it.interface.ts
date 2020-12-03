import { IFloorBase } from '@modules/MasterData/Floor/interface/floor.interface';
// import { IItemBase } from '@modules/Item/interface/item.interface';
import { IRuanganBase } from '@modules/MasterData/Ruangan/interface/ruangan.interface';

export interface IPeralatanITBase {
  typePeralatanIT: string;
  floor: IFloorBase;
  ruangan: IRuanganBase;
  item: string;
  information: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPeralatanITFisik extends IPeralatanITBase {
  hekonisme: string;
}
export interface IPeralatanIJaringan extends IPeralatanITBase {
  status: string;
}

export enum Item {
  Antivirus = 'Antivirus',
  Jaringan = 'Jaringan',
}

export const AntivirusStatus = ['Updated', 'Not Updated'];
export const JaringanStatus = ['Connected', 'Disconnected'];
