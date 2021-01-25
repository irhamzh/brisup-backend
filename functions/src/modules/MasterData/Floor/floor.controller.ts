import { Request, Response } from 'express';
import schema from './floor.schema';

import FloorRepository from './floor.repository';
import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

export const createFloor = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const floorRepository = new FloorRepository();
  const data = await floorRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Floor',
    data,
  });
};

export const updateFloor = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'floorId');
  const validatedBody = yupValidate(schema.create, body);

  const floorRepository = new FloorRepository();
  const data = await floorRepository.update(validateParam.uid, validatedBody);
  res.json({
    message: 'Successfully Update Floor',
    data,
  });
};

export const getFloorById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'floorId');
  const floorRepository = new FloorRepository();
  const data = await floorRepository.findByIdElastic(validateParam.uid);
  res.json({
    message: 'Successfully Get Floor By Id',
    data,
  });
};

export const getAllFloor = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const floorRepository = new FloorRepository();
  const { data, totalCount } = await floorRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await floorRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get Floor',
    data,
    totalCount,
  });
};

export const deleteFloorById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'floorId');
  const floorRepository = new FloorRepository();
  const data = await floorRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
