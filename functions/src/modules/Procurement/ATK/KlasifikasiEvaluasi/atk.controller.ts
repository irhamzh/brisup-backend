import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import WorkingOrderRepository from '@modules/WorkingOrder/working_order.repository';
import ProviderRepository from '@modules/MasterData/Provider/provider.repository';

import schema from './atk.schema';
import ATKClasificationRepository from './atk.repository';

export const createATKProcurement = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const atkClasificationRepository = new ATKClasificationRepository();
  const workingOrderRepository = new WorkingOrderRepository();
  const providerRepository = new ProviderRepository();

  const workingOrder: any = await workingOrderRepository.findById(
    validatedBody.workingOrder
  );
  const provider: any = await providerRepository.findById(
    validatedBody.provider
  );
  const createParam = {
    ...validatedBody,
    provider,
    workingOrder,
  };

  const data = await atkClasificationRepository.create(createParam);

  res.json({
    message: 'Successfully Create Data',
    data,
  });
};

export const updateATKProcurement = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'atkClasificationId');
  let validatedBody = yupValidate(schema.update, body);

  const atkClasificationRepository = new ATKClasificationRepository();
  const workingOrderRepository = new WorkingOrderRepository();
  const providerRepository = new ProviderRepository();

  if (validatedBody.workingOrder) {
    const workingOrder: any = await workingOrderRepository.findById(
      validatedBody.workingOrder
    );
    validatedBody = { ...validatedBody, workingOrder };
  }
  if (validatedBody.provider) {
    const provider: any = await providerRepository.findById(
      validatedBody.provider
    );
    validatedBody = { ...validatedBody, provider };
  }

  const data = await atkClasificationRepository.update(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const deleteATKProcurementById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'atkClasificationId');
  const atkClasificationRepository = new ATKClasificationRepository();
  const data = await atkClasificationRepository.delete(validateParam.uid);

  res.json({
    message: 'Successfully Delete Data By Id',
    data,
  });
};

export const getATKProcurementById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'atkClasificationId');
  const atkClasificationRepository = new ATKClasificationRepository();
  const data = await atkClasificationRepository.findById(validateParam.uid);

  res.json({
    message: 'Successfully Get Data By Id',
    data,
  });
};

export const getAllATKProcurement = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const atkClasificationRepository = new ATKClasificationRepository();
  const data = await atkClasificationRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await atkClasificationRepository.countDocument(
    filtered as string
  );

  res.json({
    message: 'Successfully Get Data',
    data,
    totalCount,
  });
};
