import BaseRepository from '@repositories/baseRepository';

import { ICateringBase } from './interface/catering.interface';

export default class CateringRepository extends BaseRepository<ICateringBase> {
  constructor() {
    super('caterings', 'catering');
  }
}
