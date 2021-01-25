import BaseRepository from '@repositories/baseRepository';

import { ICompressorBase } from './interface/compressor.interface';

export default class CompressorRepository extends BaseRepository<
  ICompressorBase
> {
  constructor() {
    super('compressors', 'compressor', 'bri_corpu_compressors');
  }
}
