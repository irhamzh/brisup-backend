import BaseRepository from '@repositories/baseRepository';

import { IHotelProcurementBase } from './interface/hotel.interface';

export default class ProcurementHotelRepository extends BaseRepository<
  IHotelProcurementBase
> {
  constructor() {
    super('pr_hotels', 'hotel', 'bri_corpu_pr_hotels');
  }
}
