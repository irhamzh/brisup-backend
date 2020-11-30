import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './rekreasi.schema';
import RekreasiRepository from './rekreasi.repository';

export const createRekreasi = async (req: any, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);
  const recreationRepository = new RekreasiRepository();

  const data: admin.firestore.DocumentData = await recreationRepository.createRekreasi(
    validatedBody
  );

  res.json({
    message: 'Successfully Create Aktivitas Rekreasi',
    data,
  });
};

export const updateRekreasi = async (req: any, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  const validatedBody = yupValidate(schema.update, body);

  const recreationRepository = new RekreasiRepository();

  const data: admin.firestore.DocumentData = await recreationRepository.updateRekreasi(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Aktivitas Rekreasi',
    data,
  });
};

export const deleteRekreasiById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const recreationRepository = new RekreasiRepository();

  const data = await recreationRepository.deleteSubDocument(
    validateParam.uid,
    'recreation',
    'ga-recreations'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};

export const getRekreasiById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const recreationRepository = new RekreasiRepository();
  const data: admin.firestore.DocumentData = await recreationRepository.findSubdocumentById(
    validateParam.uid,
    'recreation',
    'ga-recreations'
  );

  res.json({
    message: 'Successfully Get Rekreasi By Id',
    data,
  });
};

export const getAllRekreasi = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const recreationRepository = new RekreasiRepository();
  const data = await recreationRepository.findAllSubDocument(
    page as string,
    limit as string,
    'recreation',
    'ga-recreations',
    filtered as string,
    sorted as string
  );
  const totalCount = await recreationRepository.countSubDocument(
    'recreation',
    'ga-recreations',
    filtered as string
  );

  res.json({
    message: 'Successfully Get Rekreasi',
    data,
    totalCount,
  });
};
