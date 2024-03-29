import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import MappingBodyByType from './helpers/MappingBodyByType';
import schema from '@modules/FixedAsset/Vendor/vendor.schema';
import PartnerRepository from '@modules/MasterData/Partner/partner.repository';
import VendorRepository from '@modules/FixedAsset/Vendor/vendor.repository';

export const createVendor = async (req: Request, res: Response) => {
  const { body } = req;

  const masterValidate = yupValidate(schema.baseCreateMonitoring, body);
  let validatedBody: any = MappingBodyByType(
    masterValidate.typeMonitoring,
    body
  );
  const partnerRepository = new PartnerRepository();
  const vendorRepository = new VendorRepository();
  if (validatedBody?.partner) {
    const partner: any = await partnerRepository.findById(
      validatedBody.partner
    );
    validatedBody.partner = partner;
  }
  const data: admin.firestore.DocumentData = await vendorRepository.create(
    validatedBody
  );

  res.json({
    message: 'Successfully Create Vendor',
    data,
  });
};

export const updateVendor = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'vendorId');
  const partnerRepository = new PartnerRepository();
  const vendorRepository = new VendorRepository();
  const ref: admin.firestore.DocumentData = await vendorRepository.findById(
    validateParam.uid
  );
  let validatedBody: any = MappingBodyByType(
    ref?.typeMonitoring,
    body,
    'update'
  );
  if (validatedBody?.partner) {
    const partner: any = await partnerRepository.findById(
      validatedBody.partner
    );
    validatedBody.partner = partner;
  }
  const data: admin.firestore.DocumentData = await vendorRepository.update(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Vendor',
    data,
  });
};

export const deleteVendorById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'vendorId');
  const vendorRepository = new VendorRepository();
  const data = await vendorRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Get Delete By Id',
    data,
  });
};

export const getVendorById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'vendorId');
  const vendorRepository = new VendorRepository();
  const data: admin.firestore.DocumentData = await vendorRepository.findByIdElastic(
    validateParam.uid
  );

  res.json({
    message: 'Successfully Get Vendor By Id',
    data,
  });
};

export const getAllVendor = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const vendorRepository = new VendorRepository();
  const { data, totalCount } = await vendorRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await vendorRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get Vendor',
    data,
    totalCount,
  });
};
