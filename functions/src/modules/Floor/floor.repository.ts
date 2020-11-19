import BaseRepository from '@repositories/baseRepository';
import { IFloorBase } from '@modules/Floor/interface/floor.interface';

export default class RoleRepository extends BaseRepository<IFloorBase> {
  constructor() {
    super('floors', 'floor');
  }
}
