import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import VehicleRepository from '@modules/MasterData/Vehicle/vehicle.repository';

import schema from './fuel.schema';
import FuelRepository from './fuel.repository';

export const createFuel = async (req: any, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const vehicleRepository = new VehicleRepository();
  const fuelRepository = new FuelRepository();

  const vehicle: any = await vehicleRepository.findById(validatedBody.vehicle);
  const createParam = {
    ...validatedBody,
    vehicle,
    kmAwal: vehicle.kmAkhir,
  };

  const data: admin.firestore.DocumentData = await fuelRepository.create(
    createParam
  );
  await vehicleRepository.update(validatedBody.vehicle, {
    kmAkhir: validatedBody.kmAkhir,
  });

  res.json({
    message: 'Successfully Create "Pengelolaan Bahan Bakar Kendaraan"',
    data,
  });
};

export const updateFuel = async (req: any, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.update, body);

  const vehicleRepository = new VehicleRepository();
  const fuelRepository = new FuelRepository();

  if (validatedBody.vehicle) {
    const vehicle: any = await vehicleRepository.findById(
      validatedBody.vehicle
    );
    validatedBody = { ...validatedBody, vehicle };
  }

  const data: admin.firestore.DocumentData = await fuelRepository.update(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update "Pengelolaan Bahan Bakar Kendaraan"',
    data,
  });
};

export const deleteFuelById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const fuelRepository = new FuelRepository();

  const data = await fuelRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfull Delete "Pengelolaan Bahan Bakar Kendaraan" By Id',
    data,
  });
};

export const getFuelById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const fuelRepository = new FuelRepository();
  const data: admin.firestore.DocumentData = await fuelRepository.findById(
    validateParam.uid
  );

  res.json({
    message: 'Successfully Get "Pengelolaan Bahan Bakar Kendaraan" By Id',
    data,
  });
};

export const getAllFuel = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const fuelRepository = new FuelRepository();
  const data = await fuelRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await fuelRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get "Pengelolaan Bahan Bakar Kendaraan"',
    data,
    totalCount,
  });
};
