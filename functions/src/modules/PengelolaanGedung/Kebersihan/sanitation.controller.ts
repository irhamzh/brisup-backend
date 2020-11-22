import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
// import YardSanitationRepository from '@modules/MasterData/WaterMater/water_meter.repository';
// import FloorRepository from '@modules/Floor/floor.repository';
// import PumpRepository from '@modules/MasterData/Pump/pump.repository';
// import BuildingRepository from '@modules/MasterData/Building/location.repository';
// import PumpUnitRepository from '@modules/MasterData/PumpUnit/pump_unit.repository';
// import CompressorRepository from '@modules/MasterData/Compressor/ruangan.repository';
import LocationRepository from '@modules/MasterData/Location/location.repository';
import RuanganRepository from '@modules/Ruangan/ruangan.repository';

import schema from './sanitation.schema';
import SanitationRepository from './sanitation.repository';

//yard
export const createYardSanitation = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.createYardSanitation, body);
  const sanitationRepository = new SanitationRepository();

  const data: admin.firestore.DocumentData = await sanitationRepository.createYardSanitation(
    validatedBody
  );
  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };

  res.json({
    message: 'Successfully Create Data',
    data: formatedData,
  });
};

export const updateYardSanitation = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  const validatedBody = yupValidate(schema.updateYardSanitation, body);
  const sanitationRepository = new SanitationRepository();

  const data: admin.firestore.DocumentData = await sanitationRepository.updateYardSanitation(
    validateParam.uid,
    validatedBody
  );
  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };

  res.json({
    message: 'Successfully Update Data',
    data: formatedData,
  });
};

export const deleteYardSanitationById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const sanitationRepository = new SanitationRepository();

  const data = await sanitationRepository.deleteSubDocument(
    validateParam.uid,
    'yard',
    'pg-yard'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};

export const getYardSanitationById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const sanitationRepository = new SanitationRepository();
  const data: admin.firestore.DocumentData = await sanitationRepository.findSubdocumentById(
    validateParam.uid,
    'yard',
    'pg-yard'
  );
  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };

  res.json({
    message: 'Successfully Get YardSanitationBy Id',
    data: formatedData,
  });
};

export const getAllYardSanitation = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const sanitationRepository = new SanitationRepository();
  const data = await sanitationRepository.findAllSubDocument(
    page as string,
    limit as string,
    'yard',
    'pg-yard'
  );
  const totalCount = await sanitationRepository.countSubDocument(
    'yard',
    'pg-yard'
  );
  const formatedData = data.map((item: admin.firestore.DocumentData) => ({
    ...item,
    tanggal: item.tanggal.toDate(),
  }));
  res.json({
    message: 'Successfully Get Water Meter',
    data: formatedData,
    totalCount,
  });
};

// Smart Building
export const createSmartBuildingSanitation = async (
  req: Request,
  res: Response
) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.createSmartBuildingSanitation, body);

  const locationRepository = new LocationRepository();
  const ruanganRepository = new RuanganRepository();
  const sanitationRepository = new SanitationRepository();

  const ruangan: any = await ruanganRepository.findById(validatedBody.ruangan);
  const location: any = await locationRepository.findById(
    validatedBody.location
  );

  const createParam = {
    ...validatedBody,
    ruangan,
    location,
  };

  const data: admin.firestore.DocumentData = await sanitationRepository.createSmartBuildingSanitation(
    createParam
  );
  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };

  res.json({
    message: 'Successfully Create Data',
    data: formatedData,
  });
};

export const updateSmartBuildingSanitation = async (
  req: Request,
  res: Response
) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.updateSmartBuildingSanitation, body);

  const locationRepository = new LocationRepository();
  const ruanganRepository = new RuanganRepository();
  const sanitationRepository = new SanitationRepository();

  if (validatedBody.ruangan) {
    const ruangan: any = await ruanganRepository.findById(
      validatedBody.ruangan
    );
    validatedBody = { ...validatedBody, ruangan };
  }
  if (validatedBody.location) {
    const location: any = await locationRepository.findById(
      validatedBody.location
    );
    validatedBody = { ...validatedBody, location };
  }

  const data: admin.firestore.DocumentData = await sanitationRepository.updateSmartBuildingSanitation(
    validateParam.uid,
    validatedBody
  );
  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };
  res.json({
    message: 'Successfully Update Data',
    data: formatedData,
  });
};

export const deleteSmartBuildingSanitationById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const sanitationRepository = new SanitationRepository();

  const data = await sanitationRepository.deleteSubDocument(
    validateParam.uid,
    'smart-building',
    'pg-smart-building'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
export const getSmartBuildingSanitationById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const sanitationRepository = new SanitationRepository();
  const data: admin.firestore.DocumentData = await sanitationRepository.findSubdocumentById(
    validateParam.uid,
    'smart-building',
    'pg-smart-building'
  );

  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };

  res.json({
    message: 'Successfully Get SmartBuildingSanitation By Id',
    data: formatedData,
  });
};

export const getAllSmartBuildingSanitation = async (
  req: Request,
  res: Response
) => {
  let { page, limit } = req.query;
  const sanitationRepository = new SanitationRepository();
  const data = await sanitationRepository.findAllSubDocument(
    page as string,
    limit as string,
    'smart-building',
    'pg-smart-building'
  );
  const totalCount = await sanitationRepository.countSubDocument(
    'smart-building',
    'pg-smart-building'
  );
  const formatedData = data.map((item: admin.firestore.DocumentData) => ({
    ...item,
    tanggal: item.tanggal.toDate(),
  }));
  res.json({
    message: 'Successfully Get ac',
    data: formatedData,
    totalCount,
  });
};

// Sarana Pendukung
//Mushola

export const createMusholaSanitation = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.createMusholaSanitation, body);

  const locationRepository = new LocationRepository();
  const sanitationRepository = new SanitationRepository();

  const location: any = await locationRepository.findById(
    validatedBody.location
  );

  const createParam = {
    ...validatedBody,
    location,
  };

  const data: admin.firestore.DocumentData = await sanitationRepository.createMusholaSanitation(
    createParam
  );
  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };

  res.json({
    message: 'Successfully Create Data',
    data: formatedData,
  });
};

export const updateMusholaSanitation = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.updateMusholaSanitation, body);

  const locationRepository = new LocationRepository();
  const sanitationRepository = new SanitationRepository();

  if (validatedBody.location) {
    const location: any = await locationRepository.findById(
      validatedBody.location
    );
    validatedBody = { ...validatedBody, location };
  }

  const data: admin.firestore.DocumentData = await sanitationRepository.updateMusholaSanitation(
    validateParam.uid,
    validatedBody
  );
  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };
  res.json({
    message: 'Successfully Update Data',
    data: formatedData,
  });
};

export const deleteMusholaSanitationById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const sanitationRepository = new SanitationRepository();

  const data = await sanitationRepository.delete2LevelSubDocument(
    validateParam.uid,
    'saran-pendukung',
    'pg-saran-pendukung',
    'mushola',
    'pg-mushola'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
export const getMusholaSanitationById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const sanitationRepository = new SanitationRepository();
  const data: admin.firestore.DocumentData = await sanitationRepository.find2LevelSubDocumentById(
    validateParam.uid,
    'saran-pendukung',
    'pg-saran-pendukung',
    'mushola',
    'pg-mushola'
  );

  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };

  res.json({
    message: 'Successfully Get MusholaSanitation By Id',
    data: formatedData,
  });
};

export const getAllMusholaSanitation = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const sanitationRepository = new SanitationRepository();
  const data = await sanitationRepository.findAll2LevelSubDocument(
    page as string,
    limit as string,
    'saran-pendukung',
    'pg-saran-pendukung',
    'mushola',
    'pg-mushola'
  );
  const totalCount = await sanitationRepository.count2LevelSubDocument(
    'saran-pendukung',
    'pg-saran-pendukung',
    'mushola',
    'pg-mushola'
  );
  const formatedData = data.map((item: admin.firestore.DocumentData) => ({
    ...item,
    tanggal: item.tanggal.toDate(),
  }));
  res.json({
    message: 'Successfully Get ac',
    data: formatedData,
    totalCount,
  });
};

//Security-POS
export const createSecurityPosSanitation = async (
  req: Request,
  res: Response
) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.createSecurityPosSanitation, body);

  const locationRepository = new LocationRepository();
  const sanitationRepository = new SanitationRepository();

  const location: any = await locationRepository.findById(
    validatedBody.location
  );

  const createParam = {
    ...validatedBody,
    location,
  };

  const data: admin.firestore.DocumentData = await sanitationRepository.createSecurityPosSanitation(
    createParam
  );
  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };

  res.json({
    message: 'Successfully Create Data',
    data: formatedData,
  });
};

export const updateSecurityPosSanitation = async (
  req: Request,
  res: Response
) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  let validatedBody = yupValidate(schema.updateSecurityPosSanitation, body);

  const locationRepository = new LocationRepository();
  const sanitationRepository = new SanitationRepository();

  if (validatedBody.location) {
    const location: any = await locationRepository.findById(
      validatedBody.location
    );
    validatedBody = { ...validatedBody, location };
  }

  const data: admin.firestore.DocumentData = await sanitationRepository.updateSecurityPosSanitation(
    validateParam.uid,
    validatedBody
  );
  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };
  res.json({
    message: 'Successfully Update Data',
    data: formatedData,
  });
};

export const deleteSecurityPosSanitationById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const sanitationRepository = new SanitationRepository();

  const data = await sanitationRepository.delete2LevelSubDocument(
    validateParam.uid,
    'saran-pendukung',
    'pg-saran-pendukung',
    'security-pos',
    'pg-security-pos'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
export const getSecurityPosSanitationById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const sanitationRepository = new SanitationRepository();
  const data: admin.firestore.DocumentData = await sanitationRepository.find2LevelSubDocumentById(
    validateParam.uid,
    'saran-pendukung',
    'pg-saran-pendukung',
    'security-pos',
    'pg-security-pos'
  );

  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };

  res.json({
    message: 'Successfully Get SecurityPosSanitation By Id',
    data: formatedData,
  });
};

export const getAllSecurityPosSanitation = async (
  req: Request,
  res: Response
) => {
  let { page, limit } = req.query;
  const sanitationRepository = new SanitationRepository();
  const data = await sanitationRepository.findAll2LevelSubDocument(
    page as string,
    limit as string,
    'saran-pendukung',
    'pg-saran-pendukung',
    'security-pos',
    'pg-security-pos'
  );
  const totalCount = await sanitationRepository.count2LevelSubDocument(
    'saran-pendukung',
    'pg-saran-pendukung',
    'security-pos',
    'pg-security-pos'
  );
  const formatedData = data.map((item: admin.firestore.DocumentData) => ({
    ...item,
    tanggal: item.tanggal.toDate(),
  }));
  res.json({
    message: 'Successfully Get ac',
    data: formatedData,
    totalCount,
  });
};
