import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './evaluasi_klinik.schema';
import ClinikEvalutionRepository from './evaluasi_klinik.repository';

export const createClinikEvalution = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const clinicEvaluationRepository = new ClinikEvalutionRepository();
  const data = await clinicEvaluationRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create ClinikEvalution',
    data,
  });
};

export const updateClinikEvalution = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'clinicEvaluationId');
  const validatedBody = yupValidate(schema.update, body);

  const clinicEvaluationRepository = new ClinikEvalutionRepository();
  const data = await clinicEvaluationRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update ClinikEvalution',
    data,
  });
};

export const getClinikEvalutionById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'clinicEvaluationId');
  const clinicEvaluationRepository = new ClinikEvalutionRepository();
  const data = await clinicEvaluationRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get ClinikEvalution By Id',
    data,
  });
};

export const getAllClinikEvalution = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const clinicEvaluationRepository = new ClinikEvalutionRepository();
  const data = await clinicEvaluationRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await clinicEvaluationRepository.countDocument(
    filtered as string
  );

  res.json({
    message: 'Successfully Get ClinikEvalution',
    data,
    totalCount,
  });
};

export const deleteClinikEvalutionById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'clinicEvaluationId');
  const clinicEvaluationRepository = new ClinikEvalutionRepository();
  const data = await clinicEvaluationRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};