import BaseRepository from '@repositories/baseRepository';
import { IPurchaseOrderBase } from '@modules/FixedAsset/Pengadaan/PurchaseOrder/interface/purchase_order.interface';

export default class PurchaseOrderRepository extends BaseRepository<
  IPurchaseOrderBase
> {
  constructor() {
    super('fx_pengaadan_purchase_orders', 'fx_pengaadan_purchase_order');
  }
}
