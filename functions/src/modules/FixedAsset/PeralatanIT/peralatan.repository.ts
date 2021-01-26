import * as yup from 'yup';
import * as admin from 'firebase-admin';

import { db } from '@utils/admin';
import handleImportExcel from '@utils/handleImportExcel';
import BaseRepository from '@repositories/baseRepository';
import { StringKeys, IFiles } from '@interfaces/BaseInterface';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import RuanganRepository from '@modules/MasterData/Ruangan/ruangan.repository';
import JenisPcRepostiory from '@modules/MasterData/JenisPC/jenis_pc.repository';

import {
  IPeralatanBase,
  IPeralatanPC,
  IPeralatanInfocus,
} from './interface/peralatan.interface';

export default class PeralatanITRepository extends BaseRepository<
  IPeralatanPC | IPeralatanBase | IPeralatanInfocus
> {
  _peralatanModel: admin.firestore.CollectionReference;
  constructor() {
    super('fx_peralatan_its', 'fx_peralatan_it', 'bri_corpu_fx_peralatan_its');
    this._peralatanModel = db.collection('fx_peralatan_its');
  }

  async handleExcel(files: IFiles, columnToKey: StringKeys) {
    if (!files?.excel) {
      throw new InvalidRequestError('Please upload xlsx, xls file', 'excel');
    }
    const { path } = files.excel;
    const data = await handleImportExcel(path, columnToKey, files);

    if (data.length < 1) {
      throw new InvalidRequestError(
        'Format Excel tidak valid, pastikan barada di "Sheet1"',
        this._name
      );
    }
    return data;
  }

  async writeToFirestoreEmployee(
    records: StringKeys[],
    schemaValidation: yup.ObjectSchema<any>,
    additionalColumn: { [key: string]: string } = {}
  ) {
    const batchCommits = [];
    const invalidRow: StringKeys[] = [];
    // cari formasi yang available

    let batch = db.batch();
    for (let i = 0; i < records.length; i++) {
      //declare ref
      const docRef = this._peralatanModel.doc();

      let currentData: any = { ...records[i], ...additionalColumn };

      //validation yup
      const validateYup = schemaValidation.isValidSync(currentData);
      if (!validateYup) {
        invalidRow.push({
          name: currentData.name || i + 2,
          error: 'error validation',
        });
        continue;
      }

      const ruanganRepository = new RuanganRepository();
      const exist = await ruanganRepository.findOne(
        JSON.stringify([{ id: 'name', value: currentData.ruangan }])
      );
      if (exist && exist?.id) {
        currentData = { ...currentData, ruangan: exist };
      } else {
        const ruangan = await ruanganRepository.create({
          name: currentData.ruangan,
        });
        currentData = { ...currentData, ruangan };
      }

      if (
        additionalColumn?.jenisPeralatan?.toLowerCase() === 'PC'.toLowerCase()
      ) {
        const jenisPcRepostiory = new JenisPcRepostiory();
        const existJenisPC = await jenisPcRepostiory.findOne(
          JSON.stringify([{ id: 'name', value: currentData.jenisPc }])
        );
        if (existJenisPC && existJenisPC?.id) {
          currentData = { ...currentData, jenisPc: exist };
        } else {
          const jenisPc = await jenisPcRepostiory.create({
            name: currentData.jenisPc,
          });
          currentData = { ...currentData, jenisPc };
        }
      }
      batch.set(docRef, {
        ...currentData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      if ((i + 1) % 500 === 0) {
        console.log(`Writing data ${i + 1}`);
        batchCommits.push(batch.commit());
        batch = db.batch();
      }
    }
    batchCommits.push(batch.commit());
    await Promise.all(batchCommits);
    return invalidRow;
  }

  async importExcelPeralatan(
    files: IFiles,
    columnToKey: StringKeys,
    schemaValidation: yup.ObjectSchema<any>,
    additionalColumn = {}
  ) {
    //ambil data excel
    const dataExcel = await this.handleExcel(files, columnToKey);

    const invalidRow = await this.writeToFirestoreEmployee(
      dataExcel,
      schemaValidation,
      additionalColumn
    );
    return invalidRow;
  }
}
