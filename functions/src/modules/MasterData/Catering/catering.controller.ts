import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './catering.schema';
import CateringRepository from './catering.repository';

export const createCatering = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const cateringRepository = new CateringRepository();
  const data = await cateringRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Catering',
    data,
  });
};

export const updateCatering = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'cateringId');
  const validatedBody = yupValidate(schema.update, body);

  const cateringRepository = new CateringRepository();
  const data = await cateringRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update Catering',
    data,
  });
};

export const getCateringById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'cateringId');
  const cateringRepository = new CateringRepository();
  const data = await cateringRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Catering By Id',
    data,
  });
};

export const getAllCatering = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const cateringRepository = new CateringRepository();
  const data = await cateringRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await cateringRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get Catering',
    data,
    totalCount,
  });
};

export const deleteCateringById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'cateringId');
  const cateringRepository = new CateringRepository();
  const data = await cateringRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
