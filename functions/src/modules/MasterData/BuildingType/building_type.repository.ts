import BaseRepository from '@repositories/baseRepository';
import { IBuildingTypeBase } from '@modules/MasterData/BuildingType/interface/building_type.interface';

export default class BuildingTypeRepository extends BaseRepository<
  IBuildingTypeBase
> {
  constructor() {
    super('building_types', 'building_type');
  }
}
