import PengadaanRepository from '@repositories/pengadaanRepository';

import { IEvaluasiSuplierBase } from './interface/evaluasi.interface';

type CreateParam = Omit<IEvaluasiSuplierBase, 'provider' | 'pengadaan'>;
export default class EvaluasiSuplierRepository extends PengadaanRepository<
  CreateParam
> {
  constructor() {
    super('pr_pengadaan_evaluations', 'pr_pengadaan_evaluation');
  }
}
