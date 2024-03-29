import { Request, Response } from 'express';
import schema from '@modules/FixedAsset/Pengadaan/PurchaseOrder/purchase_order.schema';

import PurchaseOrderRepository from '@modules/FixedAsset/Pengadaan/PurchaseOrder/purchase_order.repository';
import ProviderRepository from '@modules/MasterData/Provider/provider.repository';
import PengadaanRepository from '@modules/FixedAsset/Pengadaan/PengadaanBarang/pengadaan.repository';

import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

export const createPurchaseOrder = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const pengadaanRepository = new PengadaanRepository();
  const pengadaan = await pengadaanRepository.findById(validatedBody.pengadaan);
  let createParam = {
    ...validatedBody,
    pengadaan,
  };

  if (validatedBody?.provider) {
    const providerRepository = new ProviderRepository();
    const provider = await providerRepository.findById(validatedBody.provider);
    createParam = {
      ...createParam,
      provider,
    };
  }

  const purchaseOrder = new PurchaseOrderRepository();
  const data = await purchaseOrder.create(createParam);
  res.json({
    message: 'Successfully Create Purchase Order',
    data,
  });
};

export const updatePurchaseOrder = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'purchaseOrderId');
  const validatedBody = yupValidate(schema.update, body);

  let createParam = validatedBody;
  if (validatedBody?.provider) {
    const providerRepository = new ProviderRepository();
    const provider = await providerRepository.findById(validatedBody.provider);
    createParam = { ...createParam, provider };
  }
  if (validatedBody?.pengadaan) {
    const pengadaanRepository = new PengadaanRepository();
    const pengadaan = await pengadaanRepository.findById(
      validatedBody.pengadaan
    );
    createParam = { ...createParam, pengadaan };
  }

  const purchaseOrder = new PurchaseOrderRepository();
  const data = await purchaseOrder.update(validateParam.uid, createParam);
  res.json({
    message: 'Successfully Update Purchase Order',
    data,
  });
};

export const deletePurchaseOrderById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'purchaseOrderId');

  const purchaseOrder = new PurchaseOrderRepository();
  const data = await purchaseOrder.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Purchase Order By Id',
    data,
  });
};
export const getPurchaseOrderById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'purchaseOrderId');
  const purchaseOrder = new PurchaseOrderRepository();
  const data = await purchaseOrder.findByIdElastic(validateParam.uid);
  res.json({
    message: 'Successfully Get Purchase Order By Id',
    data,
  });
};

export const getAllPurchaseOrder = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const purchaseOrder = new PurchaseOrderRepository();
  const { data, totalCount } = await purchaseOrder.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await purchaseOrder.countDocument(filtered as string);
  res.json({
    message: 'Successfully Get Purchase Order',
    data,
    totalCount,
  });
};
