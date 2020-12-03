import BaseRepository from '@repositories/baseRepository';
import { IItemBase } from '@modules/MasterData/Item/interface/item.interface';

export default class ItemRepository extends BaseRepository<IItemBase> {
  constructor() {
    super('items', 'item');
  }
}
