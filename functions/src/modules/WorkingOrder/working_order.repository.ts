import BaseRepository from '@repositories/baseRepository';
import { IWorkingOrderBase } from './interface/working_order.interface';

export default class WorkingOrderRepository extends BaseRepository<
  IWorkingOrderBase
> {
  constructor() {
    super('working_orders', 'working_order');
  }
}
