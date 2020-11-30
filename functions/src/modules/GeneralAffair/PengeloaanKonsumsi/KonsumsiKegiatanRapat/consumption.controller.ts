import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import WorkingOrderRepository from '@modules/FixedAsset/Pengadaan/WorkingOrder/working_order.repository';
import CateringRepository from '@modules/MasterData/Catering/catering.repository';
import schema from './consumption.schema';
import ConsumptionRepository from './consumption.repository';

export const createConsumption = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);
  const consumptionRepository = new ConsumptionRepository();
  const workingOrderRepository = new WorkingOrderRepository();
  const cateringRepository = new CateringRepository();

  const workingOrder: any = await workingOrderRepository.findById(
    validatedBody.workingOrder
  );
  const catering: any = await cateringRepository.findById(
    validatedBody.catering
  );
  const createParam = {
    ...validatedBody,
    catering,
    workingOrder,
  };

  const data = await consumptionRepository.create(createParam);

  res.json({
    message: 'Successfully Create Consumption',
    data,
  });
};

export const updateConsumption = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'cateringClasificationId');
  let validatedBody = yupValidate(schema.update, body);

  const consumptionRepository = new ConsumptionRepository();
  const workingOrderRepository = new WorkingOrderRepository();
  const cateringRepository = new CateringRepository();

  if (validatedBody.workingOrder) {
    const workingOrder: any = await workingOrderRepository.findById(
      validatedBody.workingOrder
    );
    validatedBody = { ...validatedBody, workingOrder };
  }
  if (validatedBody.catering) {
    const catering: any = await cateringRepository.findById(
      validatedBody.catering
    );
    validatedBody = { ...validatedBody, catering };
  }

  const data = await consumptionRepository.update(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Consumption',
    data,
  });
};

export const getConsumptionById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'cateringClasificationId');
  const consumptionRepository = new ConsumptionRepository();
  const data = await consumptionRepository.findById(validateParam.uid);

  res.json({
    message: 'Successfully Get Consumption By Id',
    data,
  });
};

export const getAllConsumption = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const consumptionRepository = new ConsumptionRepository();
  const data = await consumptionRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await consumptionRepository.countDocument(
    filtered as string
  );

  res.json({
    message: 'Successfully Get Consumption',
    data,
    totalCount,
  });
};

export const deleteConsumptionById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'cateringClasificationId');
  const consumptionRepository = new ConsumptionRepository();
  const data = await consumptionRepository.delete(validateParam.uid);

  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
