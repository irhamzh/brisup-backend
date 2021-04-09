import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './tax.schema';
import TaxRepository from './tax.repository';

export const createTax = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const taxRepository = new TaxRepository();
  const data = await taxRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Tax',
    data,
  });
};

export const updateTax = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'taxId');
  const validatedBody = yupValidate(schema.create, body);

  const taxRepository = new TaxRepository();
  const data = await taxRepository.update(validateParam.uid, validatedBody);
  res.json({
    message: 'Successfully Update Tax',
    data,
  });
};

export const getTaxById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'taxId');
  const taxRepository = new TaxRepository();
  const data = await taxRepository.findByIdElastic(validateParam.uid);
  res.json({
    message: 'Successfully Get Tax By Id',
    data,
  });
};

export const getAllTax = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const taxRepository = new TaxRepository();
  const { data, totalCount } = await taxRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await taxRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get Tax',
    data,
    totalCount,
  });
};

export const deleteTaxById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'taxId');
  const taxRepository = new TaxRepository();
  const data = await taxRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Tax By Id',
    data,
  });
};
