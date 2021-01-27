import BaseRepository from '@repositories/baseRepository';
import { IEvaluasiHotelBase } from './interface/evaluasi_hotel.interface';

export default class EvaluasiHotelRepository extends BaseRepository<
  IEvaluasiHotelBase
> {
  constructor() {
    super(
      'pr_evaluasi_hotels',
      'evaluasi_hotel',
      'bri_corpu_pr_evaluasi_hotels'
    );
  }
}
