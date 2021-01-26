import { Request, Response } from 'express';

import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

import ProviderRepository from '@modules/MasterData/Provider/provider.repository';

import schema from './evaluasi_atk.schema';
import EvaluasiATKRepository from './evaluasi_atk.repository';

export const createEvaluasiATK = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const evaluasiATKRepository = new EvaluasiATKRepository();
  const providerRepository = new ProviderRepository();

  const provider: any = await providerRepository.findById(
    validatedBody.provider
  );
  const createParam = {
    ...validatedBody,
    provider,
  };

  const data = await evaluasiATKRepository.create(createParam);

  res.json({
    message: 'Successfully Create Evaluasi ATK',
    data,
  });
};

export const updateEvaluasiATK = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'evaluasiATKId');
  let validatedBody = yupValidate(schema.update, body);

  const evaluasiATKRepository = new EvaluasiATKRepository();
  const providerRepository = new ProviderRepository();

  if (validatedBody.provider) {
    const provider: any = await providerRepository.findById(
      validatedBody.provider
    );
    validatedBody = { ...validatedBody, provider };
  }

  const data = await evaluasiATKRepository.update(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Evaluasi ATK',
    data,
  });
};

export const getEvaluasiATKById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'evaluasiATKId');
  const evaluasiATKRepository = new EvaluasiATKRepository();
  const data = await evaluasiATKRepository.findById(validateParam.uid);

  res.json({
    message: 'Successfully Get Evaluasi ATK By Id',
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
    message: 'Successfully Get Evaluasi ATK',
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
    message: 'Successfully Delete Evaluasi ATK By Id',
    data,
  });
};
