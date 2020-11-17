import BaseRepository from '@repositories/baseRepository';
import {
  IPeralatanBase,
  IPeralatanPC,
  IPeralatanInfocus,
} from './interface/peralatan.interface';

export default class PeralatanITRepository extends BaseRepository<
  // IPeralatanBase
  IPeralatanPC | IPeralatanBase | IPeralatanInfocus
> {
  constructor() {
    super('peralatan_its', 'peralatan_it');
  }
}
