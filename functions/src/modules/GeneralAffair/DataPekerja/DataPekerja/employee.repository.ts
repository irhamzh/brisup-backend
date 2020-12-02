import BaseRepository from '@repositories/baseRepository';

import { IEmployeeBase } from './interface/employee.interface';

export default class EmployeeRepository extends BaseRepository<IEmployeeBase> {
  constructor() {
    super('ga_employees', 'employee');
  }
  async createEmployee(object: IEmployeeBase) {
    const data = await this.createWithSubdocument(
      object,
      'employee',
      'ga_employees'
    );
    return data;
  }
  async updateEmployee(id: string, object: Partial<IEmployeeBase>) {
    const data = await this.updateSubDocument(
      id,
      object,
      'employee',
      'ga_employees'
    );
    return data;
  }
}
