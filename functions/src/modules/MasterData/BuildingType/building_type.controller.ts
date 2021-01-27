import { Request, Response } from 'express';
import schema from '@modules/MasterData/BuildingType/building_type.schema';

import BuildingTypeRepository from '@modules/MasterData/BuildingType/building_type.repository';
import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

export const createBuildingType = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const buildingTypeRepository = new BuildingTypeRepository();
  const data = await buildingTypeRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Building Type',
    data,
  });
};

export const updateBuildingType = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'buildingTypeId');
  const validatedBody = yupValidate(schema.create, body);

  const buildingTypeRepository = new BuildingTypeRepository();
  const data = await buildingTypeRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update Building Type',
    data,
  });
};

export const getBuildingTypeById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'buildingTypeId');
  const buildingTypeRepository = new BuildingTypeRepository();
  const data = await buildingTypeRepository.findByIdElastic(validateParam.uid);
  res.json({
    message: 'Successfully Get Building Type By Id',
    data,
  });
};

export const getAllBuildingType = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const buildingTypeRepository = new BuildingTypeRepository();
  const { data, totalCount } = await buildingTypeRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await buildingTypeRepository.countDocument(
  //   filtered as string
  // );

  res.json({
    message: 'Successfully Get Building Type',
    data,
    totalCount,
  });
};

export const deleteBuildingTypeById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'buildingTypeId');
  const buildingTypeRepository = new BuildingTypeRepository();
  const data = await buildingTypeRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Building Type By Id',
    data,
  });
};
