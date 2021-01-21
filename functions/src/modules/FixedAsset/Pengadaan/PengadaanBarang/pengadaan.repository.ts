import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import { StatusPengadaan } from '@constants/BaseCondition';
import { IUserDecoded } from '@modules/MasterData/User/interface/user.interface';

import {
  TypePengadaan,
  JenisPengadaan,
  IPengadaanBarangdanJasa,
  IPengadaanJasaKonsultan,
  IPengadaanSwakelolaPembelian,
} from './interface/pengadaan.interface';

import NotFoundError from '@interfaces/NotFoundError';
import BaseRepository from '@repositories/baseRepository';
import validationWording from '@constants/validationWording';
import ProviderRepository from '@modules/MasterData/Provider/provider.repository';

import PurchaseOrderRepository from '@modules/FixedAsset/Pengadaan/PurchaseOrder/purchase_order.repository';
import EvaluasiSuplierRepository from '@modules/FixedAsset/Pengadaan/EvaluasiSuplier/evaluasi_suplier.repository';
import TandaTerimaBarangRepository from '@modules/FixedAsset/Pengadaan/TandaTerimaBarang/tanda_terima_barang.repository';

// type createParam = Omit<
//   | IPengadaanSwakelolaPembelian
//   | IPengadaanBarangdanJasa
//   | IPengadaanJasaKonsultan,
//   'provider'
// >;

import firestoreTimeStampToDate from '@utils/firestoreTimeStampToDate';

export default class PengadaanRepository extends BaseRepository<
  | IPengadaanSwakelolaPembelian
  | IPengadaanBarangdanJasa
  | IPengadaanJasaKonsultan
> {
  _pengadaanModel: admin.firestore.CollectionReference;
  constructor() {
    super('fx_pengadaans', 'fx_pengadaan');
    this._pengadaanModel = db.collection('fx_pengadaans');
  }

  async findOneById(id: string, typePengadaan: string, jenisPengadaan: string) {
    const snap = await this.findByIdWithoutFormat(id);
    const data = snap.data();
    if (
      data?.typePengadaan !== typePengadaan ||
      data?.jenisPengadaan !== jenisPengadaan
    ) {
      throw new NotFoundError(
        validationWording.notFound(this._name),
        this._name
      );
    }
    return firestoreTimeStampToDate({
      id: snap.id,
      ...data,
    });
  }

  async updatePengadaan(
    id: string,
    object: Partial<
      | IPengadaanSwakelolaPembelian
      | IPengadaanBarangdanJasa
      | IPengadaanJasaKonsultan
    >,
    typePengadaan: string,
    jenisPengadaan: string,
    paramProvider?: string
  ) {
    const ref: admin.firestore.DocumentReference = this._pengadaanModel.doc(id);
    const snap: admin.firestore.DocumentSnapshot = await ref.get();
    const data = snap.data();
    if (
      !snap.exists ||
      data?.typePengadaan !== typePengadaan ||
      data?.jenisPengadaan !== jenisPengadaan
    ) {
      throw new NotFoundError(
        validationWording.notFound(this._name),
        this._name
      );
    }
    let createParam = {
      ...object,
      updatedAt: new Date(),
    };
    if (paramProvider) {
      const providerRepository = new ProviderRepository();
      const provider: any = await providerRepository.findById(paramProvider);
      createParam = {
        ...createParam,
        provider,
      };
    }
    await ref.set(createParam, { merge: true });
    const updateSnap = await ref.get();
    return firestoreTimeStampToDate({
      id: ref.id,
      ...updateSnap.data(),
    });
  }

  async createPengadaan(
    param: any,
    typePengadaan: string,
    jenisPengadaan: string,
    user: IUserDecoded,
    paramProvider?: string
  ) {
    const log = {
      date: new Date(),
      userId: user.uid,
      name: user.name,
      role: user.role.name,
      status: StatusPengadaan['Belum Berjalan'],
    };

    let createParam = {
      ...param,
      typePengadaan: TypePengadaan[typePengadaan as TypePengadaan],
      jenisPengadaan: JenisPengadaan[jenisPengadaan as JenisPengadaan],
      isDraft: false,
      status: StatusPengadaan['Belum Berjalan'],
      approvalLog: [log],
    };
    if (paramProvider) {
      const providerRepository = new ProviderRepository();
      const provider: any = await providerRepository.findById(paramProvider);
      createParam = {
        ...createParam,
        provider,
      };
    }
    return await this.create(createParam);
  }

  async findAllPengadaan(
    page: number | string = 1,
    limit: number | string = 10,
    typePengadaan: string,
    jenisPengadaan: string
  ) {
    const parsedPage = parseInt(page as string);
    const parsedLimit = parseInt(limit as string);
    let skip = (parsedPage - 1) * parsedLimit || 1;
    if (parsedPage > 1) {
      skip = Number(skip) + 1;
    }
    //get skipbatch
    const first = await this._pengadaanModel
      .where('typePengadaan', '==', typePengadaan)
      .where('jenisPengadaan', '==', jenisPengadaan)
      // .orderBy('createdAt', 'asc')
      .limit(skip)
      .get();
    if (first.docs.length <= 0 || first.docs.length < skip) {
      return [];
    }
    const last = first.docs[first.docs.length - 1];

    //getData
    const ref = await this._pengadaanModel
      .where('typePengadaan', '==', typePengadaan)
      .where('jenisPengadaan', '==', jenisPengadaan)
      // .orderBy('createdAt', 'asc')
      .startAt(last)
      .limit(parsedLimit)
      .get();
    const data: admin.firestore.DocumentData = [];
    ref.forEach((doc: firebase.firestore.DocumentData) => {
      const snap = { id: doc.id, ...doc.data() };
      return data.push(snap);
    });
    return firestoreTimeStampToDate(data);
  }

  async countDocumentPengadaan(typePengadaan: string, jenisPengadaan: string) {
    const snap = await this._collection
      .where('typePengadaan', '==', typePengadaan)
      .where('jenisPengadaan', '==', jenisPengadaan)
      .get();
    return snap.size || 0;
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

    const purchaseOrderRepository = new PurchaseOrderRepository();
    const tandaTerimaRepositoryRepository = new TandaTerimaBarangRepository();
    const evaluasiSuplierRepository = new EvaluasiSuplierRepository();
    for (let i = 0; i < data.length; i++) {
      const tandaTerima =
        (await tandaTerimaRepositoryRepository.findOne(
          JSON.stringify([{ id: 'pengadaan.id', value: data[i].id }])
        )) || {};

      const purchaseOrder =
        (await purchaseOrderRepository.findOne(
          JSON.stringify([{ id: 'pengadaan.id', value: data[i].id }])
        )) || {};
      const evaluasi =
        (await evaluasiSuplierRepository.findOne(
          JSON.stringify([{ id: 'pengadaan.id', value: data[i].id }])
        )) || {};

      data[i] = { ...data[i], evaluasi, tandaTerima, purchaseOrder };
    }
    return { data, totalCount };
  }
}
