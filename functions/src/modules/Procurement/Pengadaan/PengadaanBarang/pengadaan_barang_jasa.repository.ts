import BaseRepository from '@repositories/baseRepository';
import EvaluasiSuplierRepository from '@modules/Procurement/Pengadaan/Evaluasi/evaluasi.repository';
// // import PurchaseOrderRepository from '@modules/Procurement/Pengadaan/PurchaseOrder/purchase_order.repository';
// import TandaTerimaBarangRepository from '@modules/Procurement/Pengadaan/TandaTerimaBarang/tanda_terima_barang.repository';
import { db } from '@utils/admin';

import {
  IPembelianLangsung,
  IBeautyContest,
  IPenunjukanLangsung,
} from './interface/pengadaan_barang_jasa.interface';

export default class PengadaanRepository extends BaseRepository<
  IPenunjukanLangsung | IBeautyContest | IPembelianLangsung
> {
  constructor() {
    super('pr_pengadaan_jasa_barangs', 'pr_pengadaan_jasa_barang');
  }

  async getPengadaanFull(
    page: number | string = 1,
    limit: number | string = 10,
    filtered: string,
    sorted: string
  ) {
    let data = await this.findAll(
      page as string,
      limit as string,
      filtered as string,
      sorted as string
    );
    const totalCount = await this.countDocument(filtered as string);
    // const purchaseOrderRepository = new PurchaseOrderRepository();
    const evaluasiSuplierRepository = new EvaluasiSuplierRepository();
    for (let i = 0; i < data.length; i++) {
      const tandaTerima =
        (await this.findOne(
          '',
          db
            .collection('pr_pengadaan_tanda_terima_barangs')
            .where('pengadaan.id', '==', data[i].id)
        )) || {};
      const purchaseOrder =
        (await this.findOne(
          '',
          db
            .collection('pr_pengadaan_purchase_orders')
            .where('pengadaan.id', '==', data[i].id)
        )) || {};
      // const purchaseOrder =
      //   (await purchaseOrderRepository.findOne(
      //     JSON.stringify([{ id: 'pengadaan.id', value: data[i].id }])
      //   )) || {};
      const evaluasi =
        (await evaluasiSuplierRepository.findOne(
          JSON.stringify([{ id: 'pengadaan.id', value: data[i].id }])
        )) || {};

      data[i] = { ...data[i], evaluasi, tandaTerima, purchaseOrder };
    }
    return { data, totalCount };
  }
}
