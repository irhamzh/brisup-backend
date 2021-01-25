import BaseRepository from '@repositories/baseRepository';

import { IUploadBase } from './interface/upload.interface';

export default class UploadRepository extends BaseRepository<IUploadBase> {
  constructor() {
    super('fa_uploads', 'fa_upload', 'bri_corpu_fa_uploads');
  }
}
