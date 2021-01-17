import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './anggaran.schema';
import AnggaranRepository from './anggaran.repository';
import { TypeAnggaran } from './interface/anggaran.interface';

export const createAnggaran = async (req: Request, res: Response) => {
  const { body } = req;

  const masterValidate = yupValidate(schema.create, body);
  const type = masterValidate.type;

  let validatedBody = undefined;
  if (type === TypeAnggaran['Penggunaan']) {
    validatedBody = yupValidate(schema.createPenggunaan, body);
  } else {
    validatedBody = masterValidate;
  }
  const anggaranRepository = new AnggaranRepository();

  const data = await anggaranRepository.createAnggaran(validatedBody);
  res.json({
    message: 'Successfully Create Anggaran',
    data,
  });
};

export const updateAnggaran = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'anggaranId');
  const validatedBody = yupValidate(schema.update, body);
  const anggaranRepository = new AnggaranRepository();
  const data = await anggaranRepository.updateAnggaran(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update Anggaran',
    data,
  });
};

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
