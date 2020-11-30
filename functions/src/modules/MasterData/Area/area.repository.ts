import BaseRepository from '@repositories/baseRepository';

import { IAreaBase } from './interface/area.interface';

export default class LocationRepository extends BaseRepository<IAreaBase> {
  constructor() {
    super('areas', 'area');
  }
}
