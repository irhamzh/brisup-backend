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

  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };
  res.json({
    message: 'Successfully Create PeralatanKerja',
    data: formatedData,
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
  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };
  res.json({
    message: 'Successfully Update PeralatanKerja',
    data: formatedData,
  });
};

export const getPeralatanKerjaById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'peralatanKerjaId');
  const peralatanKerjaRepository = new PeralatanKerjaRepository();
  const data: admin.firestore.DocumentData = await peralatanKerjaRepository.findById(
    validateParam.uid
  );
  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };
  res.json({
    message: 'Successfully Get PeralatanKerja By Id',
    data: formatedData,
  });
};

export const getAllPeralatanKerja = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const peralatanKerjaRepository = new PeralatanKerjaRepository();
  const data = await peralatanKerjaRepository.findAll(
    page as string,
    limit as string
  );
  const totalCount = await peralatanKerjaRepository.countDocument();
  const formatedData = data.map((item: admin.firestore.DocumentData) => ({
    ...item,
    tanggal: item.tanggal.toDate(),
  }));
  res.json({
    message: 'Successfully Get PeralatanKerja',
    data: formatedData,
    totalCount,
  });
};

export const deletePeralatanKerjaById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'peralatanKerjaId');
  const peralatanKerjaRepository = new PeralatanKerjaRepository();
  const data = await peralatanKerjaRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
