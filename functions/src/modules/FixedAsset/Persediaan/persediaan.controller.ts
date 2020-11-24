import { Request, Response } from 'express';
import schema from './persediaan.schema';
// import { } from '@utils/Date';
import * as admin from 'firebase-admin';
import PersediaanRepository from './persediaan.repository';
import JenisBarangRepository from '@modules/JenisBarang/jenis_barang.repository';
import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

export const createPersediaan = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const persediaanRepository = new PersediaanRepository();
  const jenisBarangRepository = new JenisBarangRepository();
  const jenisBarang: any = await jenisBarangRepository.findById(
    validatedBody.jenisBarang
  );
  const createParam = {
    ...validatedBody,
    jenisBarang,
  };
  const data: admin.firestore.DocumentData = await persediaanRepository.create(
    createParam
  );
  res.json({
    message: 'Successfully Create Persediaan',
    data,
  });
};

export const updatePersediaan = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'persediaanId');
  const validatedBody = yupValidate(schema.update, body);

  let createParam: any = validatedBody;

  if (validatedBody.jenisBarang) {
    const jenisBarangRepository = new JenisBarangRepository();
    const jenisBarang: any = await jenisBarangRepository.findById(
      validatedBody.jenisBarang
    );
    createParam = { ...validatedBody, jenisBarang };
  }

  const persediaanRepository = new PersediaanRepository();
  const data: admin.firestore.DocumentData = await persediaanRepository.update(
    validateParam.uid,
    createParam
  );

  res.json({
    message: 'Successfully Update Persediaan',
    data,
  });
};

export const getPersediaanById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'persediaanId');
  const persediaanRepository = new PersediaanRepository();
  const data: admin.firestore.DocumentData = await persediaanRepository.findById(
    validateParam.uid
  );

  res.json({
    message: 'Successfully Get Persediaan By Id',
    data,
  });
};

export const getAllPersediaan = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const persediaanRepository = new PersediaanRepository();
  const data = await persediaanRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await persediaanRepository.countDocument(
    filtered as string
  );

  res.json({
    message: 'Successfully Get Persediaan',
    data,
    totalCount,
  });
};

export const deletePersediaanById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'persediaanId');
  const persediaanRepository = new PersediaanRepository();
  const data = await persediaanRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
