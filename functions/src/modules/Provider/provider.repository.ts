import BaseRepository from '@repositories/baseRepository';
import { IProviderBase } from '@modules/Provider/interface/provider.interface';

export default class ProviderRepository extends BaseRepository<IProviderBase> {
  constructor() {
    super('providers', 'provider');
  }
}
