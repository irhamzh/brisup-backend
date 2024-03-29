import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import VehicleRepository from '@modules/MasterData/Vehicle/vehicle.repository';

import schema from './kir.schema';
import KIRRepository from './kir.repository';

export const createKIR = async (req: any, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const vehicleRepository = new VehicleRepository();
  const kirRepository = new KIRRepository();

  const vehicle: any = await vehicleRepository.findById(validatedBody.vehicle);
  const createParam = {
    ...validatedBody,
    vehicle,
  };

  const data: admin.firestore.DocumentData = await kirRepository.createKIR(
    createParam
  );

  res.json({
    message: 'Successfully Create "Pengelolaan Kendaraan KIR"',
    data,
  });
};

export const updateKIR = async (req: any, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.update, body);

  const vehicleRepository = new VehicleRepository();
  const kirRepository = new KIRRepository();

  if (validatedBody.vehicle) {
    const vehicle: any = await vehicleRepository.findById(
      validatedBody.vehicle
    );
    validatedBody = { ...validatedBody, vehicle };
  }

  const data: admin.firestore.DocumentData = await kirRepository.updateKIR(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update "Pengelolaan Kendaraan KIR"',
    data,
  });
};

export const deleteKIRById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const kirRepository = new KIRRepository();

  const data = await kirRepository.deleteSubDocument(
    validateParam.uid,
    'kir',
    'ga_kirs'
  );
  res.json({
    message: 'Successfully Delete "Pengelolaan Kendaraan KIR" By Id',
    data,
  });
};

export const getKIRById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const kirRepository = new KIRRepository();
  const data: admin.firestore.DocumentData = await kirRepository.findSubdocumentById(
    validateParam.uid,
    'kir',
    'ga_kirs'
  );

  res.json({
    message: 'Successfully Get "Pengelolaan Kendaraan KIR" By Id',
    data,
  });
};

export const getAllKIR = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const kirRepository = new KIRRepository();
  const data = await kirRepository.findAllSubDocument(
    page as string,
    limit as string,
    'kir',
    'ga_kirs',
    filtered as string,
    sorted as string
  );
  const totalCount = await kirRepository.countSubDocument(
    'kir',
    'ga_kirs',
    filtered as string
  );

  res.json({
    message: 'Successfully Get "Pengelolaan Kendaraan KIR"',
    data,
    totalCount,
  });
};

export const getKIRByIdElastic = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const kirRepository = new KIRRepository();
  const data: admin.firestore.DocumentData = await kirRepository.findByIdElastic(
    validateParam.uid,
    'bri_corpu_ga_kirs'
  );

  res.json({
    message: 'Successfully Get "Pengelolaan Kendaraan KIR" By Id',
    data,
  });
};

export const getAllKIRElastic = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const kirRepository = new KIRRepository();
  const { data, totalCount } = await kirRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string,
    'bri_corpu_ga_kirs'
  );

  res.json({
    message: 'Successfully Get "Pengelolaan Kendaraan KIR"',
    data,
    totalCount,
  });
};
