import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './peralatan_kerja.schema';
import PeralatanKerjaRepository from './peralatan_kerja.repository';
import { TypePeralatanKerja } from './interface/peralatan_kerja.interface';

export const createPeralatanKerja = async (req: Request, res: Response) => {
  const { body } = req;
  let validatedBody = undefined;
  validatedBody = yupValidate(schema.baseCreate, body);

  if (
    body?.typePeralatanKerja?.toLowerCase() ===
    TypePeralatanKerja.machinery?.toLowerCase()
  ) {
    validatedBody = yupValidate(schema.createMachinery, body);
  } else if (
    body?.typePeralatanKerja?.toLowerCase() ===
    TypePeralatanKerja.chemical?.toLowerCase()
  ) {
    validatedBody = yupValidate(schema.createChemical, body);
  } else if (
    body?.typePeralatanKerja?.toLowerCase() ===
    TypePeralatanKerja['equipment consumable']?.toLowerCase()
  ) {
    validatedBody = yupValidate(schema.createEquipmentConsumable, body);
  } else {
    validatedBody = yupValidate(schema.createPeralatanTeknis, body);
  }

  const peralatanKerjaRepository = new PeralatanKerjaRepository();

  const data: admin.firestore.DocumentData = await peralatanKerjaRepository.create(
    validatedBody
  );

  res.json({
    message: 'Successfully Create Peralatan Kerja',
    data,
  });
};

export const updatePeralatanKerja = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'peralatanKerjaId');
  let validatedBody = undefined;

  const peralatanKerjaRepository = new PeralatanKerjaRepository();

  const ref: admin.firestore.DocumentData = await peralatanKerjaRepository.findById(
    validateParam.uid
  );
  if (
    ref?.typePeralatanKerja?.toLowerCase() ===
    TypePeralatanKerja.machinery?.toLowerCase()
  ) {
    validatedBody = yupValidate(schema.createMachinery, body);
  } else if (
    ref?.typePeralatanKerja?.toLowerCase() ===
    TypePeralatanKerja.chemical?.toLowerCase()
  ) {
    validatedBody = yupValidate(schema.createChemical, body);
  } else if (
    ref?.typePeralatanKerja?.toLowerCase() ===
    TypePeralatanKerja['equipment consumable']?.toLowerCase()
  ) {
    validatedBody = yupValidate(schema.createEquipmentConsumable, body);
  } else {
    validatedBody = yupValidate(schema.createPeralatanTeknis, body);
  }

  const data: admin.firestore.DocumentData = await peralatanKerjaRepository.update(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Peralatan Kerja',
    data,
  });
};

export const deletePeralatanKerjaById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'peralatanKerjaId');
  const peralatanKerjaRepository = new PeralatanKerjaRepository();
  const data = await peralatanKerjaRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Peralatan Kerja By Id',
    data,
  });
};

export const getPeralatanKerjaById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'peralatanKerjaId');
  const peralatanKerjaRepository = new PeralatanKerjaRepository();
  const data: admin.firestore.DocumentData = await peralatanKerjaRepository.findByIdElastic(
    validateParam.uid
  );

  res.json({
    message: 'Successfully Get Peralatan Kerja By Id',
    data,
  });
};

export const getAllPeralatanKerja = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const peralatanKerjaRepository = new PeralatanKerjaRepository();
  const { data, totalCount } = await peralatanKerjaRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await peralatanKerjaRepository.countDocument(
  //   filtered as string
  // );

  res.json({
    message: 'Successfully Get Peralatan Kerja',
    data,
    totalCount,
  });
};
