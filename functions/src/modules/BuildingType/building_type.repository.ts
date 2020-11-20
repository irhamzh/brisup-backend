import BaseRepository from '@repositories/baseRepository';
import { IBuildingTypeBase } from '@modules/BuildingType/interface/building_type.interface';

export default class BuildingTypeRepository extends BaseRepository<
  IBuildingTypeBase
> {
  constructor() {
    super('bulding_types', 'bulding_type');
  }
}
