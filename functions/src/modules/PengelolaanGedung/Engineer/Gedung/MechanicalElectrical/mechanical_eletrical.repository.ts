import BaseRepository from '@repositories/baseRepository';
import { IMechanicalElectricalBase } from './interface/mechanical_eletrical.interface';

export default class MechanicalElectricalRepository extends BaseRepository<
  IMechanicalElectricalBase
> {
  constructor() {
    super('pg-mechanical-eletricals', 'pg-mechanical-eletrical');
  }
}
