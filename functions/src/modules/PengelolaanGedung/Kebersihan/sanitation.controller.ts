import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import RuanganRepository from '@modules/MasterData/Ruangan/ruangan.repository';
import LocationRepository from '@modules/MasterData/Location/location.repository';

import schema from './sanitation.schema';
import SanitationRepository from './sanitation.repository';
import MappingBodyByType from './helpers/MappingBodyByType';
import { TypeSaranaPendukung } from './interface/sanitation.interface';

//yard
export const createYardSanitation = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.createYardSanitation, body);
  const sanitationRepository = new SanitationRepository();

  const data: admin.firestore.DocumentData = await sanitationRepository.createYardSanitation(
    validatedBody
  );

  res.json({
    message: 'Successfully Create Data',
    data,
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

  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const deleteYardSanitationById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const sanitationRepository = new SanitationRepository();

  const data = await sanitationRepository.deleteSubDocument(
    validateParam.uid,
    'yard',
    'pg_yard'
  );
  res.json({
    message: 'Successfully Delete By Id',
    data,
  });
};

export const getYardSanitationById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const sanitationRepository = new SanitationRepository();
  // const data: admin.firestore.DocumentData = await sanitationRepository.findSubdocumentById(
  //   validateParam.uid,
  //   'yard',
  //   'pg_yard'
  // );
  const data: admin.firestore.DocumentData = await sanitationRepository.findByIdElastic(
    validateParam.uid,
    'bri_corpu_pg_yards'
  );

  res.json({
    message: 'Successfully Get YardSanitationBy Id',
    data,
  });
};

export const getAllYardSanitation = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const sanitationRepository = new SanitationRepository();
  // const data = await sanitationRepository.findAllSubDocument(
  //   page as string,
  //   limit as string,
  //   'yard',
  //   'pg_yard',
  //   filtered as string,
  //   sorted as string
  // );
  // const totalCount = await sanitationRepository.countSubDocument(
  //   'yard',
  //   'pg_yard',
  //   filtered as string
  // );

  const { data, totalCount } = await sanitationRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string,
    'bri_corpu_pg_yards'
  );

  res.json({
    message: 'Successfully Get Water Meter',
    data,
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

  res.json({
    message: 'Successfully Create Data',
    data,
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

  res.json({
    message: 'Successfully Update Data',
    data,
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
    'smart_building',
    'pg_smart_building'
  );
  res.json({
    message: 'Successfully Delete By Id',
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
  // const data: admin.firestore.DocumentData = await sanitationRepository.findSubdocumentById(
  //   validateParam.uid,
  //   'smart_building',
  //   'pg_smart_building'
  // );
  const data: admin.firestore.DocumentData = await sanitationRepository.findByIdElastic(
    validateParam.uid,
    'bri_corpu_pg_smart_buildings'
  );
  res.json({
    message: 'Successfully Get SmartBuildingSanitation By Id',
    data,
  });
};

export const getAllSmartBuildingSanitation = async (
  req: Request,
  res: Response
) => {
  const { page, limit, filtered, sorted } = req.query;
  const sanitationRepository = new SanitationRepository();
  // const data = await sanitationRepository.findAllSubDocument(
  //   page as string,
  //   limit as string,
  //   'smart_building',
  //   'pg_smart_building',
  //   filtered as string,
  //   sorted as string
  // );
  // const totalCount = await sanitationRepository.countSubDocument(
  //   'smart_building',
  //   'pg_smart_building',
  //   filtered as string
  // );
  const { data, totalCount } = await sanitationRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string,
    'bri_corpu_pg_smart_buildings'
  );

  res.json({
    message: 'Successfully Get SmartBuildingSanitation',
    data,
    totalCount,
  });
};

//Innovation Building
export const createInnovationBuildingSanitation = async (
  req: Request,
  res: Response
) => {
  const { body } = req;
  const masterValidate = yupValidate(schema.baseCreateInnovationBuilding, body);
  let validatedBody: any = MappingBodyByType(
    masterValidate.typeInnovationBuilding,
    body
  );

  const locationRepository = new LocationRepository();
  const ruanganRepository = new RuanganRepository();
  const sanitationRepository = new SanitationRepository();

  if (validatedBody?.ruangan) {
    const ruangan: any = await ruanganRepository.findById(
      validatedBody.ruangan
    );
    validatedBody.ruangan = ruangan;
  }
  if (validatedBody?.location) {
    const location: any = await locationRepository.findById(
      validatedBody.location
    );
    validatedBody.location = location;
  }

  const data: admin.firestore.DocumentData = await sanitationRepository.createInnovationBuilding(
    validatedBody
  );

  res.json({
    message: 'Successfully Create Data',
    data,
  });
};

export const updateInnovationBuildingSanitation = async (
  req: Request,
  res: Response
) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  const locationRepository = new LocationRepository();
  const ruanganRepository = new RuanganRepository();
  const sanitationRepository = new SanitationRepository();
  const ref: admin.firestore.DocumentData = await sanitationRepository.findSubdocumentById(
    validateParam.uid,
    'innovation_building',
    'pg_innovation_building'
  );
  let validatedBody: any = MappingBodyByType(
    ref?.typeInnovationBuilding,
    body,
    'update'
  );
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

  const data: admin.firestore.DocumentData = await sanitationRepository.updateInnovationBuilding(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const deleteInnovationBuildingSanitationById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const sanitationRepository = new SanitationRepository();

  const data = await sanitationRepository.deleteSubDocument(
    validateParam.uid,
    'innovation_building',
    'pg_innovation_building'
  );
  res.json({
    message: 'Successfully Delete By Id',
    data,
  });
};
export const getInnovationBuildingSanitationById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const sanitationRepository = new SanitationRepository();
  // const data: admin.firestore.DocumentData = await sanitationRepository.findSubdocumentById(
  //   validateParam.uid,
  //   'innovation_building',
  //   'pg_innovation_building'
  // );
  const data: admin.firestore.DocumentData = await sanitationRepository.findByIdElastic(
    validateParam.uid,
    'bri_corpu_pg_innovation_buildings'
  );

  res.json({
    message: 'Successfully Get InnovationBuildingSanitation By Id',
    data,
  });
};

export const getAllInnovationBuildingSanitation = async (
  req: Request,
  res: Response
) => {
  const { page, limit, filtered, sorted } = req.query;
  const sanitationRepository = new SanitationRepository();
  // const data = await sanitationRepository.findAllSubDocument(
  //   page as string,
  //   limit as string,
  //   'innovation_building',
  //   'pg_innovation_building',
  //   filtered as string,
  //   sorted as string
  // );
  // const totalCount = await sanitationRepository.countSubDocument(
  //   'innovation_building',
  //   'pg_innovation_building',
  //   filtered as string
  // );
  const { data, totalCount } = await sanitationRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string,
    'bri_corpu_pg_innovation_buildings'
  );

  res.json({
    message: 'Successfully Get ac',
    data,
    totalCount,
  });
};
//Sarana Pendukung
export const createSaranaPendukungSanitation = async (
  req: Request,
  res: Response
) => {
  const { body } = req;
  const masterValidate = yupValidate(schema.createSaranaPendukung, body);
  let validatedBody = undefined;
  if (
    masterValidate?.typeSaranaPendukung?.toLowerCase() ===
    TypeSaranaPendukung['Musholla']?.toLowerCase()
  ) {
    validatedBody = yupValidate(schema.createMusholaSanitation, body);
  } else {
    validatedBody = yupValidate(schema.createSecurityPosSanitation, body);
  }
  const locationRepository = new LocationRepository();
  const sanitationRepository = new SanitationRepository();

  if (validatedBody?.location) {
    const location: any = await locationRepository.findById(
      validatedBody.location
    );
    validatedBody = { ...validatedBody, location };
  }

  const data: admin.firestore.DocumentData = await sanitationRepository.createSaranaPendukung(
    validatedBody
  );

  res.json({
    message: 'Successfully Create Data',
    data,
  });
};

export const updateSaranaPendukungSanitation = async (
  req: Request,
  res: Response
) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  const locationRepository = new LocationRepository();
  const sanitationRepository = new SanitationRepository();
  let validatedBody = undefined;

  const ref: admin.firestore.DocumentData = await sanitationRepository.findSubdocumentById(
    validateParam.uid,
    'sarana_pendukung',
    'pg_sarana_pendukung'
  );
  if (
    ref?.typeSaranaPendukung?.toLowerCase() ===
    TypeSaranaPendukung['Musholla']?.toLowerCase()
  ) {
    validatedBody = yupValidate(schema.createMusholaSanitation, body);
  } else {
    validatedBody = yupValidate(schema.createSecurityPosSanitation, body);
  }

  if (validatedBody.location) {
    const location: any = await locationRepository.findById(
      validatedBody.location
    );
    validatedBody = { ...validatedBody, location };
  }

  const data: admin.firestore.DocumentData = await sanitationRepository.updateSaranaPendukung(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const deleteSaranaPendukungSanitationById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const sanitationRepository = new SanitationRepository();

  const data = await sanitationRepository.deleteSubDocument(
    validateParam.uid,
    'sarana_pendukung',
    'pg_sarana_pendukung'
  );
  res.json({
    message: 'Successfully Delete By Id',
    data,
  });
};
export const getSaranaPendukungSanitationById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const sanitationRepository = new SanitationRepository();
  // const data: admin.firestore.DocumentData = await sanitationRepository.findSubdocumentById(
  //   validateParam.uid,
  //   'sarana_pendukung',
  //   'pg_sarana_pendukung'
  // );
  const data: admin.firestore.DocumentData = await sanitationRepository.findByIdElastic(
    validateParam.uid,
    'bri_corpu_pg_sarana_pendukungs'
  );

  res.json({
    message: 'Successfully Get SaranaPendukungSanitation By Id',
    data,
  });
};

export const getAllSaranaPendukungSanitation = async (
  req: Request,
  res: Response
) => {
  const { page, limit, filtered, sorted } = req.query;
  const sanitationRepository = new SanitationRepository();
  // const data = await sanitationRepository.findAllSubDocument(
  //   page as string,
  //   limit as string,
  //   'sarana_pendukung',
  //   'pg_sarana_pendukung',
  //   filtered as string,
  //   sorted as string
  // );
  // const totalCount = await sanitationRepository.countSubDocument(
  //   'sarana_pendukung',
  //   'pg_sarana_pendukung',
  //   filtered as string
  // );

  const { data, totalCount } = await sanitationRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string,
    'bri_corpu_pg_sarana_pendukungs'
  );
  res.json({
    message: 'Successfully Get SaranaPendukungSanitation',
    data,
    totalCount,
  });
};
