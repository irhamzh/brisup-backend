import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './outsourcing.schema';
import OutsourcingRepository from './outsourcing.repository';

export const createOutsourcing = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);
  const outsourcingRepository = new OutsourcingRepository();

  const data = await outsourcingRepository.createOutsourcing(validatedBody);
  res.json({
    message: 'Successfully Create Outsourcing',
    data,
  });
};

export const updateOutsourcing = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'outsourcingId');
  const validatedBody = yupValidate(schema.update, body);
  const outsourcingRepository = new OutsourcingRepository();
  const data = await outsourcingRepository.updateOutsourcing(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update Outsourcing',
    data,
  });
};

export const getOutsourcingById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'outsourcingId');
  const outsourcingRepository = new OutsourcingRepository();
  const data = await outsourcingRepository.findSubdocumentById(
    validateParam.uid,
    'outsourcing',
    'ga_outsourcings'
  );
  res.json({
    message: 'Successfully Get Outsourcing By Id',
    data,
  });
};

export const getAllOutsourcing = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const outsourcingRepository = new OutsourcingRepository();
  const data = await outsourcingRepository.findAllSubDocument(
    page as string,
    limit as string,
    'outsourcing',
    'ga_outsourcings',
    filtered as string,
    sorted as string
  );
  const totalCount = await outsourcingRepository.countSubDocument(
    'outsourcing',
    'ga_outsourcings',
    filtered as string
  );
  res.json({
    message: 'Successfully Get All Outsourcing',
    data,
    totalCount,
  });
};

export const deleteOutsourcingById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'outsourcingId');
  const outsourcingRepository = new OutsourcingRepository();
  const data = await outsourcingRepository.deleteSubDocument(
    validateParam.uid,
    'outsourcing',
    'ga_outsourcings'
  );
  res.json({
    message: 'Successfully Delete Outsourcing By Id',
    data,
  });
};

export const importExcel = async (req: any, res: Response) => {
  const { files } = req;

  const outsourcingRepository = new OutsourcingRepository();
  const invalidRow = await outsourcingRepository.importExcel(
    files,
    {
      B: 'name',
      C: 'pn',
      D: 'value',
      E: 'year',
    },
    schema.create,
    {},
    outsourcingRepository._collection
      .doc('outsourcing')
      .collection('ga_outsourcings')
  );

  res.json({
    message: 'Successfully Import Outsourcing',
    invalidRow,
  });
};
