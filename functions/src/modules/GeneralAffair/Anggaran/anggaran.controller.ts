// import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './anggaran.schema';
import AnggaranRepository from './anggaran.repository';

export const getAnggaranById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'anggaranId');
  const anggaranRepository = new AnggaranRepository();
  const data = await anggaranRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Anggaran By Id',
    data,
  });
};

export const getAllAnggaran = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const anggaranRepository = new AnggaranRepository();
  const data = await anggaranRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await anggaranRepository.countDocument(filtered as string);
  res.json({
    message: 'Successfully Get All Anggaran',
    data,
    totalCount,
  });
};

export const deleteAnggaranById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'anggaranId');
  const anggaranRepository = new AnggaranRepository();
  const data = await anggaranRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Anggaran By Id',
    data,
  });
};

export const importExcel = async (req: any, res: Response) => {
  const { files, body } = req;
  const validatedBody = yupValidate(schema.createYearMonth, body);

  const anggaranRepository = new AnggaranRepository();
  const invalidRow = await anggaranRepository.importExcelAnggaran(
    files,
    {
      B: 'tipe',
      C: 'nilai',
      D: 'tanggalPembukuan',
      E: 'keperluan',
      F: 'pelimpahan',
      G: 'tanggalPelimpahan',
    },
    schema.create,
    validatedBody
  );
  res.json({
    message: 'Successfully Import Anggaran',
    invalidRow,
  });
};
