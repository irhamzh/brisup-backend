import BaseRepository from '@repositories/baseRepository';

import { IDriverAssignmentBase } from './interface/fuel.interface';

export default class EngineerBasementRepository extends BaseRepository<
  IDriverAssignmentBase
> {
  constructor() {
    super('ga_fuel', 'ga_fuel'); //rename
  }
}
