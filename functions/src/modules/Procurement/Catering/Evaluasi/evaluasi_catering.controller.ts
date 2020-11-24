import { Request, Response } from 'express';

import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

import firestoreTimeStampToDate from '@utils/firestoreTimeStampToDate';
import WorkingOrderRepository from '@modules/FixedAsset/Pengadaan/WorkingOrder/working_order.repository';
import CateringRepository from '@modules/MasterData/Catering/catering.repository';

import schema from './evaluasi_catering.schema';
import EvaluasiCateringRepository from './evaluasi_catering.repository';

export const createEvaluasiCatering = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const evaluasiCateringRepository = new EvaluasiCateringRepository();
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

  const data = await evaluasiCateringRepository.create(createParam);
  const formatedData = firestoreTimeStampToDate(data);

  res.json({
    message: 'Successfully Create EvaluasiCatering',
    data: formatedData,
  });
};

export const updateEvaluasiCatering = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'evaluasiCateringId');
  let validatedBody = yupValidate(schema.update, body);

  const evaluasiCateringRepository = new EvaluasiCateringRepository();
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

  const data = await evaluasiCateringRepository.update(
    validateParam.uid,
    validatedBody
  );
  const formatedData = firestoreTimeStampToDate(data);
  res.json({
    message: 'Successfully Update EvaluasiCatering',
    data: formatedData,
  });
};

export const getEvaluasiCateringById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'evaluasiCateringId');
  const evaluasiCateringRepository = new EvaluasiCateringRepository();
  const data = await evaluasiCateringRepository.findById(validateParam.uid);
  const formatedData = firestoreTimeStampToDate(data);

  res.json({
    message: 'Successfully Get EvaluasiCatering By Id',
    data: formatedData,
  });
};

export const getAllEvaluasiCatering = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const evaluasiCateringRepository = new EvaluasiCateringRepository();
  const data = await evaluasiCateringRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await evaluasiCateringRepository.countDocument(
    filtered as string
  );
  const formatedData = firestoreTimeStampToDate(data);

  res.json({
    message: 'Successfully Get EvaluasiCatering',
    data: formatedData,
    totalCount,
  });
};

export const deleteEvaluasiCateringById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'evaluasiCateringId');
  const evaluasiCateringRepository = new EvaluasiCateringRepository();
  const data = await evaluasiCateringRepository.delete(validateParam.uid);
  const formatedData = firestoreTimeStampToDate(data);

  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data: formatedData,
  });
};
