import BaseRepository from '@repositories/baseRepository';
import { IEvaluasiSuplierBase } from '@modules/FixedAsset/Pengadaan/EvaluasiSuplier/interface/evaluasi_suplier.interface';

export default class EvaluasiSuplierRepository extends BaseRepository<
  IEvaluasiSuplierBase
> {
  constructor() {
    super('pengaadan_evaluasi_supliers', 'pengaadan_evaluasi_suplier');
  }
}
