import BaseRepository from '@repositories/baseRepository';
import { IRuanganBase } from '@modules/MasterData/Ruangan/interface/ruangan.interface';

export default class RoleRepository extends BaseRepository<IRuanganBase> {
  constructor() {
    super('ruangans', 'ruangan');
  }
}
