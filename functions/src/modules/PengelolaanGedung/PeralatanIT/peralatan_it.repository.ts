import BaseRepository from '@repositories/baseRepository';
import {
  IPeralatanITFisik,
  IPeralatanITBase,
} from './interface/peralatan_it.interface';

export default class PeralatanITRepository extends BaseRepository<
  IPeralatanITFisik | IPeralatanITBase
> {
  constructor() {
    super('pg_peralatan_its', 'pg_peralatan_it', 'bri_corpu_pg_peralatan_its'); //rename
  }
}
