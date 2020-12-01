import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import UkerRepository from '@modules/MasterData/Uker/uker.repository';

import schema from './pgppjs.schema';
import PGPPJSRepository from './pgppjs.repository';

export const createPGPPJS = async (req: any, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const ukerRepository = new UkerRepository();
  const pgppjsRepository = new PGPPJSRepository();

  const uker: any = await ukerRepository.findById(validatedBody.uker);
  const createParam = {
    ...validatedBody,
    uker,
  };

  const data: admin.firestore.DocumentData = await pgppjsRepository.createPGPPJS(
    createParam
  );

  res.json({
    message: 'Successfully Create Aktivitas PGPPJS',
    data,
  });
};

export const updatePGPPJS = async (req: any, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.update, body);

  const ukerRepository = new UkerRepository();
  const pgppjsRepository = new PGPPJSRepository();

  if (validatedBody.uker) {
    const uker: any = await ukerRepository.findById(validatedBody.uker);
    validatedBody = { ...validatedBody, uker };
  }

  const data: admin.firestore.DocumentData = await pgppjsRepository.updatePGPPJS(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Aktivitas PGPPJS',
    data,
  });
};

export const deletePGPPJSById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const pgppjsRepository = new PGPPJSRepository();

  const data = await pgppjsRepository.deleteSubDocument(
    validateParam.uid,
    'pgppjs',
    'ga_pgppjs'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};

export const getPGPPJSById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const pgppjsRepository = new PGPPJSRepository();
  const data: admin.firestore.DocumentData = await pgppjsRepository.findSubdocumentById(
    validateParam.uid,
    'pgppjs',
    'ga_pgppjs'
  );

  res.json({
    message: 'Successfully Get PGPPJS By Id',
    data,
  });
};

export const getAllPGPPJS = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const pgppjsRepository = new PGPPJSRepository();
  const data = await pgppjsRepository.findAllSubDocument(
    page as string,
    limit as string,
    'pgppjs',
    'ga_pgppjs',
    filtered as string,
    sorted as string
  );
  const totalCount = await pgppjsRepository.countSubDocument(
    'pgppjs',
    'ga_pgppjs',
    filtered as string
  );

  res.json({
    message: 'Successfully Get PGPPJS',
    data,
    totalCount,
  });
};
