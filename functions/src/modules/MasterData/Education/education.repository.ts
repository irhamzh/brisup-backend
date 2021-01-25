import BaseRepository from '@repositories/baseRepository';

import { IEducationBase } from './interface/education.interface';

export default class EducationRepository extends BaseRepository<
  IEducationBase
> {
  constructor() {
    super('educations', 'education', 'bri_corpu_educations');
  }
}
