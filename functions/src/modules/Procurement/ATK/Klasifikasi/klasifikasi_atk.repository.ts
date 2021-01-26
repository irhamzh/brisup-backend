import BaseRepository from '@repositories/baseRepository';

import { IKlasifikasiATKBase } from './interface/klasifikasi_atk.interface';

export default class KlasifikasiATKRepository extends BaseRepository<
  IKlasifikasiATKBase
> {
  constructor() {
    super(
      'pr_klasifikasi_atks',
      'klasifikasi_atks',
      'bri_corpu_pr_klasifikasi_atks'
    );
  }
}
