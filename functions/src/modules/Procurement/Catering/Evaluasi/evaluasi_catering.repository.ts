import BaseRepository from '@repositories/baseRepository';
import { IEvaluasiCateringBase } from './interface/evaluasi_catering.interface';

export default class EvaluasiCateringRepository extends BaseRepository<
  IEvaluasiCateringBase
> {
  constructor() {
    super('pr-evaluasi_caterings', 'evaluasi_catering');
  }
}
