import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import WorkingOrderRepository from '@modules/WorkingOrder/working_order.repository';
import EducationRepository from '@modules/MasterData/Education/education.repository';

import schema from './stock_opname.schema';
import ATKStockOpnameRepository from './stock_opname.repository';
import { IStokOpnameATKBase } from './interface/stock_opname.interface';

export const createATKStockOpname = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const atkStockOpnameRepository = new ATKStockOpnameRepository();
  const workingOrderRepository = new WorkingOrderRepository();
  const educationRepository = new EducationRepository();

  const workingOrder: any = await workingOrderRepository.findById(
    validatedBody.workingOrder
  );
  const education: any = await educationRepository.findById(
    validatedBody.education
  );

  const barang = validatedBody.barang.map((item) => ({
    ...item,
    stockAkhir:
      Number(item.stockAwal) +
      Number(item.jumlahMasuk) -
      Number(item.jumlahKeluar),
  }));
  const createParam = {
    ...validatedBody,
    education,
    workingOrder,
    barang,
  };

  const data = await atkStockOpnameRepository.create(createParam);

  res.json({
    message: 'Successfully Create ATKStockOpname',
    data,
  });
};

export const updateATKStockOpname = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'atkStockOpnameId');
  let validatedBody = yupValidate(schema.update, body);

  const atkStockOpnameRepository = new ATKStockOpnameRepository();
  const workingOrderRepository = new WorkingOrderRepository();
  const educationRepository = new EducationRepository();

  if (validatedBody.workingOrder) {
    const workingOrder: any = await workingOrderRepository.findById(
      validatedBody.workingOrder
    );
    validatedBody = { ...validatedBody, workingOrder };
  }
  if (validatedBody.education) {
    const education: any = await educationRepository.findById(
      validatedBody.education
    );
    validatedBody = { ...validatedBody, education };
  }
  if (validatedBody?.barang) {
    const barang = validatedBody.barang.map((item) => ({
      ...item,
      stockAkhir:
        Number(item.stockAwal) +
        Number(item.jumlahMasuk) -
        Number(item.jumlahKeluar),
    }));
    validatedBody = { ...validatedBody, barang };
  }

  const data = await atkStockOpnameRepository.update(
    validateParam.uid,
    validatedBody as IStokOpnameATKBase
  );

  res.json({
    message: 'Successfully Update ATKStockOpname',
    data,
  });
};

export const getATKStockOpnameById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'atkStockOpnameId');
  const atkStockOpnameRepository = new ATKStockOpnameRepository();
  const data = await atkStockOpnameRepository.findById(validateParam.uid);

  res.json({
    message: 'Successfully Get ATKStockOpname By Id',
    data,
  });
};

export const getAllATKStockOpname = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const atkStockOpnameRepository = new ATKStockOpnameRepository();
  const data = await atkStockOpnameRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await atkStockOpnameRepository.countDocument(
    filtered as string
  );

  res.json({
    message: 'Successfully Get ATKStockOpname',
    data,
    totalCount,
  });
};

export const deleteATKStockOpnameById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'atkStockOpnameId');
  const atkStockOpnameRepository = new ATKStockOpnameRepository();
  const data = await atkStockOpnameRepository.delete(validateParam.uid);

  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
