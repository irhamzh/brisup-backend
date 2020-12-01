import BaseRepository from '@repositories/baseRepository';

import { IPGPPJSBase } from './interface/pgppjs.interface';

export default class PGPPJSRepository extends BaseRepository<IPGPPJSBase> {
  constructor() {
    super('ga_employes', 'employe');
  }
  async createPGPPJS(object: IPGPPJSBase) {
    const data = await this.createWithSubdocument(
      object,
      'pgppjs',
      'ga_pgppjs'
    );
    return data;
  }
  async updatePGPPJS(id: string, object: Partial<IPGPPJSBase>) {
    const data = await this.updateSubDocument(
      id,
      object,
      'pgppjs',
      'ga_pgppjs'
    );
    return data;
  }
}
