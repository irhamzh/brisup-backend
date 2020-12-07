import { Request, Response } from 'express';
import schema from '@modules/WorkingOrder/working_order.schema';
// import { } from '@utils/Date';
import * as admin from 'firebase-admin';
import WorkingOrderRepository from '@modules/WorkingOrder/working_order.repository';
import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

import MappingBodyByType from './helpers/MappingBodyByType';

export const createWorkingOrder = async (req: Request, res: Response) => {
  const { body } = req;
  const masterValidate = yupValidate(schema.baseCreate, body);
  const validatedBody: any = MappingBodyByType(masterValidate.division, body);

  const workingOrderRepository = new WorkingOrderRepository();
  const data: admin.firestore.DocumentData = await workingOrderRepository.create(
    validatedBody
  );

  res.json({
    message: 'Successfully Create WorkingOrder',
    data,
  });
};

export const updateWorkingOrder = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'workingOrderId');
  const workingOrderRepository = new WorkingOrderRepository();
  const ref: admin.firestore.DocumentData = await workingOrderRepository.findById(
    validateParam.uid
  );

  const validatedBody: any = MappingBodyByType(ref?.division, body, 'update');

  const data: admin.firestore.DocumentData = await workingOrderRepository.update(
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
  const data: admin.firestore.DocumentData = await workingOrderRepository.findById(
    validateParam.uid
  );

  res.json({
    message: 'Successfully Get WorkingOrder By Id',
    data,
  });
};

export const getAllWorkingOrder = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const workingOrderRepository = new WorkingOrderRepository();
  const data = await workingOrderRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await workingOrderRepository.countDocument(
    filtered as string
  );

  res.json({
    message: 'Successfully Get WorkingOrder',
    data,
    totalCount,
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
