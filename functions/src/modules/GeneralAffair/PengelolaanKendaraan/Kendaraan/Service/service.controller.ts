import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import VehicleRepository from '@modules/MasterData/Vehicle/vehicle.repository';

import schema from './service.schema';
import ServiceRepository from './service.repository';

export const createService = async (req: any, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const vehicleRepository = new VehicleRepository();
  const serviceRepository = new ServiceRepository();

  const vehicle: any = await vehicleRepository.findById(validatedBody.vehicle);
  const createParam = {
    ...validatedBody,
    vehicle,
  };

  const data: admin.firestore.DocumentData = await serviceRepository.createService(
    createParam
  );

  res.json({
    message: 'Successfully Create "Pengelolaan Service Kendaran"',
    data,
  });
};

export const updateService = async (req: any, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.update, body);

  const vehicleRepository = new VehicleRepository();
  const serviceRepository = new ServiceRepository();

  if (validatedBody.vehicle) {
    const vehicle: any = await vehicleRepository.findById(
      validatedBody.vehicle
    );
    validatedBody = { ...validatedBody, vehicle };
  }

  const data: admin.firestore.DocumentData = await serviceRepository.updateService(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update "Pengelolaan Service Kendaran"',
    data,
  });
};

export const deleteServiceById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const serviceRepository = new ServiceRepository();

  const data = await serviceRepository.deleteSubDocument(
    validateParam.uid,
    'service',
    'ga_services'
  );
  res.json({
    message: 'Successfully Delete "Pengelolaan Service Kendaran" By Id',
    data,
  });
};

export const getServiceById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const serviceRepository = new ServiceRepository();
  const data: admin.firestore.DocumentData = await serviceRepository.findSubdocumentById(
    validateParam.uid,
    'service',
    'ga_services'
  );

  res.json({
    message: 'Successfully Get "Pengelolaan Service Kendaran" By Id',
    data,
  });
};

export const getAllService = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const serviceRepository = new ServiceRepository();
  const data = await serviceRepository.findAllSubDocument(
    page as string,
    limit as string,
    'service',
    'ga_services',
    filtered as string,
    sorted as string
  );
  const totalCount = await serviceRepository.countSubDocument(
    'service',
    'ga_services',
    filtered as string
  );

  res.json({
    message: 'Successfully Get "Pengelolaan Service Kendaran"',
    data,
    totalCount,
  });
};

export const getServiceByIdElastic = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const serviceRepository = new ServiceRepository();
  const data: admin.firestore.DocumentData = await serviceRepository.findByIdElastic(
    validateParam.uid,
    'bri_corpu_ga_services'
  );

  res.json({
    message: 'Successfully Get "Pengelolaan Service Kendaran" By Id',
    data,
  });
};

export const getAllServiceElastic = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const serviceRepository = new ServiceRepository();
  const { data, totalCount } = await serviceRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string,
    'bri_corpu_ga_services'
  );

  res.json({
    message: 'Successfully Get "Pengelolaan Service Kendaran"',
    data,
    totalCount,
  });
};
