import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './tanda_terima_barang.schema';
import TandaTerimaBarangRepository from './tanda_terima_barang.repository';

export const createTandaTerimaBarang = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);
  const tandaTerimaBarang = new TandaTerimaBarangRepository();

  const data = await tandaTerimaBarang.createWithValidatePengadaan(
    validatedBody,
    validatedBody.pengadaan,
    validatedBody?.provider
  );
  res.json({
    message: 'Successfully Create Tanda Terima Barang',
    data,
  });
};

export const updateTandaTerimaBarang = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'tandaTerimaBarangId');
  const validatedBody = yupValidate(schema.update, body);

  const tandaTerimaBarang = new TandaTerimaBarangRepository();

  const data = await tandaTerimaBarang.updateWithValidatePengadaan(
    validateParam.uid,
    validatedBody,
    validatedBody?.pengadaan || undefined,
    validatedBody?.provider || undefined
  );

  res.json({
    message: 'Successfully Update Tanda Terima Barang',
    data,
  });
};

export const getTandaTerimaBarangById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'tandaTerimaBarangId');
  const tandaTerimaBarang = new TandaTerimaBarangRepository();
  const data = await tandaTerimaBarang.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Tanda Terima Barang By Id',
    data,
  });
};

export const getAllTandaTerimaBarang = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const tandaTerimaBarang = new TandaTerimaBarangRepository();
  const data = await tandaTerimaBarang.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await tandaTerimaBarang.countDocument(filtered as string);
  res.json({
    message: 'Successfully Get Tanda Terima Barang',
    data,
    totalCount,
  });
};

export const deleteTandaTerimaBarangById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'tandaTerimaBarangId');
  const tandaTerimaBarang = new TandaTerimaBarangRepository();
  const data = await tandaTerimaBarang.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Tanda Terima Barang By Id',
    data,
  });
};
