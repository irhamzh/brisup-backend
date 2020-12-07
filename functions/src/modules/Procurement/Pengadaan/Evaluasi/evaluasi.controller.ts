import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './evaluasi.schema';
import EvaluasiSuplierRepository from './evaluasi.repository';

export const createEvaluasiSuplier = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const evaluasiSuplierRepository = new EvaluasiSuplierRepository();
  const data = await evaluasiSuplierRepository.createWithValidatePengadaan(
    validatedBody,
    validatedBody.provider,
    validatedBody.pengadaan
  );
  res.json({
    message: 'Successfully Create Evaluasi Suplier',
    data,
  });
};

export const updateEvaluasiSuplier = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'evaluasiSuplierId');
  const validatedBody = yupValidate(schema.update, body);

  const evaluasiSuplierRepository = new EvaluasiSuplierRepository();
  const data = await evaluasiSuplierRepository.updateWithValidatePengadaan(
    validateParam.uid,
    validatedBody,
    validatedBody?.provider || undefined,
    validatedBody?.pengadaan || undefined
  );

  res.json({
    message: 'Successfully Update Evaluasi Suplier',
    data,
  });
};

export const getEvaluasiSuplierById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'evaluasiSuplierId');
  const evaluasiSuplierRepository = new EvaluasiSuplierRepository();
  const data = await evaluasiSuplierRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Evaluasi Suplier By Id',
    data,
  });
};

export const getAllEvaluasiSuplier = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const evaluasiSuplierRepository = new EvaluasiSuplierRepository();
  const data = await evaluasiSuplierRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await evaluasiSuplierRepository.countDocument(
    filtered as string
  );

  res.json({
    message: 'Successfully Get Evaluasi Suplier',
    data,
    totalCount,
  });
};

export const deleteEvaluasiSuplierById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'evaluasiSuplierId');
  const evaluasiSuplierRepository = new EvaluasiSuplierRepository();
  const data = await evaluasiSuplierRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Evaluasi Suplier By Id',
    data,
  });
};
