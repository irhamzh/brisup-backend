import BaseRepository from '@repositories/baseRepository';
import { IProviderBase } from '@modules/Provider/interface/provider.interface';

export default class RoleRepository extends BaseRepository<IProviderBase> {
  constructor() {
    super('providers', 'provider');
  }
}
