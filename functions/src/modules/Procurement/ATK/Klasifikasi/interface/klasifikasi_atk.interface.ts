import { IWorkingOrderBase } from '@modules/FixedAsset/Pengadaan/WorkingOrder/interface/working_order.interface';
import { IVendorBase } from '@modules/MasterData/Vendor/interface/vendor.interface';

export interface IKlasifikasiATKBase {
  tanggal: Date;
  workingOrder: IWorkingOrderBase;
  vendor: IVendorBase;
  noSuratPesanan: string;
  kebutuhan: string;
  barang: IBarang[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface IBarang {
  name: string;
  price: number;
}
