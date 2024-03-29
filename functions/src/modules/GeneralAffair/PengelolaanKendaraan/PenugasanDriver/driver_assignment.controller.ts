import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import VehicleRepository from '@modules/MasterData/Vehicle/vehicle.repository';

import schema from './driver_assignment.schema';
import DriverAssignmentRepository from './driver_assignment.repository';

export const createDriverAssignment = async (req: any, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const vehicleRepository = new VehicleRepository();
  const driverAssignmentRepository = new DriverAssignmentRepository();

  const vehicle: any = await vehicleRepository.findById(validatedBody.vehicle);
  const createParam = {
    ...validatedBody,
    vehicle,
  };

  const data: admin.firestore.DocumentData = await driverAssignmentRepository.create(
    createParam
  );

  res.json({
    message: 'Successfully Create "Penugasan Driver"',
    data,
  });
};

export const updateDriverAssignment = async (req: any, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.update, body);

  const vehicleRepository = new VehicleRepository();
  const driverAssignmentRepository = new DriverAssignmentRepository();

  if (validatedBody.vehicle) {
    const vehicle: any = await vehicleRepository.findById(
      validatedBody.vehicle
    );
    validatedBody = { ...validatedBody, vehicle };
  }

  const data: admin.firestore.DocumentData = await driverAssignmentRepository.update(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update "Penugasan Driver"',
    data,
  });
};

export const deleteDriverAssignmentById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const driverAssignmentRepository = new DriverAssignmentRepository();

  const data = await driverAssignmentRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete "Penugasan Driver" By Id',
    data,
  });
};

export const getDriverAssignmentById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const driverAssignmentRepository = new DriverAssignmentRepository();
  const data: admin.firestore.DocumentData = await driverAssignmentRepository.findByIdElastic(
    validateParam.uid
  );

  res.json({
    message: 'Successfully Get "Penugasan Driver" By Id',
    data,
  });
};

export const getAllDriverAssignment = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const driverAssignmentRepository = new DriverAssignmentRepository();
  const { data, totalCount } = await driverAssignmentRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await driverAssignmentRepository.countDocument(
  //   filtered as string
  // );

  res.json({
    message: 'Successfully Get "Penugasan Driver"',
    data,
    totalCount,
  });
};
