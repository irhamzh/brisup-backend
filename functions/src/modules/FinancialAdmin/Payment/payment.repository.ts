import BaseRepository from '@repositories/baseRepository';

import {
  IDataKelogistikan,
  ITagihanBBM,
  ITagihanServiceKendaraan,
  ITagihanSewaBus,
  ITagihanRekreasiSiswa,
  ITagihanRohaniHumasRepresentasiRapat,
  ITagihanBrimedika,
  IPenihilanPAUK,
  IPublicCourse,
  ITagihanS2,
  IAAJIWaperd,
  IHonorSalaryCreaditing,
  IPembayaranLainnya,
  ICatering,
  IJasaPendidikan,
  IHotel,
  IAkomodasiAsrama,
} from './interface/payment.interface';

export default class PaymentRepositoryRepository extends BaseRepository<
  | IDataKelogistikan
  | ITagihanBBM
  | ITagihanServiceKendaraan
  | ITagihanSewaBus
  | ITagihanRekreasiSiswa
  | ITagihanRohaniHumasRepresentasiRapat
  | ITagihanBrimedika
  | IPenihilanPAUK
  | IPublicCourse
  | ITagihanS2
  | IAAJIWaperd
  | IHonorSalaryCreaditing
  | IPembayaranLainnya
  | ICatering
  | IJasaPendidikan
  | IHotel
  | IAkomodasiAsrama
> {
  constructor() {
    super('fa_payments', 'fa_payment');
  }
}
