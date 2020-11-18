import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import paramValidation from '@utils/paramValidation';
import PersekotRepository from '@modules/FixedAsset/Persekot/persekot.repository';
import schema from '@modules/FixedAsset/Persekot/persekot.schema';
import yupValidate from '@utils/yupValidate';

export const createPersekot = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const persekotRepository = new PersekotRepository();
  const data: admin.firestore.DocumentData = await persekotRepository.create(
    validatedBody
  );
  const formatedData = { ...data, date: data.date.toDate() };

  res.json({
    message: 'Successfully Create Persekot',
    data: formatedData,
  });
};

export const updatePersekot = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'persekotId');
  const validatedBody = yupValidate(schema.update, body);
  const persekotRepository = new PersekotRepository();
  const data: admin.firestore.DocumentData = await persekotRepository.update(
    validateParam.uid,
    validatedBody
  );
  const formatedData = { ...data, date: data.date.toDate() };
  res.json({
    message: 'Successfully Update Persekot',
    data: formatedData,
  });
};

export const getPersekotById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'persekotId');
  const persekotRepository = new PersekotRepository();
  const data: admin.firestore.DocumentData = await persekotRepository.findById(
    validateParam.uid
  );
  const formatedData = { ...data, date: data.date.toDate() };
  res.json({
    message: 'Successfully Get PersekotBy Id',
    data: formatedData,
  });
};

export const getAllPersekot = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const persekotRepository = new PersekotRepository();
  const data = await persekotRepository.findAll(
    page as string,
    limit as string
  );
  const totalCount = await persekotRepository.countDocument();
  const formatedData = data.map((item: admin.firestore.DocumentData) => ({
    ...item,
    date: item.date.toDate(),
  }));
  res.json({
    message: 'Successfully Get Persekot',
    data: formatedData,
    panjang: formatedData.length || 0,
    totalCount,
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
  const validatedBody = yupValidate(schema.deleteArrayIds, body);

  const persekotRepository = new PersekotRepository();
  await persekotRepository.deleteMultiple(validatedBody.persekotIds);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    deletedPersekot: validatedBody.persekotIds,
  });
};
