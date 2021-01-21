import { db } from '@utils/admin';
import * as admin from 'firebase-admin';
import { v4 as generateId } from 'uuid';
import NotFoundError from '@interfaces/NotFoundError';
import BaseRepository from '@repositories/baseRepository';
import validationWording from '@constants/validationWording';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import { StatusPengadaan } from '@constants/BaseCondition';

import {
  IAnggaranBase,
  IAnggaran,
  TypeAnggaran,
} from './interface/anggaran.interface';

export default class AnggaranRepository extends BaseRepository<IAnggaranBase> {
  _budgetModel: admin.firestore.CollectionReference;
  constructor() {
    super('ga_budgets', 'budget');
    this._budgetModel = db.collection('ga_budgets');
  }

  async createAnggaran(object: IAnggaran) {
    const exist = await this.findOne(
      '',
      this._budgetModel
        .where('categoryAnggaran', '==', object.categoryAnggaran)
        .where('year', '==', object.year)
        .where('month', '==', object.month)
    );
    if (exist && exist.id) {
      let penggunaan = undefined;
      let totalBreakdown = exist.totalBreakdown;
      let sisaAnggaran = exist.sisaAnggaran;
      if (object.type === TypeAnggaran['Breakdown']) {
        // totalBreakdown = Number(totalBreakdown) + Number(object.nilai);
        // sisaAnggaran = Number(sisaAnggaran) + Number(object.nilai);
        // penggunaan = {
        //   id: generateId(),
        //   type: object.type,
        //   nilai: object.nilai,
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // };
        throw new InvalidRequestError(
          `Breakdown ${object.year}-${object.month} sudah ditetapkan`,
          'anggaran'
        );
      } else {
        sisaAnggaran = Number(sisaAnggaran) - Number(object.nilai);
        if (sisaAnggaran < 0) {
          throw new InvalidRequestError(
            `Penggunaan melebihi sisa Anggaran. Sisa Anggaran sekarang = ${
              Number(sisaAnggaran) + Number(object.nilai)
            }. Penggunaan yang akan datang = ${object.nilai}`,
            'humas'
          );
        }
        penggunaan = {
          id: generateId(),
          type: object.type,
          nilai: object.nilai,
          tanggalPembukuan: object.tanggalPembukuan,
          keperluan: object.keperluan,
          pelimpahan: object.pelimpahan,
          tanggalPelimpahan: object.tanggalPelimpahan,
          status: StatusPengadaan['Belum Berjalan'],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
      const createParam = {
        year: exist.year,
        month: exist.month,
        totalBreakdown,
        sisaAnggaran,
        categoryAnggaran: exist.categoryAnggaran,
        detail: [...exist.detail, penggunaan],
      };

      const data = await this.update(exist.id, createParam);
      return data;
    } else {
      if (object.type === TypeAnggaran['Penggunaan']) {
        throw new InvalidRequestError(
          `Breakdown ${object.year}-${object.month} belum ditetapkan`,
          'anggaran'
        );
      }
      const penggunaan = {
        id: generateId(),
        type: object.type,
        nilai: object.nilai,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const createParam = {
        year: object.year,
        month: object.month,
        totalBreakdown: object.nilai,
        sisaAnggaran: object.nilai,
        categoryAnggaran: object.categoryAnggaran,
        detail: [penggunaan],
      };
      const data = await this.create(createParam);
      return data;
    }
  }

  async updateAnggaran(id: string, object: Partial<IAnggaran>) {
    const exist = await this.findById(id);
    const currentData = exist.detail.findIndex(
      ({ id }: { [key: string]: string }) => id === object.id
    );
    if (currentData < 0) {
      throw new NotFoundError(
        validationWording.notFound('Anggaran'),
        'Anggaran'
      );
    }

    let penggunaan = undefined;
    if (exist.detail[currentData].type === TypeAnggaran['Breakdown']) {
      penggunaan = {
        id: exist.detail[currentData].id,
        type: exist.detail[currentData].type,
        nilai: object.nilai || exist.detail[currentData].nilai,
        createdAt: exist.detail[currentData].createdAt,
        updatedAt: new Date(),
      };
    } else {
      penggunaan = {
        id: exist.detail[currentData].id,
        type: exist.detail[currentData].type,
        nilai: object.nilai || exist.detail[currentData].nilai,
        tanggalPembukuan:
          object.tanggalPembukuan || exist.detail[currentData].tanggalPembukuan,
        keperluan: object.keperluan || exist.detail[currentData].keperluan,
        pelimpahan: object.pelimpahan || exist.detail[currentData].pelimpahan,
        tanggalPelimpahan:
          object.tanggalPelimpahan ||
          exist.detail[currentData].tanggalPelimpahan,
        status: exist.detail[currentData].status,
        createdAt: exist.detail[currentData].createdAt,
        updatedAt: new Date(),
      };
    }

    const detail: any = Object.values(
      [].concat(exist.detail, penggunaan as any).reduce((r: any, c: any) => {
        return (r[c.id] = Object.assign(r[c.id] || {}, c)), r;
      }, {})
    );
    const totalBreakdown = detail.reduce(
      (sum: any, x: any) =>
        Number(sum) +
        (x.type === TypeAnggaran['Breakdown'] ? Number(x.nilai) : 0),
      0
    );
    const totalPenggunaan = detail.reduce(
      (sum: any, x: any) =>
        Number(sum) +
        (x.type === TypeAnggaran['Penggunaan'] ? Number(x.nilai) : 0),
      0
    );
    if (
      exist.detail[currentData].type === TypeAnggaran['Breakdown'] &&
      Number(totalBreakdown) < Number(totalPenggunaan)
    ) {
      throw new InvalidRequestError(
        `Brakdown yang Anda masukan terlalu kecil. Total Breakdown sekarang = ${totalBreakdown}. Total Penggunaan sekarang = ${totalPenggunaan}`,
        'humas'
      );
    }
    const sisaAnggaran = Number(totalBreakdown) - Number(totalPenggunaan);
    if (sisaAnggaran < 0) {
      throw new InvalidRequestError(
        `Penggunaan melebihi sisa Anggaran. Sisa Anggaran sekarang = ${
          Number(sisaAnggaran) + Number(object.nilai)
        }. Penggunaan yang akan data = ${object.nilai}`,
        'humas'
      );
    }

    const createParam = {
      year: exist.year,
      month: exist.month,
      totalBreakdown,
      sisaAnggaran,
      categoryAnggaran: exist.categoryAnggaran,
      detail,
    };

    const data = await this.update(exist.id, createParam);
    return data;
  }

  async deletePenggunaanAnggaran(id: string, childId: string) {
    const exist = await this.findById(id);
    const currentData = exist.detail.findIndex(
      ({ id }: { [key: string]: string }) => id === childId
    );
    if (currentData < 0) {
      throw new NotFoundError(
        validationWording.notFound('Anggaran'),
        'Anggaran'
      );
    }

    if (exist.detail[currentData].type === TypeAnggaran['Breakdown']) {
      throw new InvalidRequestError(
        'Tidak diperbolehkan menghapus Anggaran',
        'Anggaran'
      );
    }

    const detail = exist.detail;
    detail.splice(currentData, 1);
    const totalBreakdown = detail.reduce(
      (sum: any, x: any) =>
        Number(sum) +
        (x.type === TypeAnggaran['Breakdown'] ? Number(x.nilai) : 0),
      0
    );
    const totalPenggunaan = detail.reduce(
      (sum: any, x: any) =>
        Number(sum) +
        (x.type === TypeAnggaran['Penggunaan'] ? Number(x.nilai) : 0),
      0
    );

    const sisaAnggaran = Number(totalBreakdown) - Number(totalPenggunaan);

    const createParam = {
      year: exist.year,
      month: exist.month,
      totalBreakdown,
      sisaAnggaran,
      categoryAnggaran: exist.categoryAnggaran,
      detail,
    };

    const data = await this.update(exist.id, createParam);
    return data;
  }
}
