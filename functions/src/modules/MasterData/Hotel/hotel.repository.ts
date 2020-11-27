import BaseRepository from '@repositories/baseRepository';

import { IHotelnBase } from './interface/hotel.interface';

export default class EducationRepository extends BaseRepository<IHotelnBase> {
  constructor() {
    super('hotels', 'hotel');
  }
}
