import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './compressor.schema';
import CompressorRepository from './compressor.repository';

export const createCompressor = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const compressorRepository = new CompressorRepository();
  const data = await compressorRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Compressor',
    data,
  });
};

export const updateCompressor = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'compressorId');
  const validatedBody = yupValidate(schema.create, body);

  const compressorRepository = new CompressorRepository();
  const data = await compressorRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update Compressor',
    data,
  });
};

export const getCompressorById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'compressorId');
  const compressorRepository = new CompressorRepository();
  const data = await compressorRepository.findByIdElastic(validateParam.uid);
  res.json({
    message: 'Successfully Get Compressor By Id',
    data,
  });
};

export const getAllCompressor = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const compressorRepository = new CompressorRepository();
  const { data, totalCount } = await compressorRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await compressorRepository.countDocument(
  //   filtered as string
  // );

  res.json({
    message: 'Successfully Get Compressor',
    data,
    totalCount,
  });
};

export const deleteCompressorById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'compressorId');
  const compressorRepository = new CompressorRepository();
  const data = await compressorRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
