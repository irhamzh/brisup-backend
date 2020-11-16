import { Request, Response } from 'express';

import paramValidation from '@utils/paramValidation';
import AssetRepository from '@modules/FixedAsset/Asset/asset.repository';
import schema from '@modules/FixedAsset/Asset/asset.schema';

export const createAsset = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = schema.create.validateSync(body);
  const assetRepository = new AssetRepository();
  let createParam = validatedBody;
  if (!validatedBody.condition) {
    createParam.condition = 'undefined';
  }
  const data = await assetRepository.create(createParam);
  res.json({
    message: 'Successfully Create Asset',
    data,
  });
};

export const updateAsset = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'assetId');
  const validatedBody = schema.create.validateSync(body);
  const assetRepository = new AssetRepository();
  const data = await assetRepository.update(validateParam.uid, validatedBody);
  res.json({
    message: 'Successfully Update Asset',
    data,
  });
};

export const getAssetById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'assetId');
  const assetRepository = new AssetRepository();
  const data = await assetRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Asset By Id',
    data,
  });
};

export const getAllAsset = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const assetRepository = new AssetRepository();
  const data = await assetRepository.findAll(page as string, limit as string);
  res.json({
    message: 'Successfully Get Asset',
    data,
  });
};

export const deleteAssetById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'assetId');
  const assetRepository = new AssetRepository();
  const data = await assetRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};

export const deleteMultipleAsset = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = schema.deleteArrayIds.validateSync(body);
  const assetRepository = new AssetRepository();
  await assetRepository.deleteMultiple(validatedBody.assetIds);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    deletedAsset: validatedBody.assetIds,
  });
};
