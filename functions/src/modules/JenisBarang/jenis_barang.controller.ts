import { Request, Response } from 'express';
import schema from './jenis_barang.schema';
import JenisBarangRepository from './jenis_barang.repository';
import paramValidation from '@utils/paramValidation';

export const createJenisBarang = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = schema.create.validateSync(body);
  const jenisBarangRepository = new JenisBarangRepository();
  const data = await jenisBarangRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create JenisBarang',
    data,
  });
};

export const updateJenisBarang = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'jenisBarangId');
  const validatedBody = schema.create.validateSync(body);
  const jenisBarangRepository = new JenisBarangRepository();
  const data = await jenisBarangRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update JenisBarang',
    data,
  });
};

export const getJenisBarangById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'jenisBarangId');
  const jenisBarangRepository = new JenisBarangRepository();
  const data = await jenisBarangRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get JenisBarang By Id',
    data,
  });
};

export const getAllJenisBarang = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const jenisBarangRepository = new JenisBarangRepository();
  const data = await jenisBarangRepository.findAll(
    page as string,
    limit as string
  );
  res.json({
    message: 'Successfully Get JenisBarang',
    data,
  });
};

export const deleteJenisBarangById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'jenisBarangId');
  const jenisBarangRepository = new JenisBarangRepository();
  const data = await jenisBarangRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
