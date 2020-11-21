import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './pump.schema';
import PumpRepository from './pump.repository';

export const createPump = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const pumpRepository = new PumpRepository();
  const data = await pumpRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Pump',
    data,
  });
};

export const updatePump = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'pumpId');
  const validatedBody = yupValidate(schema.create, body);

  const pumpRepository = new PumpRepository();
  const data = await pumpRepository.update(validateParam.uid, validatedBody);
  res.json({
    message: 'Successfully Update Pump',
    data,
  });
};

export const getPumpById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'pumpId');
  const pumpRepository = new PumpRepository();
  const data = await pumpRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Pump By Id',
    data,
  });
};

export const getAllPump = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const pumpRepository = new PumpRepository();
  const data = await pumpRepository.findAll(page as string, limit as string);
  const totalCount = await pumpRepository.countDocument();

  res.json({
    message: 'Successfully Get Pump',
    data,
    totalCount,
  });
};

export const deletePumpById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'pumpId');
  const pumpRepository = new PumpRepository();
  const data = await pumpRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
