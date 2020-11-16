import { Request, Response } from 'express';
import schema from '@modules/FixedAsset/Pengadaan/WorkingOrder/working_order.schema';

import WorkingOrderRepository from '@modules/FixedAsset/Pengadaan/WorkingOrder/working_order.repository';
import paramValidation from '@utils/paramValidation';

export const createWorkingOrder = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = schema.create.validateSync(body);
  const workingOrderRepository = new WorkingOrderRepository();
  const data = await workingOrderRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create WorkingOrder',
    data,
  });
};

export const updateWorkingOrder = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'workingOrderId');
  const validatedBody = schema.create.validateSync(body);
  const workingOrderRepository = new WorkingOrderRepository();
  const data = await workingOrderRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update WorkingOrder',
    data,
  });
};

export const getWorkingOrderById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'workingOrderId');
  const workingOrderRepository = new WorkingOrderRepository();
  const data = await workingOrderRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get WorkingOrder By Id',
    data,
  });
};

export const getAllWorkingOrder = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const workingOrderRepository = new WorkingOrderRepository();
  const data = await workingOrderRepository.findAll(
    page as string,
    limit as string
  );
  res.json({
    message: 'Successfully Get WorkingOrder',
    data,
  });
};

export const deleteWorkingOrderById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'workingOrderId');
  const workingOrderRepository = new WorkingOrderRepository();
  const data = await workingOrderRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
