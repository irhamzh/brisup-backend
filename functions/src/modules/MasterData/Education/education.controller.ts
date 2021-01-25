import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './education.schema';
import EducationRepository from './education.repository';

export const createEducation = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const educatioRepository = new EducationRepository();
  const data = await educatioRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Education',
    data,
  });
};

export const updateEducation = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'educatioId');
  const validatedBody = yupValidate(schema.create, body);

  const educatioRepository = new EducationRepository();
  const data = await educatioRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update Education',
    data,
  });
};

export const getEducationById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'educatioId');
  const educatioRepository = new EducationRepository();
  const data = await educatioRepository.findByIdElastic(validateParam.uid);
  res.json({
    message: 'Successfully Get Education By Id',
    data,
  });
};

export const getAllEducation = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const educatioRepository = new EducationRepository();
  const { data, totalCount } = await educatioRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await educatioRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get Education',
    data,
    totalCount,
  });
};

export const deleteEducationById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'educatioId');
  const educatioRepository = new EducationRepository();
  const data = await educatioRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
