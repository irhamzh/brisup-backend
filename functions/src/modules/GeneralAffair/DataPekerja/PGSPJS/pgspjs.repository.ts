import BaseRepository from '@repositories/baseRepository';

import { IPGSPJSBase } from './interface/pgspjs.interface';

export default class PGSPJSRepository extends BaseRepository<IPGSPJSBase> {
  constructor() {
    super('ga_employees', 'employee');
  }
  async createPGSPJS(object: IPGSPJSBase) {
    const data = await this.createWithSubdocument(
      object,
      'pgspjs',
      'ga_pgspjs'
    );
    return data;
  }
  async updatePGSPJS(id: string, object: Partial<IPGSPJSBase>) {
    const data = await this.updateSubDocument(
      id,
      object,
      'pgspjs',
      'ga_pgspjs'
    );
    return data;
  }
}
