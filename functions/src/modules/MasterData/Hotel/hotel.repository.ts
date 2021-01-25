import BaseRepository from '@repositories/baseRepository';

import { IHotelBase } from './interface/hotel.interface';

export default class HotelRepository extends BaseRepository<IHotelBase> {
  constructor() {
    super('hotels', 'hotel', 'bri_corpu_hotels');
  }
}
