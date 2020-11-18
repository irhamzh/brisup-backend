import BaseRepository from '@repositories/baseRepository';
import {
  IPengadaanSwakelolaPembelian,
  IPengadaanBarangdanJasa,
  IPengadaanJasaKonsultan,
  JenisPengadaanJasaKonsultan,
  TypePengadaan,
  // JenisPengadaanBarang,
} from './interface/pengadaan.interface';
import { db } from '@utils/admin';
import * as admin from 'firebase-admin';
import NotFoundError from '@interfaces/NotFoundError';
import validationWording from '@constants/validationWording';
import ProviderRepository from '@modules/Provider/provider.repository';

// type createParam = Omit<
//   | IPengadaanSwakelolaPembelian
//   | IPengadaanBarangdanJasa
//   | IPengadaanJasaKonsultan,
//   'provider'
// >;

export default class PengadaanRepository extends BaseRepository<
  | IPengadaanSwakelolaPembelian
  | IPengadaanBarangdanJasa
  | IPengadaanJasaKonsultan
> {
  _pengadaanModel: admin.firestore.CollectionReference;
  constructor() {
    super('pengadaans', 'pengadaan');
    this._pengadaanModel = db.collection('pengadaans');
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
    return {
      id: snap.id,
      ...data,
      createdAt: data?.createdAt.toDate(),
      updatedAt: data?.updatedAt.toDate(),
    };
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
    return {
      id: ref.id,
      ...updateSnap.data(),
      createdAt: updateSnap.data()?.createdAt.toDate(),
      updatedAt: updateSnap.data()?.updatedAt.toDate(),
    };
  }

  async createPengadaan(
    param: any,
    typePengadaan: string,
    jenisPengadaan: string,
    paramProvider?: string
  ) {
    let createParam = {
      ...param,
      typePengadaan: TypePengadaan[typePengadaan as TypePengadaan],
      jenisPengadaan:
        JenisPengadaanJasaKonsultan[
          jenisPengadaan as JenisPengadaanJasaKonsultan
        ],
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
      .orderBy('createdAt', 'asc')
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
      .orderBy('createdAt', 'asc')
      .startAt(last)
      .limit(parsedLimit)
      .get();
    const data: admin.firestore.DocumentData = [];
    ref.forEach((doc: firebase.firestore.DocumentData) => {
      const snap = { id: doc.id, ...doc.data() };
      return data.push({
        ...snap,
        createdAt: snap.createdAt.toDate(),
        updatedAt: snap.updatedAt.toDate(),
      });
    });
    return data;
  }

  async countDocumentPengadaan(typePengadaan: string, jenisPengadaan: string) {
    const snap = await this._collection
      .where('typePengadaan', '==', typePengadaan)
      .where('jenisPengadaan', '==', jenisPengadaan)
      .get();
    return snap.size || 0;
  }
}
