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

  res.json({
    message: 'Successfully Get YardSanitationBy Id',
    data,
  });
};

export const getAllYardSanitation = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const sanitationRepository = new SanitationRepository();
  const data = await sanitationRepository.findAllSubDocument(
    page as string,
    limit as string,
    'yard',
    'pg-yard',
    filtered as string,
    sorted as string
  );
  const totalCount = await sanitationRepository.countSubDocument(
    'yard',
    'pg-yard',
    filtered as string
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
  const data = await sanitationRepository.findAllSubDocument(
    page as string,
    limit as string,
    'smart-building',
    'pg-smart-building',
    filtered as string,
    sorted as string
  );
  const totalCount = await sanitationRepository.countSubDocument(
    'smart-building',
    'pg-smart-building',
    filtered as string
  );

  res.json({
    message: 'Successfully Get ac',
    data,
    totalCount,
  });
};

// // Sarana Pendukung
// //Mushola

// export const createMusholaSanitation = async (req: Request, res: Response) => {
//   const { body } = req;
//   const validatedBody = yupValidate(schema.createMusholaSanitation, body);

//   const locationRepository = new LocationRepository();
//   const sanitationRepository = new SanitationRepository();

//   const location: any = await locationRepository.findById(
//     validatedBody.location
//   );

//   const createParam = {
//     ...validatedBody,
//     location,
//   };

//   const data: admin.firestore.DocumentData = await sanitationRepository.createMusholaSanitation(
//     createParam
//   );
//   const formatedData = {
//     ...data,
//     tanggal: data.tanggal.toDate(),
//   };

//   res.json({
//     message: 'Successfully Create Data',
//     data: formatedData,
//   });
// };

// export const updateMusholaSanitation = async (req: Request, res: Response) => {
//   const { body, params } = req;
//   const validateParam = paramValidation(params, 'id');
//   let validatedBody = yupValidate(schema.updateMusholaSanitation, body);

//   const locationRepository = new LocationRepository();
//   const sanitationRepository = new SanitationRepository();

//   if (validatedBody.location) {
//     const location: any = await locationRepository.findById(
//       validatedBody.location
//     );
//     validatedBody = { ...validatedBody, location };
//   }

//   const data: admin.firestore.DocumentData = await sanitationRepository.updateMusholaSanitation(
//     validateParam.uid,
//     validatedBody
//   );
//   const formatedData = {
//     ...data,
//     tanggal: data.tanggal.toDate(),
//   };
//   res.json({
//     message: 'Successfully Update Data',
//     data: formatedData,
//   });
// };

// export const deleteMusholaSanitationById = async (
//   req: Request,
//   res: Response
// ) => {
//   const { params } = req;
//   const validateParam = paramValidation(params, 'id');
//   const sanitationRepository = new SanitationRepository();

//   const data = await sanitationRepository.delete2LevelSubDocument(
//     validateParam.uid,
//     'saran-pendukung',
//     'pg-saran-pendukung',
//     'mushola',
//     'pg-mushola'
//   );
//   res.json({
//     message: 'SuccessfullyDeleteBy Id',
//     data,
//   });
// };
// export const getMusholaSanitationById = async (req: Request, res: Response) => {
//   const { params } = req;
//   const validateParam = paramValidation(params, 'id');
//   const sanitationRepository = new SanitationRepository();
//   const data: admin.firestore.DocumentData = await sanitationRepository.find2LevelSubDocumentById(
//     validateParam.uid,
//     'saran-pendukung',
//     'pg-saran-pendukung',
//     'mushola',
//     'pg-mushola'
//   );

//   const formatedData = {
//     ...data,
//     tanggal: data.tanggal.toDate(),
//   };

//   res.json({
//     message: 'Successfully Get MusholaSanitation By Id',
//     data: formatedData,
//   });
// };

// export const getAllMusholaSanitation = async (req: Request, res: Response) => {
//   let { page, limit } = req.query;
//   const sanitationRepository = new SanitationRepository();
//   const data = await sanitationRepository.findAll2LevelSubDocument(
//     page as string,
//     limit as string,
//     'saran-pendukung',
//     'pg-saran-pendukung',
//     'mushola',
//     'pg-mushola'
//   );
//   const totalCount = await sanitationRepository.count2LevelSubDocument(
//     'saran-pendukung',
//     'pg-saran-pendukung',
//     'mushola',
//     'pg-mushola'
//   );
//   const formatedData = data.map((item: admin.firestore.DocumentData) => ({
//     ...item,
//     tanggal: item.tanggal.toDate(),
//   }));
//   res.json({
//     message: 'Successfully Get ac',
//     data: formatedData,
//     totalCount,
//   });
// };

// //Security-POS
// export const createSecurityPosSanitation = async (
//   req: Request,
//   res: Response
// ) => {
//   const { body } = req;
//   const validatedBody = yupValidate(schema.createSecurityPosSanitation, body);

//   const locationRepository = new LocationRepository();
//   const sanitationRepository = new SanitationRepository();

//   const location: any = await locationRepository.findById(
//     validatedBody.location
//   );

//   const createParam = {
//     ...validatedBody,
//     location,
//   };

//   const data: admin.firestore.DocumentData = await sanitationRepository.createSecurityPosSanitation(
//     createParam
//   );
//   const formatedData = {
//     ...data,
//     tanggal: data.tanggal.toDate(),
//   };

//   res.json({
//     message: 'Successfully Create Data',
//     data: formatedData,
//   });
// };

// export const updateSecurityPosSanitation = async (
//   req: Request,
//   res: Response
// ) => {
//   const { body, params } = req;
//   const validateParam = paramValidation(params, 'id');
//   let validatedBody = yupValidate(schema.updateSecurityPosSanitation, body);

//   const locationRepository = new LocationRepository();
//   const sanitationRepository = new SanitationRepository();

//   if (validatedBody.location) {
//     const location: any = await locationRepository.findById(
//       validatedBody.location
//     );
//     validatedBody = { ...validatedBody, location };
//   }

//   const data: admin.firestore.DocumentData = await sanitationRepository.updateSecurityPosSanitation(
//     validateParam.uid,
//     validatedBody
//   );
//   const formatedData = {
//     ...data,
//     tanggal: data.tanggal.toDate(),
//   };
//   res.json({
//     message: 'Successfully Update Data',
//     data: formatedData,
//   });
// };

// export const deleteSecurityPosSanitationById = async (
//   req: Request,
//   res: Response
// ) => {
//   const { params } = req;
//   const validateParam = paramValidation(params, 'id');
//   const sanitationRepository = new SanitationRepository();

//   const data = await sanitationRepository.delete2LevelSubDocument(
//     validateParam.uid,
//     'saran-pendukung',
//     'pg-saran-pendukung',
//     'security-pos',
//     'pg-security-pos'
//   );
//   res.json({
//     message: 'SuccessfullyDeleteBy Id',
//     data,
//   });
// };
// export const getSecurityPosSanitationById = async (
//   req: Request,
//   res: Response
// ) => {
//   const { params } = req;
//   const validateParam = paramValidation(params, 'id');
//   const sanitationRepository = new SanitationRepository();
//   const data: admin.firestore.DocumentData = await sanitationRepository.find2LevelSubDocumentById(
//     validateParam.uid,
//     'saran-pendukung',
//     'pg-saran-pendukung',
//     'security-pos',
//     'pg-security-pos'
//   );

//   const formatedData = {
//     ...data,
//     tanggal: data.tanggal.toDate(),
//   };

//   res.json({
//     message: 'Successfully Get SecurityPosSanitation By Id',
//     data: formatedData,
//   });
// };

// export const getAllSecurityPosSanitation = async (
//   req: Request,
//   res: Response
// ) => {
//   let { page, limit } = req.query;
//   const sanitationRepository = new SanitationRepository();
//   const data = await sanitationRepository.findAll2LevelSubDocument(
//     page as string,
//     limit as string,
//     'saran-pendukung',
//     'pg-saran-pendukung',
//     'security-pos',
//     'pg-security-pos'
//   );
//   const totalCount = await sanitationRepository.count2LevelSubDocument(
//     'saran-pendukung',
//     'pg-saran-pendukung',
//     'security-pos',
//     'pg-security-pos'
//   );
//   const formatedData = data.map((item: admin.firestore.DocumentData) => ({
//     ...item,
//     tanggal: item.tanggal.toDate(),
//   }));
//   res.json({
//     message: 'Successfully Get ac',
//     data: formatedData,
//     totalCount,
//   });
// };

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
    'innovation-building',
    'pg-innovation-building'
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
    'innovation-building',
    'pg-innovation-building'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
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
  const data: admin.firestore.DocumentData = await sanitationRepository.findSubdocumentById(
    validateParam.uid,
    'innovation-building',
    'pg-innovation-building'
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
  const data = await sanitationRepository.findAllSubDocument(
    page as string,
    limit as string,
    'innovation-building',
    'pg-innovation-building',
    filtered as string,
    sorted as string
  );
  const totalCount = await sanitationRepository.countSubDocument(
    'innovation-building',
    'pg-innovation-building',
    filtered as string
  );

  res.json({
    message: 'Successfully Get ac',
    data,
    totalCount,
  });
};
//sdsdsd
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
    'sarana-pendukung',
    'pg-sarana-pendukung'
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
    'sarana-pendukung',
    'pg-sarana-pendukung'
  );
  res.json({
    message: 'SuccessfullyDeleteBy Id',
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
  const data: admin.firestore.DocumentData = await sanitationRepository.findSubdocumentById(
    validateParam.uid,
    'sarana-pendukung',
    'pg-sarana-pendukung'
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
  const data = await sanitationRepository.findAllSubDocument(
    page as string,
    limit as string,
    'sarana-pendukung',
    'pg-sarana-pendukung',
    filtered as string,
    sorted as string
  );
  const totalCount = await sanitationRepository.countSubDocument(
    'sarana-pendukung',
    'pg-sarana-pendukung',
    filtered as string
  );

  res.json({
    message: 'Successfully Get ac',
    data,
    totalCount,
  });
};
