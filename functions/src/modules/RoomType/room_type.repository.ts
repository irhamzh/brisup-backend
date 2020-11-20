import BaseRepository from '@repositories/baseRepository';
import { IRoomTypeBase } from '@modules/RoomType/interface/room_type.interface';

export default class RoomTypeRepository extends BaseRepository<IRoomTypeBase> {
  constructor() {
    super('room_types', 'room_type');
  }
}
