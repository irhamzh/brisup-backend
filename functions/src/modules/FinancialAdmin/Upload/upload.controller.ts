import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import handleFirebaseUpload from '@utils/handleFirebaseUpload';

import schema from './upload.schema';
import UploadRepository from './upload.repository';

const defaultBucket = 'images/fa-upload';

export const createUpload = async (req: any, res: Response) => {
  const { body, files } = req;
  const validatedBody = yupValidate(schema.create, body);
  if (!files?.lampiran) {
    throw new InvalidRequestError('No files were uploaded', 'lampiran');
  }
  const { filename, path, mimetype } = files.lampiran;
  const pathBucket = defaultBucket + filename;
  const lampiran = await handleFirebaseUpload(
    path,
    pathBucket,
    mimetype,
    files
  );

  const uploadRepository = new UploadRepository();
  const data = await uploadRepository.create({ ...validatedBody, lampiran });
  res.json({
    message: 'Successfully Create Upload',
    data,
  });
};

export const updateUpload = async (req: any, res: Response) => {
  const { body, params, files } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = undefined;
  validatedBody = yupValidate(schema.update, body);

  if (files?.lampiran) {
    const { filename, path, mimetype } = files.lampiran;
    const pathBucket = defaultBucket + filename;

    const lampiran = await handleFirebaseUpload(
      path,
      pathBucket,
      mimetype,
      files
    );
    validatedBody = { ...validatedBody, lampiran };
  }

  const uploadRepository = new UploadRepository();
  const data = await uploadRepository.update(validateParam.uid, validatedBody);
  res.json({
    message: 'Successfully Update Upload',
    data,
  });
};

export const getUploadById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const uploadRepository = new UploadRepository();
  const data = await uploadRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Upload By Id',
    data,
  });
};

export const getAllUpload = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const uploadRepository = new UploadRepository();
  const data = await uploadRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await uploadRepository.countDocument(filtered as string);
  res.json({
    message: 'Successfully Get All Upload',
    data,
    totalCount,
  });
};

export const deleteUploadById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const uploadRepository = new UploadRepository();
  const data = await uploadRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Upload By Id',
    data,
  });
};
