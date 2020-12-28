import BaseRepository from '@repositories/baseRepository';

import { ISistemManajemenKinerjaBase } from './interface/sistem_manajemen_kinerja.interface';

export default class SistemManajemenKinerjaRepository extends BaseRepository<
  ISistemManajemenKinerjaBase
> {
  constructor() {
    super('ga_performance_managements', 'performance_management');
  }
  async createPerformance(object: ISistemManajemenKinerjaBase) {
    const data = await this.createWithSubdocument(
      object,
      'performance_management',
      'ga_performance_managements'
    );
    return data;
  }
  async updatePerformance(
    id: string,
    object: Partial<ISistemManajemenKinerjaBase>
  ) {
    const data = await this.updateSubDocument(
      id,
      object,
      'performance_management',
      'ga_performance_managements'
    );
    return data;
  }
}
