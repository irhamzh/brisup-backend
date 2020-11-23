import { IFloorBase } from '@modules/Floor/interface/floor.interface';
import { IItemBase } from '@modules/Item/interface/item.interface';
import { IRuanganBase } from '@modules/Ruangan/interface/ruangan.interface';

export interface IPeralatanITBase {
  typePeralatanIT: string;
  floor: IFloorBase;
  ruangan: IRuanganBase;
  item: IItemBase;
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
