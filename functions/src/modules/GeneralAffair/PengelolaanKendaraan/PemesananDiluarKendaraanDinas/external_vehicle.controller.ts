import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import { TypeExternalVehicle } from './interface/external_vehicle.interface';
import schema from './external_vehicle.schema';
import ExternalVehicleRepository from './external_vehicle.repository';

export const createExternalVehicle = async (req: Request, res: Response) => {
  const { body } = req;
  const masterValidate = yupValidate(schema.baseCreate, body);
  let validatedBody = undefined;
  if (
    masterValidate?.type?.toLowerCase() ===
    TypeExternalVehicle['Pemesanan Kendaraan']?.toLowerCase()
  ) {
    validatedBody = yupValidate(schema.createOrder, body);
  } else {
    validatedBody = yupValidate(schema.createReimburse, body);
  }

  const externalVehicleRepository = new ExternalVehicleRepository();
  const data = await externalVehicleRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create ExternalVehicle',
    data,
  });
};

export const updateExternalVehicle = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'externalVehicleId');
  const externalVehicleRepository = new ExternalVehicleRepository();
  let validatedBody = undefined;

  const ref: admin.firestore.DocumentData = await externalVehicleRepository.findById(
    validateParam.uid
  );

  if (
    ref?.type?.toLowerCase() ===
    TypeExternalVehicle['Pemesanan Kendaraan']?.toLowerCase()
  ) {
    validatedBody = yupValidate(schema.updateOrder, body);
  } else {
    validatedBody = yupValidate(schema.updateReimburse, body);
  }

  const data = await externalVehicleRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update ExternalVehicle',
    data,
  });
};

export const getExternalVehicleById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'externalVehicleId');
  const externalVehicleRepository = new ExternalVehicleRepository();
  const data = await externalVehicleRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get ExternalVehicleBy Id',
    data,
  });
};

export const getAllExternalVehicle = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const externalVehicleRepository = new ExternalVehicleRepository();
  const data = await externalVehicleRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await externalVehicleRepository.countDocument(
    filtered as string
  );

  res.json({
    message: 'Successfully Get ExternalVehicle',
    data,
    totalCount,
  });
};

export const deleteExternalVehicleById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'externalVehicleId');
  const externalVehicleRepository = new ExternalVehicleRepository();
  const data = await externalVehicleRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
