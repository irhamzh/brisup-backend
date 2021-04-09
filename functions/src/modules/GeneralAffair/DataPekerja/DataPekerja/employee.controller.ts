import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import FormasiRepository from '@modules/GeneralAffair/DataPekerja/FormasiPekerja/formasi_pekerja.repository';

import schema from './employee.schema';
import EmployeeRepository from './employee.repository';

export const createEmployee = async (req: any, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const employeeRepository = new EmployeeRepository();
  const formasiRepository = new FormasiRepository();
  const formasi = await formasiRepository.findById(validatedBody.formasi);

  const data = await employeeRepository.createEmployee({
    ...validatedBody,
    formasi,
  });

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

  const data = await employeeRepository.updateEmployee(
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

  const data = await employeeRepository.deleteEmployeeById(validateParam.uid);
  res.json({
    message: 'Successfully Delete By Aktivitas Employee Id',
    data,
  });
};

export const importExcel = async (req: any, res: Response) => {
  const { files } = req;

  const employeeRepository = new EmployeeRepository();
  const data = await employeeRepository.importExcelEmployee(
    files,
    {
      A: 'name',
      B: 'nip',
      C: 'pernr',
      D: 'sex',
      E: 'dateOfBird',
      F: 'age',
      G: 'unitKerja',
      H: 'position',
      I: 'jobgrade',
      J: 'mkjg',
      K: 'pg',
      L: 'mkpg',
      M: 'levelJabatan',
    },
    schema.create
  );

  if (data?.length > 0) {
    res.json({
      message: `${data.length} data yang Anda kirim tidak valid, silahkan cek kembali`,
      error: true, //flag untuk front end
      data,
    });
    return;
  }
  res.json({
    message: 'Successfully Create Employee',
    data,
  });
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const employeeRepository = new EmployeeRepository();
  const data = await employeeRepository.findSubdocumentById(
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
