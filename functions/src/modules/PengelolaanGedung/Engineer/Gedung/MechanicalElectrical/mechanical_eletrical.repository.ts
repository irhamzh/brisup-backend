import BaseRepository from '@repositories/baseRepository';
import { IMechanicalElectricalBase } from './interface/mechanical_eletrical.interface';

export default class MechanicalElectricalRepository extends BaseRepository<
  IMechanicalElectricalBase
> {
  constructor() {
    super(
      'pg_mechanical_eletricals',
      'pg_mechanical_eletrical',
      'bri_corpu_pg_mechanical_eletricals'
    ); //rename
  }
}
