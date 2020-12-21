import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import { formatDate } from '@utils/Date';

import schema from './eksploitasi.schema';
import EkploitasiAnggaranRepository from './eksploitasi.repository';

export const getEkploitasiAnggaranById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'eksploitasiId');
  const eksploitasiRepository = new EkploitasiAnggaranRepository();
  const data = await eksploitasiRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get EkploitasiAnggaran By Id',
    data,
  });
};

export const getAllEkploitasiAnggaran = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const eksploitasiRepository = new EkploitasiAnggaranRepository();
  const data = await eksploitasiRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await eksploitasiRepository.countDocument(
    filtered as string
  );
  res.json({
    message: 'Successfully Get All EkploitasiAnggaran',
    data,
    totalCount,
  });
};

export const importExcel = async (req: any, res: Response) => {
  const { files, body } = req;
  const validatedBody = yupValidate(schema.baseCreate, body);
  const eksploitasiRepository = new EkploitasiAnggaranRepository();

  const exist = await eksploitasiRepository.findOne(
    JSON.stringify([{ id: 'atDate$tanggal', value: validatedBody.tanggal }])
  );
  if (exist || exist?.id) {
    throw new InvalidRequestError(
      `Ekploitasi Anggaran tanggal  ${formatDate(
        validatedBody.tanggal
      )} telah ada`,
      'Ekploitasi Anggaran'
    );
  }

  const invalidRow = await eksploitasiRepository.importExcel(
    files,
    {
      A: 'kode',
      B: 'deskripsi',
      C: 'briCorpuBreakdownAnggaran',
      D: 'briCorpuRealisasiAnggaran',
      E: 'briCorpuSisaAnggaran',
      F: 'briCorpu',
      G: 'campusMedanBreakdownAnggaran',
      H: 'campusMedanRealisasiAnggaran',
      I: 'campusMedanSisaAnggaran',
      J: 'campusMedan',
      K: 'campusPadangBreakdownAnggaran',
      L: 'campusPadangRealisasiAnggaran',
      M: 'campusPadangSisaAnggaran',
      N: 'campusPadang',
      O: 'campusJakartaBreakdownAnggaran',
      P: 'campusJakartaRealisasiAnggaran',
      Q: 'campusJakartaSisaAnggaran',
      R: 'campusJakarta',
      S: 'campusBandungBreakdownAnggaran',
      T: 'campusBandungRealisasiAnggaran',
      U: 'campusBandungSisaAnggaran',
      V: 'campusBandung',
      W: 'campusYogyakartaBreakdownAnggaran',
      X: 'campusYogyakartaRealisasiAnggaran',
      Y: 'campusYogyakartaSisaAnggaran',
      Z: 'campusYogyakarta',
      AA: 'campusSurabayaBreakdownAnggaran',
      AB: 'campusSurabayaRealisasiAnggaran',
      AC: 'campusSurabayaSisaAnggaran',
      AD: 'campusSurabaya',
      AE: 'campusMakassarBreakdownAnggaran',
      AF: 'campusMakassarRealisasiAnggaran',
      AG: 'campusMakassarSisaAnggaran',
      AH: 'campusMakassar',
      AI: 'totalCampusBreakdownAnggaran',
      AJ: 'totalCampusRealisasiAnggaran',
      AK: 'totalCampusSisaAnggaran',
      AL: 'totalCampus',
    },
    schema.create,
    { tanggal: validatedBody.tanggal }
  );

  res.json({
    message: 'Successfully Import EkploitasiAnggaran',
    invalidRow,
  });
};
