import { Request, Response } from 'express';

import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

import WorkingOrderRepository from '@modules/WorkingOrder/working_order.repository';
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

  res.json({
    message: 'Successfully Create Evaluasi Catering',
    data,
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
  res.json({
    message: 'Successfully Update Evaluasi Catering',
    data,
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

  res.json({
    message: 'Successfully Delete Evaluasi Catering By Id',
    data,
  });
};

export const getEvaluasiCateringById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'evaluasiCateringId');
  const evaluasiCateringRepository = new EvaluasiCateringRepository();
  const data = await evaluasiCateringRepository.findByIdElastic(
    validateParam.uid
  );

  res.json({
    message: 'Successfully Get Evaluasi Catering By Id',
    data,
  });
};

export const getAllEvaluasiCatering = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const evaluasiCateringRepository = new EvaluasiCateringRepository();
  const { data, totalCount } = await evaluasiCateringRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await evaluasiCateringRepository.countDocument(
  //   filtered as string
  // );

  res.json({
    message: 'Successfully Get Evaluasi Catering',
    data,
    totalCount,
  });
};
