import BaseRepository from '@repositories/baseRepository';
import { IPersediaanBase } from './interface/persediaan.interface';

export default class PersediaanRepository extends BaseRepository<
  IPersediaanBase
> {
  constructor() {
    super('persediaans', 'persediaan');
  }
}
