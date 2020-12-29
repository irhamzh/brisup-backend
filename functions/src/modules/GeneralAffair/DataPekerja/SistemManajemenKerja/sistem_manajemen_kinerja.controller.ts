import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './sistem_manajemen_kinerja.schema';
import PerformanceManagementRepository from './sistem_manajemen_kinerja.repository';

export const createPerformanceManagement = async (
  req: Request,
  res: Response
) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);
  const performanceManagementRepository = new PerformanceManagementRepository();

  const data = await performanceManagementRepository.createPerformance(
    validatedBody
  );
  res.json({
    message: 'Successfully Create Performance Management',
    data,
  });
};

export const updatePerformanceManagement = async (
  req: Request,
  res: Response
) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'performanceManagementId');
  const validatedBody = yupValidate(schema.update, body);
  const performanceManagementRepository = new PerformanceManagementRepository();
  const data = await performanceManagementRepository.updatePerformance(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update Performance Management',
    data,
  });
};

export const getPerformanceManagementById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'performanceManagementId');
  const performanceManagementRepository = new PerformanceManagementRepository();
  const data = await performanceManagementRepository.findSubdocumentById(
    validateParam.uid,
    'performance_management',
    'ga_performance_managements'
  );
  res.json({
    message: 'Successfully Get Performance Management By Id',
    data,
  });
};

export const getAllPerformanceManagement = async (
  req: Request,
  res: Response
) => {
  const { page, limit, filtered, sorted } = req.query;
  const performanceManagementRepository = new PerformanceManagementRepository();
  const data = await performanceManagementRepository.findAllSubDocument(
    page as string,
    limit as string,
    'performance_management',
    'ga_performance_managements',
    filtered as string,
    sorted as string
  );
  const totalCount = await performanceManagementRepository.countSubDocument(
    'performance_management',
    'ga_performance_managements',
    filtered as string
  );
  res.json({
    message: 'Successfully Get All Performance Management',
    data,
    totalCount,
  });
};

export const getAllPerformanceManagementFormated = async (
  req: Request,
  res: Response
) => {
  const { page, limit, filtered, sorted } = req.query;
  const currentYear = new Date().getFullYear();
  const performanceManagementRepository = new PerformanceManagementRepository();
  const data = await performanceManagementRepository.findAllSubDocument(
    page as string,
    limit as string,
    'performance_management',
    'ga_performance_managements',
    filtered as string,
    sorted as string
  );

  const formatedData = data.map((item: admin.firestore.DocumentData) => {
    let current = {
      year: Number(currentYear),
      value: 0,
    };
    let previous = {
      year: Number(currentYear) - 1,
      value: 0,
    };
    let next = {
      year: Number(currentYear) + 1,
      value: 0,
    };

    const currentData = item.penilaian.findIndex(
      ({ year }: { [key: string]: string }) =>
        Number(year) === Number(currentYear)
    );
    if (currentData > -1) {
      current = item.penilaian[currentData];
    }
    const nextData = item.penilaian.findIndex(
      ({ year }: { [key: string]: string }) =>
        Number(year) === Number(currentYear) + 1
    );
    if (nextData > -1) {
      next = item.penilaian[nextData];
    }
    const previousData = item.penilaian.findIndex(
      ({ year }: { [key: string]: string }) =>
        Number(year) === Number(currentYear) - 1
    );
    console.log(previousData, '22');
    if (previousData > -1) {
      previous = item.penilaian[previousData];
    }
    return {
      ...item,
      current,
      previous,
      next,
    };
  });
  const totalCount = await performanceManagementRepository.countSubDocument(
    'performance_management',
    'ga_performance_managements',
    filtered as string
  );
  res.json({
    message: 'Successfully Get All Performance Management',
    data: formatedData,
    totalCount,
  });
};

export const deletePerformanceManagementById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'performanceManagementId');
  const performanceManagementRepository = new PerformanceManagementRepository();
  const data = await performanceManagementRepository.deleteSubDocument(
    validateParam.uid,
    'performance_management',
    'ga_performance_managements'
  );
  res.json({
    message: 'Successfully Delete Performance Management By Id',
    data,
  });
};

export const importExcel = async (req: any, res: Response) => {
  // const { files } = req;
  // const performanceManagementRepository = new PerformanceManagementRepository();
  // const invalidRow = await performanceManagementRepository.importExcel(
  //   files,
  //   {
  //     B: 'name',
  //     C: 'pn',
  //     D: 'value',
  //     E: 'year',
  //   },
  //   schema.create,
  //   {},
  //   performanceManagementRepository._collection
  //     .doc('performance_management')
  //     .collection('ga_performance_managements')
  // );
  // res.json({
  //   message: 'Successfully Import Performance Management',
  //   invalidRow,
  // });
};
