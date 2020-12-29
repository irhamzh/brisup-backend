import * as yup from 'yup';
import { db } from '@utils/admin';
import * as admin from 'firebase-admin';
// import NotFoundError from '@interfaces/NotFoundError';
import BaseRepository from '@repositories/baseRepository';
// import validationWording from '@constants/validationWording';
import InvalidRequestError from '@interfaces/InvalidRequestError';

import { IAnggaranBase } from './interface/anggaran.interface';

const excelToJson = require('convert-excel-to-json');

interface IFile {
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
  buffer: Buffer;
}

interface StringKeys {
  [key: string]: string;
}
interface IFiles {
  [key: string]: IFile;
}

export default class AnggaranRepository extends BaseRepository<IAnggaranBase> {
  _budgetModel: admin.firestore.CollectionReference;
  constructor() {
    super('ga_budgets', 'budget');
    this._budgetModel = db.collection('ga_budgets');
  }

  async handleExcel(files: IFiles, columnToKey: StringKeys) {
    if (!files?.excel) {
      throw new InvalidRequestError('Please upload xlsx, xls file', 'excel');
    }
    const { path } = files.excel;

    const data = excelToJson({
      sourceFile: path,
      header: {
        rows: 1,
      },
      sheets: ['Humas', 'Representatif', 'Rapat'],
      columnToKey: columnToKey,
    });
    const humas = data?.Humas || [];
    const representatif = data?.Representatif || [];
    const rapat = data?.Rapat || [];

    if (humas.length < 1 && representatif.length < 1 && rapat.length < 1) {
      throw new InvalidRequestError(
        'Data dalam Sheet kosong, pastikan data berada dalam sheet "Humas", "Representatif", "Rapat"',
        this._name
      );
    }

    return { humas, representatif, rapat };
  }

  async writeToFirestoreAnggaaran(records: IAnggaranBase[]) {
    const batchCommits = [];
    let batch = db.batch();
    for (let i = 0; i < records.length; i++) {
      //defined docref
      const docRef = this._budgetModel;

      //check exist
      const exist = await this.findOne(
        '',
        this._budgetModel
          .where('typeAnggaran', '==', records[i]?.typeAnggaran)
          .where('year', '==', records[i]?.year)
          .where('month', '==', records[i]?.month)
      );
      //update if exist
      if (exist && exist.id) {
        // const penilaian = Object.values(
        //   []
        //     .concat(exist.penilaian, records[i].penilaian as any)
        //     .reduce((r: any, c: any) => {
        //       return (r[c.year] = Object.assign(r[c.year] || {}, c)), r;
        //     }, {})
        // );
        // const updateParam = {
        //   ...exist,
        //   penilaian,
        // };
        batch.update(docRef.doc(exist.id), {
          ...records[i],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        //create
        batch.set(docRef.doc(), {
          ...records[i],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      if ((i + 1) % 500 === 0) {
        console.log(`Writing records[i] ${i + 1}`);
        batchCommits.push(batch.commit());
        batch = db.batch();
      }
    }
    batchCommits.push(batch.commit());
    await Promise.all(batchCommits);
  }

  async importExcelAnggaran(
    files: IFiles,
    columnToKey: StringKeys,
    schemaValidation: yup.ObjectSchema<any>,
    additionalColumn: { year: number; month: number }
  ) {
    const { humas, representatif, rapat } = await this.handleExcel(
      files,
      columnToKey
    );
    const data = [];
    const invalidRow: StringKeys[] = [];

    if (humas.length > 0) {
      // const humasBreakdownIndex = humas.findIndex(
      //   ({ tipe }: { [key: string]: string }) =>
      //     tipe.toLowerCase() === 'breakdown'
      // );
      let breakdown = 0;
      let sisaAnggaran = breakdown;
      const penggunaan = [];
      for (let i = 0; i < humas.length; i++) {
        if (humas[i].tipe.toLowerCase() === 'breakdown') {
          breakdown = Number(humas[i].nilai);
          sisaAnggaran = breakdown;
          continue;
        }
        if (humas[i].tipe.toLowerCase() === 'penggunaan') {
          const validateYup = schemaValidation.isValidSync(humas[i]);
          if (!validateYup) {
            invalidRow.push({
              sheet: 'humas',
              row: `${Number(i) + 2}`,
              error: 'error validation',
            });
            continue;
          }
          penggunaan.push({
            nilai: humas[i].nilai,
            tanggalPembukuan: humas[i].tanggalPembukuan,
            keperluan: humas[i].keperluan,
            pelimpahan: humas[i].pelimpahan,
            tanggalPelimpahan: humas[i].tanggalPelimpahan,
          });
          sisaAnggaran = sisaAnggaran - Number(humas[i].nilai);
        }
      }
      if (sisaAnggaran < 0) {
        throw new InvalidRequestError(
          'Sisa Anggaran Humas negatif. Sisa Anggaran Humas sekarang = ' +
            sisaAnggaran,
          'humas'
        );
      }
      data.push({
        ...additionalColumn,
        breakdown,
        sisaAnggaran,
        typeAnggaran: 'Humas',
        penggunaan,
      });
    }
    if (representatif.length > 0) {
      let breakdown = 0;
      let sisaAnggaran = breakdown;
      const penggunaan = [];
      for (let i = 0; i < representatif.length; i++) {
        if (representatif[i].tipe.toLowerCase() === 'breakdown') {
          breakdown = Number(representatif[i].nilai);
          sisaAnggaran = breakdown;
          continue;
        }
        if (representatif[i].tipe.toLowerCase() === 'penggunaan') {
          const validateYup = schemaValidation.isValidSync(representatif[i]);
          if (!validateYup) {
            invalidRow.push({
              sheet: 'representatif',
              row: `${Number(i) + 2}`,
              error: 'error validation',
            });
            continue;
          }
          penggunaan.push({
            nilai: representatif[i].nilai,
            tanggalPembukuan: representatif[i].tanggalPembukuan,
            keperluan: representatif[i].keperluan,
            pelimpahan: representatif[i].pelimpahan,
            tanggalPelimpahan: representatif[i].tanggalPelimpahan,
          });
          sisaAnggaran = sisaAnggaran - Number(representatif[i].nilai);
        }
      }
      if (sisaAnggaran < 0) {
        throw new InvalidRequestError(
          'Sisa Anggaran Representatif negatif. Sisa Anggaran Representatif sekarang = ' +
            sisaAnggaran,
          'representatif'
        );
      }
      data.push({
        ...additionalColumn,
        breakdown,
        sisaAnggaran,
        typeAnggaran: 'Representatif',
        penggunaan,
      });
    }

    if (rapat.length > 0) {
      let breakdown = 0;
      let sisaAnggaran = breakdown;
      const penggunaan = [];
      for (let i = 0; i < rapat.length; i++) {
        if (rapat[i].tipe.toLowerCase() === 'breakdown') {
          breakdown = Number(rapat[i].nilai);
          sisaAnggaran = breakdown;
          continue;
        }
        if (rapat[i].tipe.toLowerCase() === 'penggunaan') {
          const validateYup = schemaValidation.isValidSync(rapat[i]);
          if (!validateYup) {
            invalidRow.push({
              sheet: 'rapat',
              row: `${Number(i) + 2}`,
              error: 'error validation',
            });
            continue;
          }
          penggunaan.push({
            nilai: rapat[i].nilai,
            tanggalPembukuan: rapat[i].tanggalPembukuan,
            keperluan: rapat[i].keperluan,
            pelimpahan: rapat[i].pelimpahan,
            tanggalPelimpahan: rapat[i].tanggalPelimpahan,
          });
          sisaAnggaran = sisaAnggaran - Number(rapat[i].nilai);
        }
      }
      if (sisaAnggaran < 0) {
        throw new InvalidRequestError(
          'Sisa Anggaran Rapat negatif. Sisa Anggaran Rapat sekarang = ' +
            sisaAnggaran,
          'rapat'
        );
      }
      data.push({
        ...additionalColumn,
        breakdown,
        sisaAnggaran,
        typeAnggaran: 'Rapat',
        penggunaan,
      });
    }

    await this.writeToFirestoreAnggaaran(data);
    return invalidRow;
  }
}
