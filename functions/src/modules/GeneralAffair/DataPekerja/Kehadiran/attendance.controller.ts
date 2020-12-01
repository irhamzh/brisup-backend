import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './attendance.schema';
import AttendanceRepository from './attendance.repository';

export const createAttendance = async (req: any, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const attendaceRepository = new AttendanceRepository();

  const data: admin.firestore.DocumentData = await attendaceRepository.createAttendance(
    validatedBody
  );

  res.json({
    message: 'Successfully Create Aktivitas Attendance',
    data,
  });
};

export const updateAttendance = async (req: any, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.update, body);

  const attendaceRepository = new AttendanceRepository();

  const data: admin.firestore.DocumentData = await attendaceRepository.updateAttendance(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Aktivitas Attendance',
    data,
  });
};

export const deleteAttendanceById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const attendaceRepository = new AttendanceRepository();

  const data = await attendaceRepository.deleteSubDocument(
    validateParam.uid,
    'attendace',
    'ga_attendaces'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};

export const getAttendanceById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const attendaceRepository = new AttendanceRepository();
  const data: admin.firestore.DocumentData = await attendaceRepository.findSubdocumentById(
    validateParam.uid,
    'attendace',
    'ga_attendaces'
  );

  res.json({
    message: 'Successfully Get Attendance By Id',
    data,
  });
};

export const getAllAttendance = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const attendaceRepository = new AttendanceRepository();
  const data = await attendaceRepository.findAllSubDocument(
    page as string,
    limit as string,
    'attendace',
    'ga_attendaces',
    filtered as string,
    sorted as string
  );
  const totalCount = await attendaceRepository.countSubDocument(
    'attendace',
    'ga_attendaces',
    filtered as string
  );

  res.json({
    message: 'Successfully Get Attendance',
    data,
    totalCount,
  });
};