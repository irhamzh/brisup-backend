import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './uker.schema';
import UkerRepository from './uker.repository';

export const createUker = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const ukerRepository = new UkerRepository();
  const data = await ukerRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Uker',
    data,
  });
};

export const updateUker = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'ukerId');
  const validatedBody = yupValidate(schema.create, body);

  const ukerRepository = new UkerRepository();
  const data = await ukerRepository.update(validateParam.uid, validatedBody);
  res.json({
    message: 'Successfully Update Uker',
    data,
  });
};

export const getUkerById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'ukerId');
  const ukerRepository = new UkerRepository();
  const data = await ukerRepository.findByIdElastic(validateParam.uid);
  res.json({
    message: 'Successfully Get Uker By Id',
    data,
  });
};

export const getAllUker = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const ukerRepository = new UkerRepository();
  const { data, totalCount } = await ukerRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await ukerRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get Uker',
    data,
    totalCount,
  });
};

export const deleteUkerById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'ukerId');
  const ukerRepository = new UkerRepository();
  const data = await ukerRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
