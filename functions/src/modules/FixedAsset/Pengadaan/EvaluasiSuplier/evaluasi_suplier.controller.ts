import { Request, Response } from 'express';
import schema from '@modules/FixedAsset/Pengadaan/EvaluasiSuplier/evaluasi_suplier.schema';

import EvaluasiSuplierRepository from '@modules/FixedAsset/Pengadaan/EvaluasiSuplier/evaluasi_suplier.repository';
import ProviderRepository from '@modules/Provider/provider.repository';

import paramValidation from '@utils/paramValidation';

export const createEvaluasiSuplier = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = schema.create.validateSync(body);
  const evaluasiSuplierRepository = new EvaluasiSuplierRepository();
  const providerRepository = new ProviderRepository();
  const provider: any = await providerRepository.findById(
    validatedBody.provider
  );
  const createParam = {
    ...validatedBody,
    provider,
  };

  const data = await evaluasiSuplierRepository.create(createParam);
  res.json({
    message: 'Successfully Create EvaluasiSuplier',
    data,
  });
};

export const updateEvaluasiSuplier = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'evaluasiSuplierId');
  const validatedBody = schema.create.validateSync(body);
  let createParam: any = validatedBody;
  // delete createParam.provider;
  if (validatedBody.provider) {
    const providerRepository = new ProviderRepository();
    const provider: any = await providerRepository.findById(
      validatedBody.provider
    );
    createParam = { ...validatedBody, provider };
  }

  const evaluasiSuplierRepository = new EvaluasiSuplierRepository();
  const data = await evaluasiSuplierRepository.update(
    validateParam.uid,
    createParam
  );
  res.json({
    message: 'Successfully Update EvaluasiSuplier',
    data,
  });
};

export const getEvaluasiSuplierById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'evaluasiSuplierId');
  const evaluasiSuplierRepository = new EvaluasiSuplierRepository();
  const data = await evaluasiSuplierRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get EvaluasiSuplier By Id',
    data,
  });
};

export const getAllEvaluasiSuplier = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const evaluasiSuplierRepository = new EvaluasiSuplierRepository();
  const data = await evaluasiSuplierRepository.findAll(
    page as string,
    limit as string
  );
  res.json({
    message: 'Successfully Get EvaluasiSuplier',
    data,
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
    message: 'Successfully Get Delete By Id',
    data,
  });
};
