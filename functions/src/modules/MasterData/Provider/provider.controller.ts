import { Request, Response } from 'express';
import schema from '@modules/MasterData/Provider/provider.schema';

import ProviderRepository from '@modules/MasterData/Provider/provider.repository';
import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

export const createProvider = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const providerRepository = new ProviderRepository();
  const data = await providerRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create "Provider"',
    data,
  });
};

export const updateProvider = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'providerId');
  const validatedBody = yupValidate(schema.update, body);
  const providerRepository = new ProviderRepository();
  const data = await providerRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update "Provider"',
    data,
  });
};

export const getProviderById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'providerId');
  const providerRepository = new ProviderRepository();
  const data = await providerRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get "Provider" By Id',
    data,
  });
};

export const getAllProvider = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const providerRepository = new ProviderRepository();
  const data = await providerRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await providerRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get "Provider"',
    data,
    totalCount,
  });
};

export const deleteProviderById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'providerId');
  const providerRepository = new ProviderRepository();
  const data = await providerRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete "Provider" By Id',
    data,
  });
};

export const importExcel = async (req: any, res: Response) => {
  const { files } = req;

  const providerRepository = new ProviderRepository();
  const invalidRow = await providerRepository.importExcel(
    files,
    {
      B: 'name',
      D: 'address',
      E: 'pic',
      F: 'contact',
    },
    schema.create
  );

  res.json({
    message: 'Successfully Import Provider',
    invalidRow,
  });
};
