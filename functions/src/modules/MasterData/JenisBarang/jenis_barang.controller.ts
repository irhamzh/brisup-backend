import { Request, Response } from 'express';
import schema from './jenis_barang.schema';
import JenisBarangRepository from './jenis_barang.repository';
import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

export const createJenisBarang = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);
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
  const validatedBody = yupValidate(schema.create, body);
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
  const data = await jenisBarangRepository.findByIdElastic(validateParam.uid);
  res.json({
    message: 'Successfully Get JenisBarang By Id',
    data,
  });
};

export const getAllJenisBarang = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const jenisBarangRepository = new JenisBarangRepository();
  const { data, totalCount } = await jenisBarangRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await jenisBarangRepository.countDocument(
  //   filtered as string
  // );

  res.json({
    message: 'Successfully Get JenisBarang',
    data,
    totalCount,
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
