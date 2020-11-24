import BaseRepository from '@repositories/baseRepository';

import { IKlasifikasiATKBase } from './interface/klasifikasi_atk.interface';

export default class KlasifikasiCateringRepository extends BaseRepository<
  IKlasifikasiATKBase
> {
  constructor() {
    super('pr_klasifikasi_atks', 'klasifikasi_atks');
  }
}
