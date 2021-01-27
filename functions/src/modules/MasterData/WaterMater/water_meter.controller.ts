import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './water_meter.schema';
import WaterMeterRepository from './water_meter.repository';

export const createWaterMeter = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const waterMeterRepository = new WaterMeterRepository();
  const data = await waterMeterRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create WaterMeter',
    data,
  });
};

export const updateWaterMeter = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'waterMeterId');
  const validatedBody = yupValidate(schema.create, body);

  const waterMeterRepository = new WaterMeterRepository();
  const data = await waterMeterRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update WaterMeter',
    data,
  });
};

export const getWaterMeterById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'waterMeterId');
  const waterMeterRepository = new WaterMeterRepository();
  const data = await waterMeterRepository.findByIdElastic(validateParam.uid);
  res.json({
    message: 'Successfully Get WaterMeter By Id',
    data,
  });
};

export const getAllWaterMeter = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const waterMeterRepository = new WaterMeterRepository();
  const { data, totalCount } = await waterMeterRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await waterMeterRepository.countDocument(
  //   filtered as string
  // );

  res.json({
    message: 'Successfully Get WaterMeter',
    data,
    totalCount,
  });
};

export const deleteWaterMeterById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'waterMeterId');
  const waterMeterRepository = new WaterMeterRepository();
  const data = await waterMeterRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete WaterMeter By Id',
    data,
  });
};
