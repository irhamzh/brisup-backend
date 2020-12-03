import BaseRepository from '@repositories/baseRepository';
import { IPartnerBase } from '@modules/MasterData/Partner/interface/partner.interface';

export default class PartnerRepository extends BaseRepository<IPartnerBase> {
  constructor() {
    super('partners', 'partner');
  }
}
