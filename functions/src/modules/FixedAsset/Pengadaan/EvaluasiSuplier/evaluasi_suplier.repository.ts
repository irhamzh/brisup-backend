import BaseRepository from '@repositories/baseRepository';
import { IEvaluasiSuplierBase } from '@modules/FixedAsset/Pengadaan/EvaluasiSuplier/interface/evaluasi_suplier.interface';

export default class EvaluasiSuplierRepository extends BaseRepository<
  IEvaluasiSuplierBase
> {
  constructor() {
    super(
      'fx_evaluasi_supliers',
      'fx_evaluasi_suplier',
      'bri_corpu_fx_evaluasi_supliers'
    );
  }
}
