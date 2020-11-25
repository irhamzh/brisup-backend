import BaseRepository from '@repositories/baseRepository';
import { IPurchaseOrderBase } from './interface/purchase_order.interface';

export default class PurchaseOrderRepository extends BaseRepository<
  IPurchaseOrderBase
> {
  constructor() {
    super('pr_pengadaan__purchase_orders', 'pr_pengadaan__purchase_order');
  }
}
