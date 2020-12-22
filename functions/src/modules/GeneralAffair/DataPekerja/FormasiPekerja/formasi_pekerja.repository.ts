import BaseRepository from '@repositories/baseRepository';

import { IFormasiBase } from './interface/formasi_pekerja.interface';

export default class FormasiRepository extends BaseRepository<IFormasiBase> {
  constructor() {
    super('ga_employe_formations', 'ga_employe_formation');
  }
}
