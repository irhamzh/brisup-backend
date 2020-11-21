import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import FloorRepository from '@modules/Floor/floor.repository';
import BuildingTypeRepository from '@modules/BuildingType/building_type.repository';

import schema from './mechanical_eletrical.schema';
import MechanicalElectricalRepository from './mechanical_eletrical.repository';

export const createMechanicalElectrical = async (
  req: Request,
  res: Response
) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const mechanicalElectricalRepository = new MechanicalElectricalRepository();
  const floorRepository = new FloorRepository();
  const buildingRepository = new BuildingTypeRepository();

  const buldingType: any = await buildingRepository.findById(
    validatedBody.buldingType
  );
  const floor: any = await floorRepository.findById(validatedBody.floor);
  const createParam = {
    ...validatedBody,
    floor,
    buldingType,
  };
  const data: admin.firestore.DocumentData = await mechanicalElectricalRepository.create(
    createParam
  );
  const formatedData = {
    ...data,
    expiredtabung: data.expiredtabung.toDate(),
  };

  res.json({
    message: 'Successfully Create MechanicalElectrical',
    data: formatedData,
  });
};

export const updateMechanicalElectrical = async (
  req: Request,
  res: Response
) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'mechanicalElectricalId');
  let validatedBody = yupValidate(schema.update, body);

  const mechanicalElectricalRepository = new MechanicalElectricalRepository();
  const floorRepository = new FloorRepository();
  const buildingRepository = new BuildingTypeRepository();

  if (validatedBody.floor) {
    const floor: any = await floorRepository.findById(validatedBody.floor);
    validatedBody = { ...validatedBody, floor };
  }

  if (validatedBody.buldingType) {
    const buldingType: any = await buildingRepository.findById(
      validatedBody.buldingType
    );
    validatedBody = { ...validatedBody, buldingType };
  }

  const data: admin.firestore.DocumentData = await mechanicalElectricalRepository.update(
    validateParam.uid,
    validatedBody
  );
  const formatedData = {
    ...data,
    expiredtabung: data.expiredtabung.toDate(),
  };
  res.json({
    message: 'Successfully Update MechanicalElectrical',
    data: formatedData,
  });
};

export const getMechanicalElectricalById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'mechanicalElectricalId');
  const mechanicalElectricalRepository = new MechanicalElectricalRepository();
  const data: admin.firestore.DocumentData = await mechanicalElectricalRepository.findById(
    validateParam.uid
  );
  const formatedData = {
    ...data,
    expiredtabung: data.expiredtabung.toDate(),
  };
  res.json({
    message: 'Successfully Get MechanicalElectrical By Id',
    data: formatedData,
  });
};

export const getAllMechanicalElectrical = async (
  req: Request,
  res: Response
) => {
  let { page, limit } = req.query;
  const mechanicalElectricalRepository = new MechanicalElectricalRepository();
  const data = await mechanicalElectricalRepository.findAll(
    page as string,
    limit as string
  );
  const totalCount = await mechanicalElectricalRepository.countDocument();

  const formatedData = data.map((item: admin.firestore.DocumentData) => ({
    ...item,
    expiredtabung: item.expiredtabung.toDate(),
  }));
  res.json({
    message: 'Successfully Get MechanicalElectrical',
    data: formatedData,
    totalCount,
  });
};

export const deleteMechanicalElectricalById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'mechanicalElectricalId');
  const mechanicalElectricalRepository = new MechanicalElectricalRepository();
  const data = await mechanicalElectricalRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
