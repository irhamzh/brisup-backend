import BaseRepository from '@repositories/baseRepository';

import { IBuildingBase } from './interface/building.interface';

export default class BuildingRepository extends BaseRepository<IBuildingBase> {
  constructor() {
    super('buildings', 'building', 'bri_corpu_buildings');
  }
}
