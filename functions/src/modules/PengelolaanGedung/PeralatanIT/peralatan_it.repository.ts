import BaseRepository from '@repositories/baseRepository';
import {
  IPeralatanITFisik,
  IPeralatanITBase,
} from './interface/peralatan_it.interface';

export default class PeralatanITRepository extends BaseRepository<
  IPeralatanITFisik | IPeralatanITBase
> {
  constructor() {
    super('pg-peralatan-it', 'pg-peralatan-it');
  }
}
