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
    message: 'Successfully Create "Kegiatan Rekreasi"',
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
    message: 'Successfully Update "Kegiatan Rekreasi"',
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
    'ga_recreations'
  );
  res.json({
    message: 'Successfully Delete "Kegiatan Rekreasi" By Id',
    data,
  });
};

export const getRekreasiById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const recreationRepository = new RekreasiRepository();
  const data: admin.firestore.DocumentData = await recreationRepository.findByIdElastic(
    validateParam.uid,
    'bri_corpu_ga_recreations'
  );

  res.json({
    message: 'Successfully Get "Kegiatan Rekreasi" By Id',
    data,
  });
};

export const getAllRekreasi = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const recreationRepository = new RekreasiRepository();
  const { data, totalCount } = await recreationRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string,
    'bri_corpu_ga_recreations'
  );

  res.json({
    message: 'Successfully Get "Kegiatan Rekreasi"',
    data,
    totalCount,
  });
};
