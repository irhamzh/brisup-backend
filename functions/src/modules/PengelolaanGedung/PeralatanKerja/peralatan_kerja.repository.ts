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
    super('pg-working-tools', 'pg-working-tool'); //rename
  }
}
