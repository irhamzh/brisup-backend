import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import { StringKeys } from '@interfaces/BaseInterface';
import { ApprovalStatus } from '@constants/BaseCondition';
import { IUserDecoded } from '@modules/MasterData/User/interface/user.interface';

import BaseRepository from '@repositories/baseRepository';
import validationWording from '@constants/validationWording';
import { TypePayment } from './interface/payment.interface';

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
  _paymentModel: admin.firestore.CollectionReference;
  constructor() {
    super('fa_payments', 'fa_payment');
    this._paymentModel = db.collection('fa_payments');
  }

  async pengajuanPenihilan(paukIds: string[], user: IUserDecoded) {
    const batchCommits = [];
    const invalidRow: StringKeys[] = [];

    let batch = db.batch();
    for (let i = 0; i < paukIds.length; i++) {
      // -> defined docref
      const docRef = this._paymentModel.doc(paukIds[i]);

      // -> check exist
      // -> skp if not exist
      const snap = await docRef.get();
      if (!snap.exists) {
        invalidRow.push({
          id: paukIds[i],
          error: validationWording.notFound('PAUK'),
        });
        continue;
      }

      // -> get data
      const data = snap.data();

      if (data?.typePayment !== TypePayment['Penihilan PAUK']) {
        invalidRow.push({
          id: paukIds[i],
          error: validationWording.notFound('PAUK'),
        });
        continue;
      }
      if (
        ApprovalStatus['Approved oleh Supervisor I'].toLowerCase() !==
        data?.statusPenihilan?.toLowerCase()
      ) {
        invalidRow.push({
          id: paukIds[i],
          name: data?.name,
          error: `Untuk diajukan ke Penihilan, PAUK harus berada dalam statusPenihilan "${ApprovalStatus['Approved oleh Supervisor I']}". Status sekarang "${data?.statusPenihilan}"`,
        });
        continue;
      }

      // -> Update Data
      const log = {
        statusPenihilan: ApprovalStatus['Diajukan Penihilan'],
        date: new Date(),
        userId: user.uid,
        name: user.name,
        role: user.role.name,
      };
      const approvalLogPenihilan = [...data.approvalLogPenihilan, log];

      // -> execute update data
      batch.set(
        docRef,
        {
          statusPenihilan: ApprovalStatus['Diajukan Penihilan'],
          approvalLogPenihilan,
        },
        { merge: true }
      );
      if ((i + 1) % 500 === 0) {
        console.log(`Writing records[i] ${i + 1}`);
        batchCommits.push(batch.commit());
        batch = db.batch();
      }
    }
    batchCommits.push(batch.commit());
    await Promise.all(batchCommits);
    return invalidRow;
  }
}
