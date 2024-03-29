import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './monitoring_cctv.schema';
import MonitoringCCTVRepository from './monitoring_cctv.repository';

export const createMonitoringCCTV = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const createMonitoringRepository = new MonitoringCCTVRepository();
  const data = await createMonitoringRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create "Monitoring CCTV"',
    data,
  });
};

export const updateMonitoringCCTV = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'createMonitoringId');
  const validatedBody = yupValidate(schema.update, body);

  const createMonitoringRepository = new MonitoringCCTVRepository();
  const data = await createMonitoringRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update "Monitoring CCTV"',
    data,
  });
};

export const deleteMonitoringCCTVById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'createMonitoringId');
  const createMonitoringRepository = new MonitoringCCTVRepository();
  const data = await createMonitoringRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete "Monitoring CCTV" By Id',
    data,
  });
};

export const getMonitoringCCTVById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'createMonitoringId');
  const createMonitoringRepository = new MonitoringCCTVRepository();
  const data = await createMonitoringRepository.findByIdElastic(
    validateParam.uid
  );
  res.json({
    message: 'Successfully Get "Monitoring CCTV" By Id',
    data,
  });
};

export const getAllMonitoringCCTV = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const createMonitoringRepository = new MonitoringCCTVRepository();
  const { data, totalCount } = await createMonitoringRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await createMonitoringRepository.countDocument(
  //   filtered as string
  // );

  res.json({
    message: 'Successfully Get "Monitoring CCTV"',
    data,
    totalCount,
  });
};
