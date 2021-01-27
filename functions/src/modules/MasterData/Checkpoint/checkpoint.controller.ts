import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './checkpoint.schema';
import CheckpointRepository from './checkpoint.repository';

export const createCheckpoint = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const checkpointRepository = new CheckpointRepository();
  const data = await checkpointRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Checkpoint',
    data,
  });
};

export const updateCheckpoint = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'checkpointId');
  const validatedBody = yupValidate(schema.create, body);

  const checkpointRepository = new CheckpointRepository();
  const data = await checkpointRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update Checkpoint',
    data,
  });
};

export const getCheckpointById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'checkpointId');
  const checkpointRepository = new CheckpointRepository();
  const data = await checkpointRepository.findByIdElastic(validateParam.uid);
  res.json({
    message: 'Successfully Get Checkpoint By Id',
    data,
  });
};

export const getAllCheckpoint = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const checkpointRepository = new CheckpointRepository();
  const { data, totalCount } = await checkpointRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await checkpointRepository.countDocument(
  //   filtered as string
  // );

  res.json({
    message: 'Successfully Get Checkpoint',
    data,
    totalCount,
  });
};

export const deleteCheckpointById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'checkpointId');
  const checkpointRepository = new CheckpointRepository();
  const data = await checkpointRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Checkpoint By Id',
    data,
  });
};
