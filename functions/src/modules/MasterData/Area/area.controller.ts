import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './area.schema';
import AreaRepository from './area.repository';

export const createArea = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const areaRepository = new AreaRepository();
  const data = await areaRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Area',
    data,
  });
};

export const updateArea = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'areaId');
  const validatedBody = yupValidate(schema.create, body);

  const areaRepository = new AreaRepository();
  const data = await areaRepository.update(validateParam.uid, validatedBody);
  res.json({
    message: 'Successfully Update Area',
    data,
  });
};

export const getAreaById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'areaId');
  const areaRepository = new AreaRepository();
  const data = await areaRepository.findByIdElastic(validateParam.uid);
  res.json({
    message: 'Successfully Get Area By Id',
    data,
  });
};

export const getAllArea = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const areaRepository = new AreaRepository();
  const { data, totalCount } = await areaRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await areaRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get Area',
    data,
    totalCount,
  });
};

export const deleteAreaById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'areaId');
  const areaRepository = new AreaRepository();
  const data = await areaRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully  Delete Area By Id',
    data,
  });
};
