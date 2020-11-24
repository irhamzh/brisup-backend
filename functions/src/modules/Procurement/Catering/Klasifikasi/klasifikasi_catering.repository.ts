import BaseRepository from '@repositories/baseRepository';

import { IKlasifikasiCateringBase } from './interface/klasifikasi_catering.interface';

export default class KlasifikasiCateringRepository extends BaseRepository<
  IKlasifikasiCateringBase
> {
  constructor() {
    super('pr-caterings', 'catering');
  }
}
