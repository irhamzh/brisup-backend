import BaseRepository from '@repositories/baseRepository';
import { IEvaluasiSuplierBase } from './interface/evaluasi.interface';

export default class EvaluasiSuplierRepository extends BaseRepository<
  IEvaluasiSuplierBase
> {
  constructor() {
    super('pr_pengadaan_evaluations', 'pr_pengadaan_evaluation');
  }
}
