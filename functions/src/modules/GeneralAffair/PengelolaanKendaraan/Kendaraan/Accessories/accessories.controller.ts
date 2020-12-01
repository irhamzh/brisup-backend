import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import VehicleRepository from '@modules/MasterData/Vehicle/vehicle.repository';

import schema from './accessories.schema';
import AccessoriesRepository from './accessories.repository';

export const createAccessories = async (req: any, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const vehicleRepository = new VehicleRepository();
  const accessoriesRepository = new AccessoriesRepository();

  const vehicle: any = await vehicleRepository.findById(validatedBody.vehicle);
  const createParam = {
    ...validatedBody,
    vehicle,
  };

  const data: admin.firestore.DocumentData = await accessoriesRepository.createAccessories(
    createParam
  );

  res.json({
    message: 'Successfully Create Aktivitas Accessories',
    data,
  });
};

export const updateAccessories = async (req: any, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.update, body);

  const vehicleRepository = new VehicleRepository();
  const accessoriesRepository = new AccessoriesRepository();

  if (validatedBody.vehicle) {
    const vehicle: any = await vehicleRepository.findById(
      validatedBody.vehicle
    );
    validatedBody = { ...validatedBody, vehicle };
  }

  const data: admin.firestore.DocumentData = await accessoriesRepository.updateAccessories(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Aktivitas Accessories',
    data,
  });
};

export const deleteAccessoriesById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const accessoriesRepository = new AccessoriesRepository();

  const data = await accessoriesRepository.deleteSubDocument(
    validateParam.uid,
    'accessories',
    'ga_accessories'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};

export const getAccessoriesById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const accessoriesRepository = new AccessoriesRepository();
  const data: admin.firestore.DocumentData = await accessoriesRepository.findSubdocumentById(
    validateParam.uid,
    'accessories',
    'ga_accessories'
  );

  res.json({
    message: 'Successfully Get Accessories By Id',
    data,
  });
};

export const getAllAccessories = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const accessoriesRepository = new AccessoriesRepository();
  const data = await accessoriesRepository.findAllSubDocument(
    page as string,
    limit as string,
    'accessories',
    'ga_accessories',
    filtered as string,
    sorted as string
  );
  const totalCount = await accessoriesRepository.countSubDocument(
    'accessories',
    'ga_accessories',
    filtered as string
  );

  res.json({
    message: 'Successfully Get Accessories',
    data,
    totalCount,
  });
};
