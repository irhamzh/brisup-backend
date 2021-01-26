import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './attendance.schema';
import AttendanceRepository from './attendance.repository';

export const createAttendance = async (req: any, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const attendanceRepository = new AttendanceRepository();

  const data: admin.firestore.DocumentData = await attendanceRepository.createAttendance(
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

  const attendanceRepository = new AttendanceRepository();

  const data: admin.firestore.DocumentData = await attendanceRepository.updateAttendance(
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
  const attendanceRepository = new AttendanceRepository();

  const data = await attendanceRepository.deleteSubDocument(
    validateParam.uid,
    'attendance',
    'ga_attendances'
  );
  res.json({
    message: 'Successfully Delete Aktivitas Attendance By Id',
    data,
  });
};

export const getAttendanceById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const attendanceRepository = new AttendanceRepository();
  const data: admin.firestore.DocumentData = await attendanceRepository.findByIdElastic(
    validateParam.uid,
    'bri_corpu_ga_attendances'
  );

  res.json({
    message: 'Successfully Get Attendance By Id',
    data,
  });
};

export const getAllAttendance = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const attendanceRepository = new AttendanceRepository();
  const { data, totalCount } = await attendanceRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string,
    'bri_corpu_ga_attendances'
  );
  // const totalCount = await attendanceRepository.countSubDocument(
  //   'attendance',
  //   'ga_attendances',
  //   filtered as string
  // );

  res.json({
    message: 'Successfully Get Attendance',
    data,
    totalCount,
  });
};

export const importExcel = async (req: any, res: Response) => {
  const { files } = req;

  const attendanceRepository = new AttendanceRepository();
  const invalidRow = await attendanceRepository.importExcel(
    files,
    {
      B: 'tanggal',
      C: 'name',
      D: 'jumlahHadir',
      E: 'jumlahTidakHadir',
      F: 'jumlahCuti',
      G: 'type',
    },
    schema.create,
    {},
    attendanceRepository._collection
      .doc('attendance')
      .collection('ga_attendances')
  );
  res.json({
    message: 'Successfully Create Attendance',
    invalidRow,
  });
};
