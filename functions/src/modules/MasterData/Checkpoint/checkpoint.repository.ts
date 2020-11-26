import BaseRepository from '@repositories/baseRepository';

import { ICheckpointBase } from './interface/checkpoint.interface';

export default class CheckpointRepository extends BaseRepository<
  ICheckpointBase
> {
  constructor() {
    super('checkpoints', 'checkpoint');
  }
}
