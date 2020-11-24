import BaseRepository from '@repositories/baseRepository';
import { IEvaluasiATKBase } from './interface/evaluasi_atk.interface';

export default class EvaluasiATKRepository extends BaseRepository<
  IEvaluasiATKBase
> {
  constructor() {
    super('pr-evaluasi_atks', 'evaluasi_atk');
  }
}
