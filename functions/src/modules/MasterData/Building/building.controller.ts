import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './building.schema';
import BuildingRepository from './building.repository';

export const createBuilding = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const buildingRepository = new BuildingRepository();
  const data = await buildingRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Building',
    data,
  });
};

export const updateBuilding = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'buildingId');
  const validatedBody = yupValidate(schema.create, body);

  const buildingRepository = new BuildingRepository();
  const data = await buildingRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update Building',
    data,
  });
};

export const getBuildingById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'buildingId');
  const buildingRepository = new BuildingRepository();
  const data = await buildingRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Building By Id',
    data,
  });
};

export const getAllBuilding = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const buildingRepository = new BuildingRepository();
  const data = await buildingRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await buildingRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get Building',
    data,
    totalCount,
  });
};

export const deleteBuildingById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'buildingId');
  const buildingRepository = new BuildingRepository();
  const data = await buildingRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
