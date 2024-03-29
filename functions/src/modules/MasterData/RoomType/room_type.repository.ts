import BaseRepository from '@repositories/baseRepository';
import { IRoomTypeBase } from './interface/room_type.interface';

export default class RoomTypeRepository extends BaseRepository<IRoomTypeBase> {
  constructor() {
    super('room_types', 'room_type', 'bri_corpu_room_types');
  }
}
