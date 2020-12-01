import BaseRepository from '@repositories/baseRepository';

import { IUniversitas, ISMK } from './interface/internship.interface';

export default class InternshipRepository extends BaseRepository<
  IUniversitas | ISMK
> {
  constructor() {
    super('ga_employees', 'employee');
  }
  async createInternship(object: IUniversitas | ISMK) {
    const data = await this.createWithSubdocument(
      object,
      'intership',
      'ga_intership'
    );
    return data;
  }
  async updateInternship(id: string, object: Partial<IUniversitas | ISMK>) {
    const data = await this.updateSubDocument(
      id,
      object,
      'intership',
      'ga_intership'
    );
    return data;
  }
}
