import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import WaterMeterRepository from '@modules/MasterData/WaterMater/water_meter.repository';
import FloorRepository from '@modules/Floor/floor.repository';
import PumpRepository from '@modules/MasterData/Pump/pump.repository';
import BuildingRepository from '@modules/MasterData/Building/building.repository';
import PumpUnitRepository from '@modules/MasterData/PumpUnit/pump_unit.repository';
import CompressorRepository from '@modules/MasterData/Compressor/compressor.repository';

import schema from './basement.schema';
import EngineerBasementRepository from './basement.repository';

export const createWaterMeter = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.createWaterMeter, body);

  const waterMeterRepository = new WaterMeterRepository();
  const engineerBasementRepository = new EngineerBasementRepository();

  const waterMeter: any = await waterMeterRepository.findById(
    validatedBody.waterMeter
  );
  const createParam = {
    ...validatedBody,
    waterMeter,
  };

  const data: admin.firestore.DocumentData = await engineerBasementRepository.createWaterMeter(
    createParam
  );

  res.json({
    message: 'Successfully Create MechanicalElectrical',
    data,
  });
};

export const updateWaterMeter = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.updateWaterMeter, body);

  const waterMeterRepository = new WaterMeterRepository();
  const engineerBasementRepository = new EngineerBasementRepository();

  if (validatedBody.waterMeter) {
    const waterMeter: any = await waterMeterRepository.findById(
      validatedBody.waterMeter
    );
    validatedBody = { ...validatedBody, waterMeter };
  }

  const data: admin.firestore.DocumentData = await engineerBasementRepository.updateWaterMeter(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update MechanicalElectrical',
    data,
  });
};

export const deleteWaterMeterById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const engineerBasementRepository = new EngineerBasementRepository();

  const data = await engineerBasementRepository.deleteSubDocument(
    validateParam.uid,
    'water-meter',
    'pg-water-meters'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};

export const getWaterMeterById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const engineerBasementRepository = new EngineerBasementRepository();
  const data: admin.firestore.DocumentData = await engineerBasementRepository.findSubdocumentById(
    validateParam.uid,
    'water-meter',
    'pg-water-meters'
  );

  res.json({
    message: 'Successfully Get WaterMeterBy Id',
    data,
  });
};

export const getAllWaterMeter = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const engineerBasementRepository = new EngineerBasementRepository();
  const data = await engineerBasementRepository.findAllSubDocument(
    page as string,
    limit as string,
    'water-meter',
    'pg-water-meters',
    filtered as string,
    sorted as string
  );
  const totalCount = await engineerBasementRepository.countSubDocument(
    'water-meter',
    'pg-water-meters',
    filtered as string
  );

  res.json({
    message: 'Successfully Get Water Meter',
    data,
    totalCount,
  });
};

//electrify

export const createElectrify = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.createElectrify, body);

  const engineerBasementRepository = new EngineerBasementRepository();

  const data: admin.firestore.DocumentData = await engineerBasementRepository.createElectrify(
    validatedBody
  );

  res.json({
    message: 'Successfully Create MechanicalElectrical',
    data,
  });
};

export const updateElectrify = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  const validatedBody = yupValidate(schema.updateElectrify, body);

  const engineerBasementRepository = new EngineerBasementRepository();

  const data: admin.firestore.DocumentData = await engineerBasementRepository.updateElectrify(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update MechanicalElectrical',
    data,
  });
};

export const deleteElectrifyById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const engineerBasementRepository = new EngineerBasementRepository();

  const data = await engineerBasementRepository.deleteSubDocument(
    validateParam.uid,
    'electricity',
    'pg-electricities'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};

export const getElectrifyById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const engineerBasementRepository = new EngineerBasementRepository();
  const data: admin.firestore.DocumentData = await engineerBasementRepository.findSubdocumentById(
    validateParam.uid,
    'electricity',
    'pg-electricities'
  );

  res.json({
    message: 'Successfully Get ElectrifyBy Id',
    data,
  });
};

export const getAllElectrify = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const engineerBasementRepository = new EngineerBasementRepository();
  const data = await engineerBasementRepository.findAllSubDocument(
    page as string,
    limit as string,
    'electricity',
    'pg-electricities',
    filtered as string,
    sorted as string
  );
  const totalCount = await engineerBasementRepository.countSubDocument(
    'electricity',
    'pg-electricities',
    filtered as string
  );

  res.json({
    message: 'Successfully Get Electricity',
    data,
    totalCount,
  });
};

//ac
export const createAC = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.createAC, body);

  const compressorRepository = new CompressorRepository();
  const buildingRepository = new BuildingRepository();
  const floorRepository = new FloorRepository();
  const engineerBasementRepository = new EngineerBasementRepository();

  const compressor: any = await compressorRepository.findById(
    validatedBody.compressor
  );
  const floor: any = await floorRepository.findById(validatedBody.floor);
  const building: any = await buildingRepository.findById(
    validatedBody.building
  );

  const createParam = {
    ...validatedBody,
    compressor,
    floor,
    building,
  };

  const data: admin.firestore.DocumentData = await engineerBasementRepository.createAC(
    createParam
  );

  res.json({
    message: 'Successfully Create MechanicalElectrical',
    data,
  });
};

export const updateAC = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.updateAC, body);

  const compressorRepository = new CompressorRepository();
  const buildingRepository = new BuildingRepository();
  const floorRepository = new FloorRepository();
  const engineerBasementRepository = new EngineerBasementRepository();

  if (validatedBody.compressor) {
    const compressor: any = await compressorRepository.findById(
      validatedBody.compressor
    );
    validatedBody = { ...validatedBody, compressor };
  }
  if (validatedBody.building) {
    const building: any = await buildingRepository.findById(
      validatedBody.building
    );
    validatedBody = { ...validatedBody, building };
  }
  if (validatedBody.floor) {
    const floor: any = await floorRepository.findById(validatedBody.floor);
    validatedBody = { ...validatedBody, floor };
  }

  const data: admin.firestore.DocumentData = await engineerBasementRepository.updateAC(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update MechanicalElectrical',
    data,
  });
};

export const deleteACById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const engineerBasementRepository = new EngineerBasementRepository();

  const data = await engineerBasementRepository.deleteSubDocument(
    validateParam.uid,
    'ac',
    'pg-acs'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
export const getACById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const engineerBasementRepository = new EngineerBasementRepository();
  const data: admin.firestore.DocumentData = await engineerBasementRepository.findSubdocumentById(
    validateParam.uid,
    'ac',
    'pg-acs'
  );

  res.json({
    message: 'Successfully Get AC By Id',
    data,
  });
};

export const getAllAC = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const engineerBasementRepository = new EngineerBasementRepository();
  const data = await engineerBasementRepository.findAllSubDocument(
    page as string,
    limit as string,
    'ac',
    'pg-acs',
    filtered as string,
    sorted as string
  );
  const totalCount = await engineerBasementRepository.countSubDocument(
    'ac',
    'pg-acs',
    filtered as string
  );

  res.json({
    message: 'Successfully Get ac',
    data,
    totalCount,
  });
};

//plumbing

export const createPlumbing = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.createPlumbing, body);

  const pumpRepository = new PumpRepository();
  const unitRepository = new PumpUnitRepository();
  const engineerBasementRepository = new EngineerBasementRepository();

  const pump: any = await pumpRepository.findById(validatedBody.pump);
  const unit: any = await unitRepository.findById(validatedBody.unit);

  const createParam = {
    ...validatedBody,
    pump,
    unit,
  };

  const data: admin.firestore.DocumentData = await engineerBasementRepository.createPlumbing(
    createParam
  );

  res.json({
    message: 'Successfully Create MechanicalElectrical',
    data,
  });
};

export const updatePlumbing = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.updatePlumbing, body);

  const pumpRepository = new PumpRepository();
  const unitRepository = new PumpUnitRepository();
  const engineerBasementRepository = new EngineerBasementRepository();

  if (validatedBody.pump) {
    const pump: any = await pumpRepository.findById(validatedBody.pump);
    validatedBody = { ...validatedBody, pump };
  }
  if (validatedBody.unit) {
    const unit: any = await unitRepository.findById(validatedBody.unit);
    validatedBody = { ...validatedBody, unit };
  }

  const data: admin.firestore.DocumentData = await engineerBasementRepository.updatePlumbing(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update MechanicalElectrical',
    data,
  });
};

export const deletePlumbingById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const engineerBasementRepository = new EngineerBasementRepository();

  const data = await engineerBasementRepository.deleteSubDocument(
    validateParam.uid,
    'plumbing',
    'pg-plumbings'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};

export const getPlumbingById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const engineerBasementRepository = new EngineerBasementRepository();
  const data: admin.firestore.DocumentData = await engineerBasementRepository.findSubdocumentById(
    validateParam.uid,
    'plumbing',
    'pg-plumbings'
  );

  res.json({
    message: 'Successfully Get AC By Id',
    data,
  });
};

export const getAllPlumbing = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const engineerBasementRepository = new EngineerBasementRepository();
  const data = await engineerBasementRepository.findAllSubDocument(
    page as string,
    limit as string,
    'plumbing',
    'pg-plumbings',
    filtered as string,
    sorted as string
  );
  const totalCount = await engineerBasementRepository.countSubDocument(
    'plumbing',
    'pg-plumbing',
    filtered as string
  );

  res.json({
    message: 'Successfully Get plumbing',
    data,
    totalCount,
  });
};

//stp

export const createSTP = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.createSTP, body);

  const engineerBasementRepository = new EngineerBasementRepository();

  const data: admin.firestore.DocumentData = await engineerBasementRepository.createSTP(
    validatedBody
  );

  res.json({
    message: 'Successfully Create MechanicalElectrical',
    data,
  });
};

export const updateSTP = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  const validatedBody = yupValidate(schema.updateSTP, body);

  const engineerBasementRepository = new EngineerBasementRepository();

  const data: admin.firestore.DocumentData = await engineerBasementRepository.updateSTP(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update MechanicalElectrical',
    data,
  });
};

export const deleteSTPById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const engineerBasementRepository = new EngineerBasementRepository();

  const data = await engineerBasementRepository.deleteSubDocument(
    validateParam.uid,
    'stp',
    'pg-stps'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};

export const getSTPById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const engineerBasementRepository = new EngineerBasementRepository();
  const data: admin.firestore.DocumentData = await engineerBasementRepository.findSubdocumentById(
    validateParam.uid,
    'stp',
    'pg-stps'
  );

  res.json({
    message: 'Successfully Get AC By Id',
    data,
  });
};

export const getAllSTP = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const engineerBasementRepository = new EngineerBasementRepository();
  const data = await engineerBasementRepository.findAllSubDocument(
    page as string,
    limit as string,
    'stp',
    'pg-stps',
    filtered as string,
    sorted as string
  );
  const totalCount = await engineerBasementRepository.countSubDocument(
    'stp',
    'pg-stps',
    filtered as string
  );
  res.json({
    message: 'Successfully Get stp',
    data,
    totalCount,
  });
};
