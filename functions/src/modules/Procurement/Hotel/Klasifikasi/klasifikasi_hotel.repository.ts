import BaseRepository from '@repositories/baseRepository';

import { IKlasifikasiHotelBase } from './interface/klasifikasi_hotel.interface';

export default class KlasifikasiHotelRepository extends BaseRepository<
  IKlasifikasiHotelBase
> {
  constructor() {
    super(
      'pr_klasifikasi_hotels',
      'klasifikasi_hotel',
      'bri_corpu_pr_klasifikasi_hotels'
    );
  }
}
