import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import UkerRepository from '@modules/MasterData/Uker/uker.repository';

import schema from './overtime.schema';
import OvertimeRepository from './overtime.repository';

export const createOvertime = async (req: any, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const ukerRepository = new UkerRepository();
  const overtimeRepository = new OvertimeRepository();

  const uker: any = await ukerRepository.findById(validatedBody.uker);
  const createParam = {
    ...validatedBody,
    uker,
  };

  const data: admin.firestore.DocumentData = await overtimeRepository.createOvertime(
    createParam
  );

  res.json({
    message: 'Successfully Create Aktivitas Overtime',
    data,
  });
};

export const updateOvertime = async (req: any, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.update, body);

  const ukerRepository = new UkerRepository();
  const overtimeRepository = new OvertimeRepository();

  if (validatedBody.uker) {
    const uker: any = await ukerRepository.findById(validatedBody.uker);
    validatedBody = { ...validatedBody, uker };
  }

  const data: admin.firestore.DocumentData = await overtimeRepository.updateOvertime(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Aktivitas Overtime',
    data,
  });
};

export const deleteOvertimeById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const overtimeRepository = new OvertimeRepository();

  const data = await overtimeRepository.deleteSubDocument(
    validateParam.uid,
    'overtime',
    'ga_overtime'
  );
  res.json({
    message: 'Successfully Delete Aktivitas Overtime By Id',
    data,
  });
};

export const getOvertimeById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const overtimeRepository = new OvertimeRepository();
  const data: admin.firestore.DocumentData = await overtimeRepository.findByIdElastic(
    validateParam.uid,
    'bri_corpu_ga_overtime'
  );

  res.json({
    message: 'Successfully Get Overtime By Id',
    data,
  });
};

export const getAllOvertime = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const overtimeRepository = new OvertimeRepository();
  const { data, totalCount } = await overtimeRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string,
    'bri_corpu_ga_overtime'
  );
  // const totalCount = await overtimeRepository.countSubDocument(
  //   'overtime',
  //   'ga_overtime',
  //   filtered as string
  // );

  res.json({
    message: 'Successfully Get Overtime',
    data,
    totalCount,
  });
};
