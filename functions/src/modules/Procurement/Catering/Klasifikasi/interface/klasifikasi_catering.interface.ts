import { IWorkingOrderBase } from '@modules/FixedAsset/Pengadaan/WorkingOrder/interface/working_order.interface';
import { ICateringBase } from '@modules/MasterData/Catering/interface/catering.interface';

export interface IKlasifikasiCateringBase {
  tanggal: Date;
  workingOrder: IWorkingOrderBase;
  catering: ICateringBase;
  noSuratPesanan: string;
  kebutuhan: string;
  menu: ICateringMenu[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface ICateringMenu {
  name: string;
  price: number;
}
