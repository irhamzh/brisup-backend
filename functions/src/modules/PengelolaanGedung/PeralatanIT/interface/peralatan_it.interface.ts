import { IItemBase } from '@modules/MasterData/Item/interface/item.interface';
import { IFloorBase } from '@modules/MasterData/Floor/interface/floor.interface';
import { IRuanganBase } from '@modules/MasterData/Ruangan/interface/ruangan.interface';

export interface IPeralatanITBase {
  typePeralatanIT: string;
  floor: IFloorBase;
  ruangan: IRuanganBase;
  information: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPeralatanITFisik extends IPeralatanITBase {
  hekonisme: string;
  itemFisik: IItemBase;
}
export interface IPeralatanIJaringan extends IPeralatanITBase {
  status: string;
  itemJaringan: string;
}

export enum Item {
  Antivirus = 'Antivirus',
  Jaringan = 'Jaringan',
}

export const AntivirusStatus = ['Updated', 'Not Updated'];
export const JaringanStatus = ['Connected', 'Disconnected'];
