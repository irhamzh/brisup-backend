import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import WorkingOrderRepository from '@modules/WorkingOrder/working_order.repository';
import CateringRepository from '@modules/MasterData/Catering/catering.repository';

import schema from './catering.schema';
import CateringClasificationRepository from './catering.repository';

export const createCateringProcurement = async (
  req: Request,
  res: Response
) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);
  const cateringClasificationRepository = new CateringClasificationRepository();
  const workingOrderRepository = new WorkingOrderRepository();
  const cateringRepository = new CateringRepository();

  const workingOrder = await workingOrderRepository.findById(
    validatedBody.workingOrder
  );
  const catering = await cateringRepository.findById(validatedBody.catering);
  const createParam = {
    ...validatedBody,
    catering,
    workingOrder,
  };

  const data = await cateringClasificationRepository.create(createParam);

  res.json({
    message: 'Successfully Create Data',
    data,
  });
};

export const updateCateringProcurement = async (
  req: Request,
  res: Response
) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'cateringClasificationId');
  let validatedBody = yupValidate(schema.update, body);

  const cateringClasificationRepository = new CateringClasificationRepository();
  const workingOrderRepository = new WorkingOrderRepository();
  const cateringRepository = new CateringRepository();

  if (validatedBody?.workingOrder) {
    const workingOrder = await workingOrderRepository.findById(
      validatedBody.workingOrder
    );
    validatedBody = { ...validatedBody, workingOrder };
  }
  if (validatedBody?.catering) {
    const catering = await cateringRepository.findById(validatedBody.catering);
    validatedBody = { ...validatedBody, catering };
  }

  const data = await cateringClasificationRepository.update(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const deleteCateringProcurementById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'cateringClasificationId');
  const cateringClasificationRepository = new CateringClasificationRepository();
  const data = await cateringClasificationRepository.delete(validateParam.uid);

  res.json({
    message: 'Successfully Delete Data By Id',
    data,
  });
};

export const getCateringProcurementById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'cateringClasificationId');
  const cateringClasificationRepository = new CateringClasificationRepository();
  const data = await cateringClasificationRepository.findById(
    validateParam.uid
  );

  res.json({
    message: 'Successfully Get Data By Id',
    data,
  });
};

export const getAllCateringProcurement = async (
  req: Request,
  res: Response
) => {
  const { page, limit, filtered, sorted } = req.query;
  const cateringClasificationRepository = new CateringClasificationRepository();
  const data = await cateringClasificationRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await cateringClasificationRepository.countDocument(
    filtered as string
  );

  res.json({
    message: 'Successfully Get Data',
    data,
    totalCount,
  });
};
