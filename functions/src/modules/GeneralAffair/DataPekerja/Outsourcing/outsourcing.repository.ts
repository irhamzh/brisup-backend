import BaseRepository from '@repositories/baseRepository';

import { IOutsourcingBase } from './interface/outsourcing.interface';

export default class SistemManajemenKinerjaRepository extends BaseRepository<
  IOutsourcingBase
> {
  constructor() {
    super('ga_outsourcings', 'outsourcing');
  }
  async createOutsourcing(object: IOutsourcingBase) {
    const data = await this.createWithSubdocument(
      object,
      'outsourcing',
      'ga_outsourcings'
    );
    return data;
  }
  async updateOutsourcing(id: string, object: Partial<IOutsourcingBase>) {
    const data = await this.updateSubDocument(
      id,
      object,
      'outsourcing',
      'ga_outsourcings'
    );
    return data;
  }
}
