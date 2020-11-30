import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import handleFirebaseUpload from '@utils/handleFirebaseUpload';

import schema from './courier.schema';
import CourierRepository from './courier.repository';

const defaultBucket = 'images/ga-activity/courier/';

export const createCourier = async (req: any, res: Response) => {
  const { body, files } = req;
  const validatedBody = yupValidate(schema.create, body);
  if (!files.foto) {
    throw new InvalidRequestError('No files were uploaded', 'foto');
  }
  const { filename, path, mimetype } = files.foto;
  const pathBucket = defaultBucket + filename;

  const foto = await handleFirebaseUpload(path, pathBucket, mimetype, files);

  const courierRepository = new CourierRepository();

  const createParam = {
    ...validatedBody,
    foto,
  };

  const data: admin.firestore.DocumentData = await courierRepository.createCourier(
    createParam
  );

  res.json({
    message: 'Successfully Create Aktivitas Courier',
    data,
  });
};

export const updateCourier = async (req: any, res: Response) => {
  const { body, params, files } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.update, body);

  const courierRepository = new CourierRepository();

  if (files?.foto) {
    const { filename, path, mimetype } = files.foto;
    const pathBucket = defaultBucket + filename;

    const foto = await handleFirebaseUpload(path, pathBucket, mimetype, files);
    validatedBody = { ...validatedBody, foto };
  }

  const data: admin.firestore.DocumentData = await courierRepository.updateCourier(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Aktivitas Courier',
    data,
  });
};

export const deleteCourierById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const courierRepository = new CourierRepository();

  const data = await courierRepository.deleteSubDocument(
    validateParam.uid,
    'courier',
    'ga_couriers'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};

export const getCourierById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const courierRepository = new CourierRepository();
  const data: admin.firestore.DocumentData = await courierRepository.findSubdocumentById(
    validateParam.uid,
    'courier',
    'ga_couriers'
  );

  res.json({
    message: 'Successfully Get Courier By Id',
    data,
  });
};

export const getAllCourier = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const courierRepository = new CourierRepository();
  const data = await courierRepository.findAllSubDocument(
    page as string,
    limit as string,
    'courier',
    'ga_couriers',
    filtered as string,
    sorted as string
  );
  const totalCount = await courierRepository.countSubDocument(
    'courier',
    'ga_couriers',
    filtered as string
  );

  res.json({
    message: 'Successfully Get Courier',
    data,
    totalCount,
  });
};
