import { Request, Response } from 'express';

import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

import VendorRepository from '@modules/MasterData/Vendor/vendor.repository';

import schema from './evaluasi_atk.schema';
import EvaluasiATKRepository from './evaluasi_atk.repository';

export const createEvaluasiATK = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const evaluasiATKRepository = new EvaluasiATKRepository();
  const vendorRepository = new VendorRepository();

  const vendor: any = await vendorRepository.findById(validatedBody.vendor);
  const createParam = {
    ...validatedBody,
    vendor,
  };

  const data = await evaluasiATKRepository.create(createParam);

  res.json({
    message: 'Successfully Create EvaluasiATK',
    data,
  });
};

export const updateEvaluasiATK = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'evaluasiATKId');
  let validatedBody = yupValidate(schema.update, body);

  const evaluasiATKRepository = new EvaluasiATKRepository();
  const vendorRepository = new VendorRepository();

  if (validatedBody.vendor) {
    const vendor: any = await vendorRepository.findById(validatedBody.vendor);
    validatedBody = { ...validatedBody, vendor };
  }

  const data = await evaluasiATKRepository.update(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update EvaluasiATK',
    data,
  });
};

export const getEvaluasiATKById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'evaluasiATKId');
  const evaluasiATKRepository = new EvaluasiATKRepository();
  const data = await evaluasiATKRepository.findById(validateParam.uid);

  res.json({
    message: 'Successfully Get EvaluasiATK By Id',
    data,
  });
};

export const getAllEvaluasiATK = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const evaluasiATKRepository = new EvaluasiATKRepository();
  const data = await evaluasiATKRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await evaluasiATKRepository.countDocument(
    filtered as string
  );

  res.json({
    message: 'Successfully Get EvaluasiATK',
    data,
    totalCount,
  });
};

export const deleteEvaluasiATKById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'evaluasiATKId');
  const evaluasiATKRepository = new EvaluasiATKRepository();
  const data = await evaluasiATKRepository.delete(validateParam.uid);

  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
