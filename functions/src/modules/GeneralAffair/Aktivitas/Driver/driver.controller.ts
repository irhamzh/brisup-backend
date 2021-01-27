import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import handleFirebaseUpload from '@utils/handleFirebaseUpload';

import schema from './driver.schema';
import DriverRepository from './driver.repository';

const defaultBucket = 'images/ga-activity/driver/';

export const createDriver = async (req: any, res: Response) => {
  const { body, files } = req;
  const validatedBody = yupValidate(schema.create, body);
  if (!files.foto) {
    throw new InvalidRequestError('No files were uploaded', 'foto');
  }
  const { filename, path, mimetype } = files.foto;
  const pathBucket = defaultBucket + filename;

  const foto = await handleFirebaseUpload(path, pathBucket, mimetype, files);

  const driverRepository = new DriverRepository();

  const createParam = {
    ...validatedBody,
    foto,
  };

  const data: admin.firestore.DocumentData = await driverRepository.createDriver(
    createParam
  );

  res.json({
    message: 'Successfully Create Aktivitas Driver',
    data,
  });
};

export const updateDriver = async (req: any, res: Response) => {
  const { body, params, files } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.update, body);

  const driverRepository = new DriverRepository();

  if (files?.foto) {
    const { filename, path, mimetype } = files.foto;
    const pathBucket = defaultBucket + filename;

    const foto = await handleFirebaseUpload(path, pathBucket, mimetype, files);
    validatedBody = { ...validatedBody, foto };
  }

  const data: admin.firestore.DocumentData = await driverRepository.updateDriver(
    validateParam.uid,
    validatedBody,
    'foto'
  );

  res.json({
    message: 'Successfully Update Aktivitas Driver',
    data,
  });
};

export const deleteDriverById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const driverRepository = new DriverRepository();

  const data = await driverRepository.deleteSubDocument(
    validateParam.uid,
    'driver',
    'ga_drivers'
  );
  res.json({
    message: 'Successfully Delete Aktivitas Driver By Id',
    data,
  });
};

export const getDriverById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const driverRepository = new DriverRepository();
  const data: admin.firestore.DocumentData = await driverRepository.findSubdocumentById(
    validateParam.uid,
    'driver',
    'ga_drivers'
  );

  res.json({
    message: 'Successfully Get Driver By Id',
    data,
  });
};

export const getAllDriver = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const driverRepository = new DriverRepository();
  const data = await driverRepository.findAllSubDocument(
    page as string,
    limit as string,
    'driver',
    'ga_drivers',
    filtered as string,
    sorted as string
  );
  const totalCount = await driverRepository.countSubDocument(
    'driver',
    'ga_drivers',
    filtered as string
  );

  res.json({
    message: 'Successfully Get Driver',
    data,
    totalCount,
  });
};

export const getDriverByIdElastic = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const driverRepository = new DriverRepository();
  const data: admin.firestore.DocumentData = await driverRepository.findByIdElastic(
    validateParam.uid,
    'bri_corpu_ga_drivers'
  );

  res.json({
    message: 'Successfully Get Driver By Id',
    data,
  });
};

export const getAllDriverElastic = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const driverRepository = new DriverRepository();
  const { data, totalCount } = await driverRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string,
    'bri_corpu_ga_drivers'
  );

  res.json({
    message: 'Successfully Get Driver',
    data,
    totalCount,
  });
};
