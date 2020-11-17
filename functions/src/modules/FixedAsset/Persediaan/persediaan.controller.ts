import { Request, Response } from 'express';
import schema from './persediaan.schema';
import { formatDate } from '@utils/Date';
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
  const formatedData = { ...data, tanggal: formatDate(data.tanggal.toDate()) };
  res.json({
    message: 'Successfully Create Persediaan',
    data: formatedData,
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
  const formatedData = {
    ...data,
    tanggal: formatDate(data.tanggal.toDate()),
  };
  res.json({
    message: 'Successfully Update Persediaan',
    data: formatedData,
  });
};

export const getPersediaanById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'persediaanId');
  const persediaanRepository = new PersediaanRepository();
  const data: admin.firestore.DocumentData = await persediaanRepository.findById(
    validateParam.uid
  );
  const formatedData = {
    ...data,
    tanggal: formatDate(data.tanggal.toDate()),
  };
  res.json({
    message: 'Successfully Get Persediaan By Id',
    data: formatedData,
  });
};

export const getAllPersediaan = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const persediaanRepository = new PersediaanRepository();
  const data = await persediaanRepository.findAll(
    page as string,
    limit as string
  );
  const totalCount = await persediaanRepository.countDocument();
  const formatedData = data.map((item: admin.firestore.DocumentData) => ({
    ...item,
    tanggal: formatDate(item.tanggal.toDate()),
  }));
  res.json({
    message: 'Successfully Get Persediaan',
    data: formatedData,
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
