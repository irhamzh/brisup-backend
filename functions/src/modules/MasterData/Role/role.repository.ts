import BaseRepository from '@repositories/baseRepository';
import { IRoleBase } from '@modules/MasterData/Role/interface/role.interface';

export default class RoleRepository extends BaseRepository<IRoleBase> {
  constructor() {
    super('roles', 'role');
  }
}
