import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './employee.schema';
import EmployeeRepository from './employee.repository';

export const createEmployee = async (req: any, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const employeeRepository = new EmployeeRepository();

  const data: admin.firestore.DocumentData = await employeeRepository.createEmployee(
    validatedBody
  );

  res.json({
    message: 'Successfully Create Aktivitas Employee',
    data,
  });
};

export const updateEmployee = async (req: any, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.update, body);

  const employeeRepository = new EmployeeRepository();

  const data: admin.firestore.DocumentData = await employeeRepository.updateEmployee(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Aktivitas Employee',
    data,
  });
};

export const deleteEmployeeById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const employeeRepository = new EmployeeRepository();

  const data = await employeeRepository.deleteSubDocument(
    validateParam.uid,
    'employee',
    'ga_employees'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const employeeRepository = new EmployeeRepository();
  const data: admin.firestore.DocumentData = await employeeRepository.findSubdocumentById(
    validateParam.uid,
    'employee',
    'ga_employees'
  );

  res.json({
    message: 'Successfully Get Employee By Id',
    data,
  });
};

export const getAllEmployee = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const employeeRepository = new EmployeeRepository();
  const data = await employeeRepository.findAllSubDocument(
    page as string,
    limit as string,
    'employee',
    'ga_employees',
    filtered as string,
    sorted as string
  );
  const totalCount = await employeeRepository.countSubDocument(
    'employee',
    'ga_employees',
    filtered as string
  );

  res.json({
    message: 'Successfully Get Employee',
    data,
    totalCount,
  });
};

export const importExcel = async (req: any, res: Response) => {
  const { files } = req;

  const employeeRepository = new EmployeeRepository();
  const invalidRow = await employeeRepository.importExcel(
    files,
    {
      A: 'name',
      B: 'nip',
      C: 'pernr',
      D: 'age',
      E: 'position',
      F: 'jobgrade',
      G: 'mkjg',
      H: 'pg',
      I: 'mkpg',
      J: 'levelJabatan',
    },
    schema.create,
    employeeRepository._collection.doc('employee').collection('ga_employees')
  );

  res.json({
    message: 'Successfully Create Employee',
    invalidRow,
  });
};
