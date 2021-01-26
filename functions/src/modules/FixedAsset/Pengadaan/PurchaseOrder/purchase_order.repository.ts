import BaseRepository from '@repositories/baseRepository';
import { IPurchaseOrderBase } from '@modules/FixedAsset/Pengadaan/PurchaseOrder/interface/purchase_order.interface';

export default class PurchaseOrderRepository extends BaseRepository<
  IPurchaseOrderBase
> {
  constructor() {
    super(
      'fx_purchase_orders',
      'fx_purchase_order',
      'bri_corpu_fx_purchase_orders'
    );
  }
}
