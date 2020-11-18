import { Request, Response } from 'express';
import schema from '@modules/FixedAsset/Pengadaan/PurchaseOrder/purchase_order.schema';

import PurchaseOrderRepository from '@modules/FixedAsset/Pengadaan/PurchaseOrder/purchase_order.repository';
import ProviderRepository from '@modules/Provider/provider.repository';
import PengadaanRepository from '@modules/FixedAsset/Pengadaan/PengadaanBarang/pengadaan.repository';

import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

export const createPurchaseOrder = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const purchaseOrder = new PurchaseOrderRepository();
  const providerRepository = new ProviderRepository();
  const provider: any = await providerRepository.findById(
    validatedBody.provider
  );
  const pengadaanRepository = new PengadaanRepository();
  const pengadaan: any = await pengadaanRepository.findById(
    validatedBody.pengadaan
  );
  const createParam = {
    ...validatedBody,
    provider,
    pengadaan,
  };

  const data = await purchaseOrder.create(createParam);
  res.json({
    message: 'Successfully Create PurchaseOrder',
    data,
  });
};

export const updatePurchaseOrder = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'purchaseOrderId');
  const validatedBody = yupValidate(schema.update, body);

  let createParam: any = validatedBody;
  // delete createParam.provider;
  if (validatedBody.provider) {
    const providerRepository = new ProviderRepository();
    const provider: any = await providerRepository.findById(
      validatedBody.provider
    );
    createParam = { ...createParam, provider };
  }
  if (validatedBody.pengadaan) {
    const pengadaanRepository = new PengadaanRepository();
    const pengadaan: any = await pengadaanRepository.findById(
      validatedBody.pengadaan
    );
    createParam = { ...createParam, pengadaan };
  }

  const purchaseOrder = new PurchaseOrderRepository();
  const data = await purchaseOrder.update(validateParam.uid, createParam);
  res.json({
    message: 'Successfully Update PurchaseOrder',
    data,
  });
};

export const getPurchaseOrderById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'purchaseOrderId');
  const purchaseOrder = new PurchaseOrderRepository();
  const data = await purchaseOrder.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get PurchaseOrder By Id',
    data,
  });
};

export const getAllPurchaseOrder = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const purchaseOrder = new PurchaseOrderRepository();
  const data = await purchaseOrder.findAll(page as string, limit as string);
  const totalCount = await purchaseOrder.countDocument();
  res.json({
    message: 'Successfully Get PurchaseOrder',
    data,
    totalCount,
  });
};

export const deletePurchaseOrderById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'purchaseOrderId');
  const purchaseOrder = new PurchaseOrderRepository();
  const data = await purchaseOrder.delete(validateParam.uid);
  res.json({
    message: 'Successfully Get Delete By Id',
    data,
  });
};
