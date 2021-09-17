import BaseRepository from '@repositories/baseRepository';
import {
  IPeralatanITFisik,
  IPeralatanIJaringan,
} from './interface/peralatan_it.interface';

export default class PeralatanITRepository extends BaseRepository<
  IPeralatanITFisik | IPeralatanIJaringan
> {
  constructor() {
    super('pg_peralatan_its', 'pg_peralatan_it', 'bri_corpu_pg_peralatan_its'); //rename
  }
}
