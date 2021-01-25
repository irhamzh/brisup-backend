import BaseRepository from '@repositories/baseRepository';
import { IFloorBase } from '@modules/MasterData/Floor/interface/floor.interface';

export default class RoleRepository extends BaseRepository<IFloorBase> {
  constructor() {
    super('floors', 'floor', 'bri_corpu_floors');
  }
}
