import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import AreaRepository from '@modules/MasterData/Area/area.repository';
import MedicineTypeRepository from '@modules/MasterData/MedicineType/medicine_type.repository';

import schema from './p3k.schema';
import P3kRepository from './p3k.repository';

export const createP3k = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const areaRepository = new AreaRepository();
  const medicineTypeRepository = new MedicineTypeRepository();
  const p3kRepository = new P3kRepository();

  const area: any = await areaRepository.findById(validatedBody.area);
  const medicineType: any = await medicineTypeRepository.findById(
    validatedBody.medicineType
  );

  const createParam = {
    ...validatedBody,
    area,
    medicineType,
  };

  const data: admin.firestore.DocumentData = await p3kRepository.createP3k(
    createParam
  );

  res.json({
    message: 'Successfully Create Aktivitas P3k',
    data,
  });
};

export const updateP3k = async (req: any, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.update, body);

  const areaRepository = new AreaRepository();
  const p3kRepository = new P3kRepository();
  const medicineTypeRepository = new MedicineTypeRepository();

  if (validatedBody.area) {
    const area: any = await areaRepository.findById(validatedBody.area);
    validatedBody = { ...validatedBody, area };
  }
  if (validatedBody.medicineType) {
    const medicineType: any = await medicineTypeRepository.findById(
      validatedBody.medicineType
    );
    validatedBody = { ...validatedBody, medicineType };
  }

  const data: admin.firestore.DocumentData = await p3kRepository.updateP3k(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Aktivitas P3k',
    data,
  });
};

export const deleteP3kById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const p3kRepository = new P3kRepository();

  const data = await p3kRepository.deleteSubDocument(
    validateParam.uid,
    'first-aid-kit',
    'ga-first-aid-kits'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};

export const getP3kById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const p3kRepository = new P3kRepository();
  const data: admin.firestore.DocumentData = await p3kRepository.findSubdocumentById(
    validateParam.uid,
    'first-aid-kit',
    'ga-first-aid-kits'
  );

  res.json({
    message: 'Successfully Get P3k By Id',
    data,
  });
};

export const getAllP3k = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const p3kRepository = new P3kRepository();
  const data = await p3kRepository.findAllSubDocument(
    page as string,
    limit as string,
    'first-aid-kit',
    'ga-first-aid-kits',
    filtered as string,
    sorted as string
  );
  const totalCount = await p3kRepository.countSubDocument(
    'first-aid-kit',
    'ga-first-aid-kits',
    filtered as string
  );

  res.json({
    message: 'Successfully Get P3k',
    data,
    totalCount,
  });
};
