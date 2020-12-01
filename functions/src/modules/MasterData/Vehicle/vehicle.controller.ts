import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './vehicle.schema';
import VehicleRepository from './vehicle.repository';

export const createVehicle = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const vehicleRepository = new VehicleRepository();
  const data = await vehicleRepository.create({ ...validatedBody, kmAkhir: 0 });
  res.json({
    message: 'Successfully Create Vehicle',
    data,
  });
};

export const updateVehicle = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'vehicleId');
  const validatedBody = yupValidate(schema.create, body);

  const vehicleRepository = new VehicleRepository();
  const data = await vehicleRepository.update(validateParam.uid, validatedBody);
  res.json({
    message: 'Successfully Update Vehicle',
    data,
  });
};

export const getVehicleById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'vehicleId');
  const vehicleRepository = new VehicleRepository();
  const data = await vehicleRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Vehicle By Id',
    data,
  });
};

export const getAllVehicle = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const vehicleRepository = new VehicleRepository();
  const data = await vehicleRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await vehicleRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get Vehicle',
    data,
    totalCount,
  });
};

export const deleteVehicleById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'vehicleId');
  const vehicleRepository = new VehicleRepository();
  const data = await vehicleRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
