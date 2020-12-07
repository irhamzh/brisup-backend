import PengadaanRepository from '@repositories/pengadaanRepository';

import { IPurchaseOrderBase } from './interface/purchase_order.interface';

type CreateParam = Omit<IPurchaseOrderBase, 'provider' | 'pengadaan'>;

export default class PurchaseOrderRepository extends PengadaanRepository<
  CreateParam
> {
  constructor() {
    super('pr_pengadaan_purchase_orders', 'pr_pengadaan_purchase_order');
  }
}
