import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import handleFirebaseUpload from '@utils/handleFirebaseUpload';

import schema from './cash.schema';
import CashRepository from './cash.repository';

const defaultBucket = 'images/fa-cash/';

export const createCash = async (req: any, res: Response) => {
  const { arrayFiles, body } = req;
  const validatedBody = yupValidate(schema.create, body);
  if (!arrayFiles?.lampiran || arrayFiles?.lampiran?.length < 1) {
    throw new InvalidRequestError('No files were uploaded', 'lampiran');
  }

  let lampiran = [];
  for (const key of arrayFiles.lampiran) {
    const { filename, path, mimetype, fieldname } = key;
    const pathBucket = defaultBucket + filename;
    const upload = await handleFirebaseUpload(path, pathBucket, mimetype, {
      [fieldname]: key,
    });
    lampiran.push(upload);
  }
  const cashRepository = new CashRepository();
  const createParam = {
    ...validatedBody,
    lampiran,
  };

  const data = await cashRepository.create(createParam);

  res.json({
    message: 'Successfully Create Aktivitas Cash',
    data,
  });
};

export const updateCash = async (req: any, res: Response) => {
  const { body, params, arrayFiles } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = undefined;
  validatedBody = yupValidate(schema.update, body);
  const cashRepository = new CashRepository();

  if (arrayFiles?.lampiran && arrayFiles?.lampiran?.length > 0) {
    let lampiran = [];
    for (const key of arrayFiles.lampiran) {
      const { filename, path, mimetype, fieldname } = key;
      const pathBucket = defaultBucket + filename;
      const upload = await handleFirebaseUpload(path, pathBucket, mimetype, {
        [fieldname]: key,
      });
      lampiran.push(upload);
    }
    validatedBody = { ...validatedBody, lampiran };
  }
  const data: admin.firestore.DocumentData = await cashRepository.update(
    validateParam.uid,
    validatedBody,
    'lampiran'
  );
  res.json({
    message: 'Successfully Update Aktivitas Cash',
    data,
  });
};

export const deleteCashById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const cashRepository = new CashRepository();

  const data = await cashRepository.delete(validateParam.uid, 'lampiran');
  res.json({
    message: 'Successfully Delete Cash By Id',
    data,
  });
};

export const getCashById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const cashRepository = new CashRepository();
  const data: admin.firestore.DocumentData = await cashRepository.findByIdElastic(
    validateParam.uid
  );
  res.json({
    message: 'Successfully Get Cash By Id',
    data,
  });
};

export const getAllCash = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const cashRepository = new CashRepository();
  const { data, totalCount } = await cashRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await cashRepository.countDocument(filtered as string);
  res.json({
    message: 'Successfully Get Cash',
    data,
    totalCount,
  });
};
