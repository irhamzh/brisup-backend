import BaseRepository from '@repositories/baseRepository';
import { IJenisPCBase } from './interface/jenis_pc.interface';

export default class RoleRepository extends BaseRepository<IJenisPCBase> {
  constructor() {
    super('jenis_pcs', 'jenis_pc');
  }
}
