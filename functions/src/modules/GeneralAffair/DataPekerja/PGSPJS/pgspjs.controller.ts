import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import UkerRepository from '@modules/MasterData/Uker/uker.repository';

import schema from './pgspjs.schema';
import PGSPJSRepository from './pgspjs.repository';

export const createPGSPJS = async (req: any, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const ukerRepository = new UkerRepository();
  const pgspjsRepository = new PGSPJSRepository();

  const uker: any = await ukerRepository.findById(validatedBody.uker);
  const createParam = {
    ...validatedBody,
    uker,
  };

  const data: admin.firestore.DocumentData = await pgspjsRepository.createPGSPJS(
    createParam
  );

  res.json({
    message: 'Successfully Create Aktivitas PGSPJS',
    data,
  });
};

export const updatePGSPJS = async (req: any, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.update, body);

  const ukerRepository = new UkerRepository();
  const pgspjsRepository = new PGSPJSRepository();

  if (validatedBody.uker) {
    const uker: any = await ukerRepository.findById(validatedBody.uker);
    validatedBody = { ...validatedBody, uker };
  }

  const data: admin.firestore.DocumentData = await pgspjsRepository.updatePGSPJS(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Aktivitas PGSPJS',
    data,
  });
};

export const deletePGSPJSById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const pgspjsRepository = new PGSPJSRepository();

  const data = await pgspjsRepository.deleteSubDocument(
    validateParam.uid,
    'pgspjs',
    'ga_pgspjs'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};

export const getPGSPJSById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const pgspjsRepository = new PGSPJSRepository();
  const data: admin.firestore.DocumentData = await pgspjsRepository.findSubdocumentById(
    validateParam.uid,
    'pgspjs',
    'ga_pgspjs'
  );

  res.json({
    message: 'Successfully Get PGSPJS By Id',
    data,
  });
};

export const getAllPGSPJS = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const pgspjsRepository = new PGSPJSRepository();
  const data = await pgspjsRepository.findAllSubDocument(
    page as string,
    limit as string,
    'pgspjs',
    'ga_pgspjs',
    filtered as string,
    sorted as string
  );
  const totalCount = await pgspjsRepository.countSubDocument(
    'pgspjs',
    'ga_pgspjs',
    filtered as string
  );

  res.json({
    message: 'Successfully Get PGSPJS',
    data,
    totalCount,
  });
};
