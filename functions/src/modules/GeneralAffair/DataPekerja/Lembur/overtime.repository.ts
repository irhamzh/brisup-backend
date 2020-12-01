import BaseRepository from '@repositories/baseRepository';

import { IOvertimeBase } from './interface/overtime.interface';

export default class OvertimeRepository extends BaseRepository<IOvertimeBase> {
  constructor() {
    super('ga_employees', 'employee');
  }
  async createOvertime(object: IOvertimeBase) {
    const data = await this.createWithSubdocument(
      object,
      'overtime',
      'ga_overtime'
    );
    return data;
  }
  async updateOvertime(id: string, object: Partial<IOvertimeBase>) {
    const data = await this.updateSubDocument(
      id,
      object,
      'overtime',
      'ga_overtime'
    );
    return data;
  }
}
