import BaseRepository from '@repositories/baseRepository';

import { IEvaluasiKlinikBase } from './interface/evaluasi_klinik.interface';

export default class MonitoringCCTVRepository extends BaseRepository<
  IEvaluasiKlinikBase
> {
  constructor() {
    super(
      'ga_clinic_evaluations',
      'ga_clinic_evaluation',
      'bri_corpu_ga_clinic_evaluations'
    );
  }
}
