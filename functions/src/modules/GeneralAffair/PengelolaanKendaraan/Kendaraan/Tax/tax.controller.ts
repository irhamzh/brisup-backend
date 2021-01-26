import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import VehicleRepository from '@modules/MasterData/Vehicle/vehicle.repository';

import schema from './tax.schema';
import TaxRepository from './tax.repository';

export const createTax = async (req: any, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const vehicleRepository = new VehicleRepository();
  const taxRepository = new TaxRepository();

  const vehicle: any = await vehicleRepository.findById(validatedBody.vehicle);
  const createParam = {
    ...validatedBody,
    vehicle,
  };

  const data: admin.firestore.DocumentData = await taxRepository.createTax(
    createParam
  );

  res.json({
    message: 'Successfully Create "Pengalolaan Pajak Kendaraan"',
    data,
  });
};

export const updateTax = async (req: any, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.update, body);

  const vehicleRepository = new VehicleRepository();
  const taxRepository = new TaxRepository();

  if (validatedBody.vehicle) {
    const vehicle: any = await vehicleRepository.findById(
      validatedBody.vehicle
    );
    validatedBody = { ...validatedBody, vehicle };
  }

  const data: admin.firestore.DocumentData = await taxRepository.updateTax(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update "Pengalolaan Pajak Kendaraan"',
    data,
  });
};

export const deleteTaxById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const taxRepository = new TaxRepository();

  const data = await taxRepository.deleteSubDocument(
    validateParam.uid,
    'tax',
    'ga_taxes'
  );
  res.json({
    message: 'Successfully Delete "Pengalolaan Pajak Kendaraan" By Id',
    data,
  });
};

export const getTaxById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const taxRepository = new TaxRepository();
  const data: admin.firestore.DocumentData = await taxRepository.findSubdocumentById(
    validateParam.uid,
    'tax',
    'ga_taxes'
  );

  res.json({
    message: 'Successfully Get "Pengalolaan Pajak Kendaraan" By Id',
    data,
  });
};

export const getAllTax = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const taxRepository = new TaxRepository();
  const data = await taxRepository.findAllSubDocument(
    page as string,
    limit as string,
    'tax',
    'ga_taxes',
    filtered as string,
    sorted as string
  );
  const totalCount = await taxRepository.countSubDocument(
    'tax',
    'ga_taxes',
    filtered as string
  );

  res.json({
    message: 'Successfully Get "Pengalolaan Pajak Kendaraan"',
    data,
    totalCount,
  });
};

export const getTaxByIdElastic = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const taxRepository = new TaxRepository();
  const data: admin.firestore.DocumentData = await taxRepository.findByIdElastic(
    validateParam.uid,
    'bri_corpu_ga_taxes'
  );

  res.json({
    message: 'Successfully Get "Pengalolaan Pajak Kendaraan" By Id',
    data,
  });
};

export const getAllTaxElastic = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const taxRepository = new TaxRepository();
  const { data, totalCount } = await taxRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string,
    'bri_corpu_ga_taxes'
  );

  res.json({
    message: 'Successfully Get "Pengalolaan Pajak Kendaraan"',
    data,
    totalCount,
  });
};
