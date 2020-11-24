import BaseRepository from '@repositories/baseRepository';
import { IEvaluasiHotelBase } from './interface/evaluasi_hotel.interface';

export default class EvaluasiHotelRepository extends BaseRepository<
  IEvaluasiHotelBase
> {
  constructor() {
    super('pr-evaluasi_hotels', 'evaluasi_hotel');
  }
}
