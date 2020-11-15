import { Request, Response } from 'express';
import schema from '@modules/Provider/provider.schema';

import ProviderRepository from '@modules/Provider/provider.repository';
import paramValidation from '@utils/paramValidation';

export const createProvider = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = schema.create.validateSync(body);
  const providerRepository = new ProviderRepository();
  const data = await providerRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Provider',
    data,
  });
};

export const updateProvider = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'providerId');
  const validatedBody = schema.create.validateSync(body);
  const providerRepository = new ProviderRepository();
  const data = await providerRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update Provider',
    data,
  });
};

export const getProviderById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'providerId');
  const providerRepository = new ProviderRepository();
  const data = await providerRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Provider By Id',
    data,
  });
};

export const getAllProvider = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const providerRepository = new ProviderRepository();
  const data = await providerRepository.findAll(
    page as string,
    limit as string
  );
  res.json({
    message: 'Successfully Get Provider',
    data,
  });
};

export const deleteProviderById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'providerId');
  const providerRepository = new ProviderRepository();
  const data = await providerRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
