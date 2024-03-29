import FirestoreRepository from './baseRepository';
import validationWording from '@constants/validationWording';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import ProviderRepository from '@modules/MasterData/Provider/provider.repository';
import { IProviderBase } from '@modules/MasterData/Provider/interface/provider.interface';
import PengadaanRepository from '@modules/Procurement/Pengadaan/PengadaanBarang/pengadaan_barang_jasa.repository';
import {
  IPenunjukanLangsung,
  IPembelianLangsung,
  IBeautyContest,
} from '@modules/Procurement/Pengadaan/PengadaanBarang/interface/pengadaan_barang_jasa.interface';

export default class PengadaaanRepository<
  CreateParam
> extends FirestoreRepository<CreateParam> {
  constructor(collectionName: string, name: string) {
    super(collectionName, name);
  }

  async createWithValidatePengadaan(
    object: CreateParam,
    pengadaanId: string,
    providerId?: string
  ) {
    const validatePengadaan = await this.find(
      JSON.stringify([{ id: 'pengadaan.id', value: pengadaanId }])
    );
    if (validatePengadaan.docs.length > 0) {
      const duplicatePengadaan = validatePengadaan.docs[0].data();
      throw new InvalidRequestError(
        validationWording.duplicate(
          'pengadaan "',
          validatePengadaan.docs[0].id +
            '" |' +
            duplicatePengadaan.pengadaan.namaPengadaan
        ),
        'pengadaan'
      );
    }

    const pengadaanRepository = new PengadaanRepository();
    const pengadaan:
      | IPenunjukanLangsung
      | IPembelianLangsung
      | IBeautyContest = await pengadaanRepository.findById(pengadaanId);
    let crateParam = {
      ...object,
      pengadaan,
    };

    if (providerId) {
      const providerRepository = new ProviderRepository();
      const provider: IProviderBase = await providerRepository.findById(
        providerId
      );
      crateParam = { ...crateParam, provider };
    }
    const data = await this.create(crateParam);
    return data;
  }

  async updateWithValidatePengadaan(
    id: string,
    object: Partial<CreateParam>,
    pengadaanId: string,
    providerId?: string
  ) {
    let createParam = object;
    if (providerId) {
      const providerRepository = new ProviderRepository();
      const provider: IProviderBase = await providerRepository.findById(
        providerId
      );
      createParam = { ...createParam, provider };
    }
    if (pengadaanId) {
      const validatePengadaan = await this.find(
        JSON.stringify([{ id: 'pengadaan.id', value: pengadaanId }])
      );
      if (validatePengadaan.docs.length > 0) {
        const duplicatePengadaan = validatePengadaan.docs[0].data();
        if (validatePengadaan.docs[0].id !== id) {
          throw new InvalidRequestError(
            validationWording.duplicate(
              'pengadaan "',
              validatePengadaan.docs[0].id +
                '" |' +
                duplicatePengadaan.pengadaan.namaPengadaan
            ),
            'pengadaan'
          );
        }
      }
      const pengadaanRepository = new PengadaanRepository();
      const pengadaan:
        | IPenunjukanLangsung
        | IPembelianLangsung
        | IBeautyContest = await pengadaanRepository.findById(pengadaanId);
      createParam = { ...createParam, pengadaan };
    }
    const data = await this.update(id, createParam);
    return data;
  }
}
