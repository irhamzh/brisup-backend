import BaseRepository from '@repositories/baseRepository';

import { IUkerBase } from './interface/uker.interface';

export default class UkerRepository extends BaseRepository<IUkerBase> {
  constructor() {
    super('ukers', 'uker');
  }
}
