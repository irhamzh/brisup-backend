import BaseRepository from '@repositories/baseRepository';
import { IProviderBase } from '@modules/MasterData/Provider/interface/provider.interface';

export default class ProviderRepository extends BaseRepository<IProviderBase> {
  constructor() {
    super('providers', 'provider', 'bri_corpu_providers');
  }
}
