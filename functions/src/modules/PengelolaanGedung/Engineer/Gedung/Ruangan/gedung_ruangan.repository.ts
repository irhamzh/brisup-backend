import BaseRepository from '@repositories/baseRepository';
import { IGedungRuanganBase } from './interface/gedung_ruangan.interface';

export default class PgRoomRepository extends BaseRepository<
  IGedungRuanganBase
> {
  constructor() {
    super('pg_rooms', 'pg_room', 'bri_corpu_pg_rooms'); //rename
  }
}
