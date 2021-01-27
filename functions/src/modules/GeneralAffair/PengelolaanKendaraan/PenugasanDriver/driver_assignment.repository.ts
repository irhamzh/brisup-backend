import BaseRepository from '@repositories/baseRepository';

import { IDriverAssignmentBase } from './interface/driver_assignment.interface';

export default class EngineerBasementRepository extends BaseRepository<
  IDriverAssignmentBase
> {
  constructor() {
    super(
      'ga_driver_assignment',
      'ga_driver_assignment',
      'bri_corpu_ga_driver_assignment'
    ); //rename
  }
}
