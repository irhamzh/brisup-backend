import { Request, Response } from 'express';

import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

import schema from './purchase_order.schema';
import PurchaseOrderRepository from './purchase_order.repository';

export const createPurchaseOrder = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);
  const purchaseOrder = new PurchaseOrderRepository();
  const data = await purchaseOrder.createWithValidatePengadaan(
    validatedBody,
    validatedBody.provider,
    validatedBody.pengadaan
  );
  res.json({
    message: 'Successfully Create Purchase Order',
    data,
  });
};

export const updatePurchaseOrder = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'purchaseOrderId');
  const validatedBody = yupValidate(schema.update, body);
  const purchaseOrder = new PurchaseOrderRepository();
  const data = await purchaseOrder.updateWithValidatePengadaan(
    validateParam.uid,
    validatedBody,
    validatedBody?.provider || undefined,
    validatedBody?.pengadaan || undefined
  );
  res.json({
    message: 'Successfully Update Purchase Order',
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
  const { page, limit, filtered, sorted } = req.query;
  const purchaseOrder = new PurchaseOrderRepository();
  const data = await purchaseOrder.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await purchaseOrder.countDocument(filtered as string);
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
    message: 'Successfully Delete PurchaseOrder By Id',
    data,
  });
};
