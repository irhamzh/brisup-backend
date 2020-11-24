import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import WorkingOrderRepository from '@modules/FixedAsset/Pengadaan/WorkingOrder/working_order.repository';
import CateringRepository from '@modules/MasterData/Catering/catering.repository';

import schema from './klasifikasi_catering.schema';
import CateringClasificationRepository from './klasifikasi_catering.repository';

export const createCateringClasification = async (
  req: Request,
  res: Response
) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);
  const cateringClasificationRepository = new CateringClasificationRepository();
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

  const data = await cateringClasificationRepository.create(createParam);

  res.json({
    message: 'Successfully Create CateringClasification',
    data,
  });
};

export const updateCateringClasification = async (
  req: Request,
  res: Response
) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'cateringClasificationId');
  let validatedBody = yupValidate(schema.update, body);

  const cateringClasificationRepository = new CateringClasificationRepository();
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

  const data = await cateringClasificationRepository.update(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update CateringClasification',
    data,
  });
};

export const getCateringClasificationById = async (
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
    message: 'Successfully Get CateringClasification By Id',
    data,
  });
};

export const getAllCateringClasification = async (
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
    message: 'Successfully Get CateringClasification',
    data,
    totalCount,
  });
};

export const deleteCateringClasificationById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'cateringClasificationId');
  const cateringClasificationRepository = new CateringClasificationRepository();
  const data = await cateringClasificationRepository.delete(validateParam.uid);

  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
