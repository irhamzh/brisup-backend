import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './pump_unit.schema';
import PumpUnitRepository from './pump_unit.repository';
import PumpRepository from '@modules/MasterData/Pump/pump.repository';

export const createPumpUnit = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);
  const pumpUnitRepository = new PumpUnitRepository();
  const pumpRepository = new PumpRepository();

  const pump: any = await pumpRepository.findById(validatedBody.pump);
  const createParam = {
    ...validatedBody,
    pump,
  };

  const data = await pumpUnitRepository.create(createParam);

  res.json({
    message: 'Successfully Create PumpUnit',
    data,
  });
};

export const updatePumpUnit = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'pumpUnitId');
  let validatedBody = yupValidate(schema.update, body);

  const pumpUnitRepository = new PumpUnitRepository();
  const pumpRepository = new PumpRepository();

  if (validatedBody.pump) {
    const pump: any = await pumpRepository.findById(validatedBody.pump);
    validatedBody = { ...validatedBody, pump };
  }

  const data = await pumpUnitRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update PumpUnit',
    data,
  });
};

export const getPumpUnitById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'pumpUnitId');
  const pumpUnitRepository = new PumpUnitRepository();
  const data = await pumpUnitRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get PumpUnit By Id',
    data,
  });
};

export const getAllPumpUnit = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const pumpUnitRepository = new PumpUnitRepository();
  const data = await pumpUnitRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await pumpUnitRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get PumpUnit',
    data,
    totalCount,
  });
};

export const deletePumpUnitById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'pumpUnitId');
  const pumpUnitRepository = new PumpUnitRepository();
  const data = await pumpUnitRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
