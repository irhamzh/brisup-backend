import { Request, Response } from 'express';
import schema from './vendor.schema';

import VendorRepository from './vendor.repository';
import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

export const createVendor = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const vendorRepository = new VendorRepository();
  const data = await vendorRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Vendor',
    data,
  });
};

export const updateVendor = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'vendorId');
  const validatedBody = yupValidate(schema.create, body);
  const vendorRepository = new VendorRepository();
  const data = await vendorRepository.update(validateParam.uid, validatedBody);
  res.json({
    message: 'Successfully Update Vendor',
    data,
  });
};

export const getVendorById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'vendorId');
  const vendorRepository = new VendorRepository();
  const data = await vendorRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Vendor By Id',
    data,
  });
};

export const getAllVendor = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const vendorRepository = new VendorRepository();
  const data = await vendorRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await vendorRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get Vendor',
    data,
    totalCount,
  });
};

export const deleteVendorById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'vendorId');
  const vendorRepository = new VendorRepository();
  const data = await vendorRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
