import { Request, Response } from 'express';

import paramValidation from '@utils/paramValidation';
import PersekotRepository from '@modules/FixedAsset/Persekot/persekot.repository';
import schema from '@modules/FixedAsset/Persekot/persekot.schema';

export const createPersekot = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = schema.create.validateSync(body);
  const persekotRepository = new PersekotRepository();
  const data = await persekotRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Persekot',
    data,
  });
};

export const updatePersekot = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'persekotId');
  const validatedBody = schema.create.validateSync(body);
  const persekotRepository = new PersekotRepository();
  const data = await persekotRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update Persekot',
    data,
  });
};

export const getPersekotById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'persekotId');
  const persekotRepository = new PersekotRepository();
  const data = await persekotRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get PersekotBy Id',
    data,
  });
};

export const getAllPersekot = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const persekotRepository = new PersekotRepository();
  const data = await persekotRepository.findAll(
    page as string,
    limit as string
  );
  res.json({
    message: 'Successfully Get Persekot',
    data,
  });
};

export const deletePersekotById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'persekotId');
  const persekotRepository = new PersekotRepository();
  const data = await persekotRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};

export const deleteMultiplePersekot = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = schema.deleteArrayIds.validateSync(body);
  const persekotRepository = new PersekotRepository();
  await persekotRepository.deleteMultiple(validatedBody.persekotIds);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    deletedPersekot: validatedBody.persekotIds,
  });
};
