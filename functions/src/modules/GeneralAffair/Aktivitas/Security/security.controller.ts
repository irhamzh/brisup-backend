import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import handleFirebaseUpload from '@utils/handleFirebaseUpload';
// import validationWording from '@constants/validationWording';
import CheckpointRepository from '@modules/MasterData/Checkpoint/checkpoint.repository';

import schema from './security.schema';
import SecurityRepository from './security.repository';

const defaultBucket = 'images/ga-activity/security/';

export const createSecurity = async (req: any, res: Response) => {
  const { body, files } = req;
  const validatedBody = yupValidate(schema.create, body);
  if (!files.foto) {
    throw new InvalidRequestError('No files were uploaded', 'foto');
  }
  const { filename, path, mimetype } = files.foto;
  const pathBucket = defaultBucket + filename;

  const foto = await handleFirebaseUpload(path, pathBucket, mimetype, files);

  const checkpointRepository = new CheckpointRepository();
  const securityRepository = new SecurityRepository();

  const checkpoint: any = await checkpointRepository.findById(
    validatedBody.checkpoint
  );
  const createParam = {
    ...validatedBody,
    checkpoint,
    foto,
  };

  const data: admin.firestore.DocumentData = await securityRepository.createSecurity(
    createParam
  );

  res.json({
    message: 'Successfully Create Aktivitas Security',
    data,
  });
};

export const updateSecurity = async (req: any, res: Response) => {
  const { body, params, files } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.update, body);

  const checkpointRepository = new CheckpointRepository();
  const securityRepository = new SecurityRepository();

  if (validatedBody.checkpoint) {
    const checkpoint: any = await checkpointRepository.findById(
      validatedBody.checkpoint
    );
    validatedBody = { ...validatedBody, checkpoint };
  }
  if (files?.foto) {
    const { filename, path, mimetype } = files.foto;
    const pathBucket = defaultBucket + filename;

    const foto = await handleFirebaseUpload(path, pathBucket, mimetype, files);
    validatedBody = { ...validatedBody, foto };
  }

  const data: admin.firestore.DocumentData = await securityRepository.updateSecurity(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Aktivitas Security',
    data,
  });
};

export const deleteSecurityById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const securityRepository = new SecurityRepository();

  const data = await securityRepository.deleteSubDocument(
    validateParam.uid,
    'security',
    'ga-securities'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};

export const getSecurityById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const securityRepository = new SecurityRepository();
  const data: admin.firestore.DocumentData = await securityRepository.findSubdocumentById(
    validateParam.uid,
    'security',
    'ga-securities'
  );

  res.json({
    message: 'Successfully Get Security By Id',
    data,
  });
};

export const getAllSecurity = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const securityRepository = new SecurityRepository();
  const data = await securityRepository.findAllSubDocument(
    page as string,
    limit as string,
    'security',
    'ga-securities',
    filtered as string,
    sorted as string
  );
  const totalCount = await securityRepository.countSubDocument(
    'security',
    'ga-securities',
    filtered as string
  );

  res.json({
    message: 'Successfully Get Security',
    data,
    totalCount,
  });
};
