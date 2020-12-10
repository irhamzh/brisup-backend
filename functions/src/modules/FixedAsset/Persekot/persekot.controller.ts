import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import schema from '@modules/FixedAsset/Persekot/persekot.schema';
import PersekotRepository from '@modules/FixedAsset/Persekot/persekot.repository';

import MappingBodyByType from './helpers/MappingBodyByType';

export const createPersekot = async (req: Request, res: Response) => {
  const { body } = req;
  const masterValidate = yupValidate(schema.baseCreate, body);
  const validatedBody = MappingBodyByType(masterValidate.division, body);

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
  const persekotRepository = new PersekotRepository();
  const ref = await persekotRepository.findById(validateParam.uid);
  const validatedBody = MappingBodyByType(ref?.division, body, 'update');

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
  const { page, limit, filtered, sorted } = req.query;
  const persekotRepository = new PersekotRepository();
  const data = await persekotRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await persekotRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get Persekot',
    data,
    totalCount,
  });
};

export const deletePersekotById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'persekotId');
  const persekotRepository = new PersekotRepository();
  const data = await persekotRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Persekot By Id',
    data,
  });
};

export const deleteMultiplePersekot = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.deleteArrayIds, body);

  const persekotRepository = new PersekotRepository();
  await persekotRepository.deleteMultiple(validatedBody.persekotIds);
  res.json({
    message: 'Successfully Delete Multiple Persekot',
    deletedPersekot: validatedBody.persekotIds,
  });
};
