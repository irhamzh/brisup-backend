import BaseRepository from '@repositories/baseRepository';
import {
  IPeralatanTeknis,
  IEquipmentConsumable,
  IChemical,
  IMachinery,
} from './interface/peralatan_kerja.interface';

export default class WorkingToolRepository extends BaseRepository<
  IPeralatanTeknis | IEquipmentConsumable | IChemical | IMachinery
> {
  constructor() {
    super('pg_working_tools', 'pg_working_tool', 'bri_corpu_pg_working_tools'); //rename
  }
}
