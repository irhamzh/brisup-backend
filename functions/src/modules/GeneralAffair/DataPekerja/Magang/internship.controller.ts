import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './internship.schema';
import InternshipRepository from './internship.repository';
import MappingBodyByType from './helpers/MappingBodyByType';

export const createInternship = async (req: any, res: Response) => {
  const { body } = req;
  const masterValidate = yupValidate(schema.baseCreate, body);
  const validatedBody: any = MappingBodyByType(masterValidate.type, body);

  const internshipRepository = new InternshipRepository();
  const data: admin.firestore.DocumentData = await internshipRepository.createInternship(
    validatedBody
  );
  res.json({
    message: 'Successfully Create Aktivitas Internship',
    data,
  });
};

export const updateInternship = async (req: any, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  const internshipRepository = new InternshipRepository();
  const ref: admin.firestore.DocumentData = await internshipRepository.findById(
    validateParam.uid
  );
  const validatedBody: any = MappingBodyByType(ref?.type, body, 'update');

  const data: admin.firestore.DocumentData = await internshipRepository.updateInternship(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update Aktivitas Internship',
    data,
  });
};

export const deleteInternshipById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const internshipRepository = new InternshipRepository();

  const data = await internshipRepository.deleteSubDocument(
    validateParam.uid,
    'internship',
    'ga_internship'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};

export const getInternshipById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const internshipRepository = new InternshipRepository();
  const data: admin.firestore.DocumentData = await internshipRepository.findSubdocumentById(
    validateParam.uid,
    'internship',
    'ga_internship'
  );

  res.json({
    message: 'Successfully Get Internship By Id',
    data,
  });
};

export const getAllInternship = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const internshipRepository = new InternshipRepository();
  const data = await internshipRepository.findAllSubDocument(
    page as string,
    limit as string,
    'internship',
    'ga_internship',
    filtered as string,
    sorted as string
  );
  const totalCount = await internshipRepository.countSubDocument(
    'internship',
    'ga_internship',
    filtered as string
  );

  res.json({
    message: 'Successfully Get Internship',
    data,
    totalCount,
  });
};
