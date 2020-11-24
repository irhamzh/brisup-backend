import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import WorkingOrderRepository from '@modules/FixedAsset/Pengadaan/WorkingOrder/working_order.repository';
import VendorRepository from '@modules/MasterData/Vendor/vendor.repository';

import schema from './klasifikasi_atk.schema';
import ATKClasificationRepository from './klasifikasi_atk.repository';

export const createATKClasification = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const atkClasificationRepository = new ATKClasificationRepository();
  const workingOrderRepository = new WorkingOrderRepository();
  const vendorRepository = new VendorRepository();

  const workingOrder: any = await workingOrderRepository.findById(
    validatedBody.workingOrder
  );
  const vendor: any = await vendorRepository.findById(validatedBody.vendor);
  const createParam = {
    ...validatedBody,
    vendor,
    workingOrder,
  };

  const data = await atkClasificationRepository.create(createParam);

  res.json({
    message: 'Successfully Create ATKClasification',
    data,
  });
};

export const updateATKClasification = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'atkClasificationId');
  let validatedBody = yupValidate(schema.update, body);

  const atkClasificationRepository = new ATKClasificationRepository();
  const workingOrderRepository = new WorkingOrderRepository();
  const vendorRepository = new VendorRepository();

  if (validatedBody.workingOrder) {
    const workingOrder: any = await workingOrderRepository.findById(
      validatedBody.workingOrder
    );
    validatedBody = { ...validatedBody, workingOrder };
  }
  if (validatedBody.vendor) {
    const vendor: any = await vendorRepository.findById(validatedBody.vendor);
    validatedBody = { ...validatedBody, vendor };
  }

  const data = await atkClasificationRepository.update(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update ATKClasification',
    data,
  });
};

export const getATKClasificationById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'atkClasificationId');
  const atkClasificationRepository = new ATKClasificationRepository();
  const data = await atkClasificationRepository.findById(validateParam.uid);

  res.json({
    message: 'Successfully Get ATKClasification By Id',
    data,
  });
};

export const getAllATKClasification = async (req: Request, res: Response) => {
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
    message: 'Successfully Get ATKClasification',
    data,
    totalCount,
  });
};

export const deleteATKClasificationById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'atkClasificationId');
  const atkClasificationRepository = new ATKClasificationRepository();
  const data = await atkClasificationRepository.delete(validateParam.uid);

  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
