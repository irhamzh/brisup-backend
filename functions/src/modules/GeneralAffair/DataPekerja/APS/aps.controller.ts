import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import UkerRepository from '@modules/MasterData/Uker/uker.repository';

import schema from './aps.schema';
import APSRepository from './aps.repository';

export const createAPS = async (req: any, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const ukerRepository = new UkerRepository();
  const apsRepository = new APSRepository();

  const uker: any = await ukerRepository.findById(validatedBody.uker);
  const createParam = {
    ...validatedBody,
    uker,
  };

  const data: admin.firestore.DocumentData = await apsRepository.createAPS(
    createParam
  );

  res.json({
    message: 'Successfully Create Aktivitas APS',
    data,
  });
};

export const updateAPS = async (req: any, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.update, body);

  const ukerRepository = new UkerRepository();
  const apsRepository = new APSRepository();

  if (validatedBody.uker) {
    const uker: any = await ukerRepository.findById(validatedBody.uker);
    validatedBody = { ...validatedBody, uker };
  }

  const data: admin.firestore.DocumentData = await apsRepository.updateAPS(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Aktivitas APS',
    data,
  });
};

export const deleteAPSById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const apsRepository = new APSRepository();

  const data = await apsRepository.deleteSubDocument(
    validateParam.uid,
    'aps',
    'ga_aps'
  );
  res.json({
    message: 'Successfully Delete Aktivitas APS By Id',
    data,
  });
};

export const getAPSById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const apsRepository = new APSRepository();
  const data: admin.firestore.DocumentData = await apsRepository.findSubdocumentById(
    validateParam.uid,
    'aps',
    'ga_aps'
  );

  res.json({
    message: 'Successfully Get APS By Id',
    data,
  });
};

export const getAllAPS = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const apsRepository = new APSRepository();
  const data = await apsRepository.findAllSubDocument(
    page as string,
    limit as string,
    'aps',
    'ga_aps',
    filtered as string,
    sorted as string
  );
  const totalCount = await apsRepository.countSubDocument(
    'aps',
    'ga_aps',
    filtered as string
  );

  res.json({
    message: 'Successfully Get APS',
    data,
    totalCount,
  });
};
