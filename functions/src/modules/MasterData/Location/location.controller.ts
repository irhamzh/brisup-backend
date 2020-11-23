import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './location.schema';
import LocationRepository from './location.repository';

export const createLocation = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const locationRepository = new LocationRepository();
  const data = await locationRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Location',
    data,
  });
};

export const updateLocation = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'locationId');
  const validatedBody = yupValidate(schema.create, body);

  const locationRepository = new LocationRepository();
  const data = await locationRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update Location',
    data,
  });
};

export const getLocationById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'locationId');
  const locationRepository = new LocationRepository();
  const data = await locationRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Location By Id',
    data,
  });
};

export const getAllLocation = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const locationRepository = new LocationRepository();
  const data = await locationRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await locationRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get Location',
    data,
    totalCount,
  });
};

export const deleteLocationById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'locationId');
  const locationRepository = new LocationRepository();
  const data = await locationRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
