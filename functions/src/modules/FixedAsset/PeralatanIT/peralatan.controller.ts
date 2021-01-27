import { Request, Response } from 'express';
import paramValidation from '@utils/paramValidation';
import * as admin from 'firebase-admin';
import yupValidate from '@utils/yupValidate';

import schema from './peralatan.schema';
import PeralatanRepository from './peralatan.repository';
import { JenisPeralatan } from './interface/peralatan.interface';
import JenisPcRepostiory from '@modules/MasterData/JenisPC/jenis_pc.repository';
import RuanganRepository from '@modules/MasterData/Ruangan/ruangan.repository';

export const createPeralatan = async (req: Request, res: Response) => {
  const { body } = req;
  let validatedBody = undefined;
  if (
    body?.jenisPeralatan?.toLowerCase() ===
    JenisPeralatan['Infocus']?.toLowerCase()
  ) {
    validatedBody = yupValidate(schema.createInfocus, body);
  } else if (
    body?.jenisPeralatan?.toLowerCase() === JenisPeralatan['PC']?.toLowerCase()
  ) {
    const jenisPCRepository = new JenisPcRepostiory();
    validatedBody = yupValidate(schema.createPc, body);
    const jenisPc: any = await jenisPCRepository.findById(
      validatedBody.jenisPc
    );
    validatedBody = { ...validatedBody, jenisPc };
  } else {
    validatedBody = yupValidate(schema.create, body);
  }
  const ruanganRepository = new RuanganRepository();
  const ruangan: any = await ruanganRepository.findById(validatedBody.ruangan);

  const createParam = {
    ...validatedBody,
    ruangan,
  };
  const peralatanRepository = new PeralatanRepository();
  const data: admin.firestore.DocumentData = await peralatanRepository.create(
    createParam
  );

  res.json({
    message: 'Successfully Create Peralatan',
    data,
  });
};

export const updatePeralatan = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'peralatanId');
  let validatedBody = undefined;
  const peralatanRepository = new PeralatanRepository();
  const ref: admin.firestore.DocumentData = await peralatanRepository.findById(
    validateParam.uid
  );
  if (
    ref?.jenisPeralatan?.toLowerCase() ===
    JenisPeralatan['Infocus']?.toLowerCase()
  ) {
    validatedBody = yupValidate(schema.updateInfocus, body);
  } else if (
    ref?.jenisPeralatan?.toLowerCase() === JenisPeralatan['PC']?.toLowerCase()
  ) {
    validatedBody = yupValidate(schema.updatePc, body);

    if (validatedBody.jenisPc) {
      const jenisPCRepository = new JenisPcRepostiory();
      const jenisPc = await jenisPCRepository.findById(validatedBody.jenisPc);
      validatedBody = { ...validatedBody, jenisPc };
    }
  } else {
    validatedBody = yupValidate(schema.update, body);
  }
  let createParam = validatedBody;
  if (validatedBody.ruangan) {
    const ruanganRepository = new RuanganRepository();
    const ruangan = await ruanganRepository.findById(validatedBody.ruangan);
    createParam = {
      ...validatedBody,
      ruangan,
    };
  }
  const data: admin.firestore.DocumentData = await peralatanRepository.update(
    validateParam.uid,
    createParam
  );

  res.json({
    message: 'Successfully Update Peralatan',
    data,
  });
};

export const deletePeralatanById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'peralatanId');
  const peralatanRepository = new PeralatanRepository();
  const data = await peralatanRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Peralatan By Id',
    data,
  });
};

export const importExcel = async (req: any, res: Response) => {
  const { files, body } = req;
  const validatedBody = yupValidate(schema.checkJenisBarang, body);
  const peralatanRepository = new PeralatanRepository();

  let schemaValid = undefined;
  if (
    validatedBody.jenisPeralatan?.toLowerCase() ===
    JenisPeralatan['Infocus']?.toLowerCase()
  ) {
    schemaValid = schema.createInfocus;
  } else if (
    validatedBody.jenisPeralatan?.toLowerCase() ===
    JenisPeralatan['PC']?.toLowerCase()
  ) {
    schemaValid = schema.createPc;
  } else {
    schemaValid = schema.create;
  }

  const invalidRow = await peralatanRepository.importExcelPeralatan(
    files,
    {
      '*': '{{columnHeader}}',
    },
    schemaValid,
    validatedBody
  );

  res.json({
    message: 'Successfully Import Peralatan IT',
    invalidRow,
  });
};

export const getPeralatanById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'peralatanId');
  const peralatanRepository = new PeralatanRepository();
  const data: admin.firestore.DocumentData = await peralatanRepository.findByIdElastic(
    validateParam.uid
  );

  res.json({
    message: 'Successfully Get All Peralatan By Id',
    data,
  });
};

export const getAllPeralatan = async (req: Request, res: Response) => {
  let { page, limit, filtered, sorted } = req.query;
  const peralatanRepository = new PeralatanRepository();
  const { data, totalCount } = await peralatanRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );

  // const totalCount = await peralatanRepository.countDocument(
  //   filtered as string
  // );
  res.json({
    message: 'Successfully Get Peralatan',
    data,
    totalCount,
  });
};
