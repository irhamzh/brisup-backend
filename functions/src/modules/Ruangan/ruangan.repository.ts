import BaseRepository from '@repositories/baseRepository';
import { IRuanganBase } from '@modules/Ruangan/interface/ruangan.interface';

export default class RoleRepository extends BaseRepository<IRuanganBase> {
  constructor() {
    super('ruangans', 'ruangan');
  }
}
