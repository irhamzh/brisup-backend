import BaseRepository from '@repositories/baseRepository';

import { IAttendanceBase } from './interface/attendance.interface';

export default class AttendanceRepository extends BaseRepository<
  IAttendanceBase
> {
  constructor() {
    super('ga_employees', 'employee');
  }
  async createAttendance(object: IAttendanceBase) {
    const data = await this.createWithSubdocument(
      object,
      'attendance',
      'ga_attendances'
    );
    return data;
  }
  async updateAttendance(id: string, object: Partial<IAttendanceBase>) {
    const data = await this.updateSubDocument(
      id,
      object,
      'attendance',
      'ga_attendances'
    );
    return data;
  }
}
