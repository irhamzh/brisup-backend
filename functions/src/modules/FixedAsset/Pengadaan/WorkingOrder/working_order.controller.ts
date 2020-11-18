import { Request, Response } from 'express';
import schema from '@modules/FixedAsset/Pengadaan/WorkingOrder/working_order.schema';
// import { } from '@utils/Date';
import * as admin from 'firebase-admin';
import WorkingOrderRepository from '@modules/FixedAsset/Pengadaan/WorkingOrder/working_order.repository';
import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

export const createWorkingOrder = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const workingOrderRepository = new WorkingOrderRepository();
  const data: admin.firestore.DocumentData = await workingOrderRepository.create(
    validatedBody
  );
  const formatedData = {
    ...data,
    tanggalTerima: data.tanggalTerima.toDate(),
    tanggalRevisi: data.tanggalRevisi.toDate(),
    tanggalKonfirmasi: data.tanggalKonfirmasi.toDate(),
  };

  res.json({
    message: 'Successfully Create WorkingOrder',
    data: formatedData,
  });
};

export const updateWorkingOrder = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'workingOrderId');
  const validatedBody = yupValidate(schema.update, body);

  const workingOrderRepository = new WorkingOrderRepository();
  const data: admin.firestore.DocumentData = await workingOrderRepository.update(
    validateParam.uid,
    validatedBody
  );
  const formatedData = {
    ...data,
    tanggalTerima: data.tanggalTerima.toDate(),
    tanggalRevisi: data.tanggalRevisi.toDate(),
    tanggalKonfirmasi: data.tanggalKonfirmasi.toDate(),
  };
  res.json({
    message: 'Successfully Update WorkingOrder',
    data: formatedData,
  });
};

export const getWorkingOrderById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'workingOrderId');
  const workingOrderRepository = new WorkingOrderRepository();
  const data: admin.firestore.DocumentData = await workingOrderRepository.findById(
    validateParam.uid
  );
  const formatedData = {
    ...data,
    tanggalTerima: data.tanggalTerima.toDate(),
    tanggalRevisi: data.tanggalRevisi.toDate(),
    tanggalKonfirmasi: data.tanggalKonfirmasi.toDate(),
  };
  res.json({
    message: 'Successfully Get WorkingOrder By Id',
    data: formatedData,
  });
};

export const getAllWorkingOrder = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const workingOrderRepository = new WorkingOrderRepository();
  const data = await workingOrderRepository.findAll(
    page as string,
    limit as string
  );
  const totalCount = await workingOrderRepository.countDocument();
  const formatedData = data.map((item: admin.firestore.DocumentData) => ({
    ...item,
    tanggalTerima: item.tanggalTerima.toDate(),
    tanggalRevisi: item.tanggalRevisi.toDate(),
    tanggalKonfirmasi: item.tanggalKonfirmasi.toDate(),
  }));
  res.json({
    message: 'Successfully Get WorkingOrder',
    data: formatedData,
    totalCount,
  });
};

export const deleteWorkingOrderById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'workingOrderId');
  const workingOrderRepository = new WorkingOrderRepository();
  const data = await workingOrderRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
