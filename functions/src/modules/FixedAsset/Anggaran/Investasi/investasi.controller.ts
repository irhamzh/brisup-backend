import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import { formatDate } from '@utils/Date';

import schema from './investasi.schema';
import InvestasiAnggaranRepository from './investasi.repository';

export const getInvestasiAnggaranById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'investasiId');
  const investasiRepository = new InvestasiAnggaranRepository();
  const data = await investasiRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get InvestasiAnggaran By Id',
    data,
  });
};

export const getAllInvestasiAnggaran = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const investasiRepository = new InvestasiAnggaranRepository();
  const data = await investasiRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await investasiRepository.countDocument(
    filtered as string
  );
  res.json({
    message: 'Successfully Get All InvestasiAnggaran',
    data,
    totalCount,
  });
};

export const importExcel = async (req: any, res: Response) => {
  const { files, body } = req;
  const validatedBody = yupValidate(schema.baseCreate, body);
  const investasiRepository = new InvestasiAnggaranRepository();

  const exist = await investasiRepository.findOne(
    JSON.stringify([{ id: 'atDate$tanggal', value: validatedBody.tanggal }])
  );
  if (exist || exist?.id) {
    throw new InvalidRequestError(
      `Investasi Anggaran tanggal  ${formatDate(
        validatedBody.tanggal
      )} telah ada`,
      'Investasi Anggaran'
    );
  }

  const invalidRow = await investasiRepository.importExcel(
    files,
    {
      A: 'kode',
      B: 'deskripsi',
      C: 'briCorpuBreakdownAnggaranBiayaSatuan',
      D: 'briCorpuBreakdownAnggaranJumlah',
      E: 'briCorpuBreakdownAnggaranTotalBiaya',
      F: 'briCorpuRealisasiAnggaranBiayaSatuan',
      G: 'briCorpuRealisasiAnggaranJumlah',
      H: 'briCorpuRealisasiAnggaranTotalBiaya',
      I: 'briCorpuSisaAnggaran',
      J: 'briCorpu',
      K: 'campusMedanBreakdownAnggaranBiayaSatuan',
      L: 'campusMedanBreakdownAnggaranJumlah',
      M: 'campusMedanBreakdownAnggaranTotalBiaya',
      N: 'campusMedanRealisasiAnggaranBiayaSatuan',
      O: 'campusMedanRealisasiAnggaranJumlah',
      P: 'campusMedanRealisasiAnggaranTotalBiaya',
      Q: 'campusMedanSisaAnggaran',
      R: 'campusMedan',
      S: 'campusPadangBreakdownAnggaranBiayaSatuan',
      T: 'campusPadangBreakdownAnggaranJumlah',
      U: 'campusPadangBreakdownAnggaranTotalBiaya',
      V: 'campusPadangRealisasiAnggaranBiayaSatuan',
      W: 'campusPadangRealisasiAnggaranJumlah',
      X: 'campusPadangRealisasiAnggaranTotalBiaya',
      Y: 'campusPadangSisaAnggaran',
      Z: 'campusPadang',
      AA: 'campusJakartaBreakdownAnggaranBiayaSatuan',
      AB: 'campusJakartaBreakdownAnggaranJumlah',
      AC: 'campusJakartaBreakdownAnggaranTotalBiaya',
      AD: 'campusJakartaRealisasiAnggaranBiayaSatuan',
      AE: 'campusJakartaRealisasiAnggaranJumlah',
      AF: 'campusJakartaRealisasiAnggaranTotalBiaya',
      AG: 'campusJakartaSisaAnggaran',
      AH: 'campusJakarta',
      AI: 'campusBandungBreakdownAnggaranBiayaSatuan',
      AJ: 'campusBandungBreakdownAnggaranJumlah',
      AK: 'campusBandungBreakdownAnggaranTotalBiaya',
      AL: 'campusBandungRealisasiAnggaranBiayaSatuan',
      AM: 'campusBandungRealisasiAnggaranJumlah',
      AN: 'campusBandungRealisasiAnggaranTotalBiaya',
      AO: 'campusBandungSisaAnggaran',
      AP: 'campusBandung',
      AQ: 'campusYogyakartaBreakdownAnggaranBiayaSatuan',
      AR: 'campusYogyakartaBreakdownAnggaranJumlah',
      AS: 'campusYogyakartaBreakdownAnggaranTotalBiaya',
      AT: 'campusYogyakartaRealisasiAnggaranBiayaSatuan',
      AU: 'campusYogyakartaRealisasiAnggaranJumlah',
      AV: 'campusYogyakartaRealisasiAnggaranTotalBiaya',
      AW: 'campusYogyakartaSisaAnggaran',
      AX: 'campusYogyakarta',
      AY: 'campusSurabayaBreakdownAnggaranBiayaSatuan',
      AZ: 'campusSurabayaBreakdownAnggaranJumlah',
      BA: 'campusSurabayaBreakdownAnggaranTotalBiaya',
      BB: 'campusSurabayaRealisasiAnggaranBiayaSatuan',
      BC: 'campusSurabayaRealisasiAnggaranJumlah',
      BD: 'campusSurabayaRealisasiAnggaranTotalBiaya',
      BE: 'campusSurabayaSisaAnggaran',
      BF: 'campusSurabaya',
      BG: 'campusMakassarBreakdownAnggaranBiayaSatuan',
      BH: 'campusMakassarBreakdownAnggaranJumlah',
      BI: 'campusMakassarBreakdownAnggaranTotalBiaya',
      BJ: 'campusMakassarRealisasiAnggaranBiayaSatuan',
      BK: 'campusMakassarRealisasiAnggaranJumlah',
      BL: 'campusMakassarRealisasiAnggaranTotalBiaya',
      BM: 'campusMakassarSisaAnggaran',
      BN: 'campusMakassar',
      BO: 'totalCampusBreakdownAnggaranBiayaSatuan',
      BP: 'totalCampusBreakdownAnggaranJumlah',
      BQ: 'totalCampusBreakdownAnggaranTotalBiaya',
      BR: 'totalCampusRealisasiAnggaranBiayaSatuan',
      BS: 'totalCampusRealisasiAnggaranJumlah',
      BT: 'totalCampusRealisasiAnggaranTotalBiaya',
      BU: 'totalCampusSisaAnggaran',
      BV: 'totalCampus',
    },
    schema.create,
    { tanggal: validatedBody.tanggal }
  );

  res.json({
    message: 'Successfully Import InvestasiAnggaran',
    invalidRow,
  });
};
