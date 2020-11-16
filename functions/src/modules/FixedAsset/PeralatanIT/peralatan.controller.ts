import { Request, Response } from 'express';
import paramValidation from '@utils/paramValidation';
import * as admin from 'firebase-admin';

import schema from './peralatan.schema';
import PeralatanRepository from './peralatan.repository';
import { JenisPeralatan } from './interface/peralatan.interface';
import JenisPcRepostiory from '@modules/JenisPC/jenis_pc.repository';
import RuanganRepository from '@modules/Ruangan/ruangan.repository';
export const createPeralatan = async (req: Request, res: Response) => {
  const { body } = req;
  let validatedBody = undefined;
  if (
    body?.jenisPeralatan?.toLowerCase() ===
    JenisPeralatan['Infocus']?.toLowerCase()
  ) {
    validatedBody = schema.createInfocus.validateSync(body);
  } else if (
    body?.jenisPeralatan?.toLowerCase() === JenisPeralatan['PC']?.toLowerCase()
  ) {
    const jenisPCRepository = new JenisPcRepostiory();
    validatedBody = schema.createPc.validateSync(body);
    const jenisPc: any = await jenisPCRepository.findById(
      validatedBody.jenisPc
    );
    validatedBody = { ...validatedBody, jenisPc };
  } else {
    validatedBody = schema.create.validateSync(body);
  }
  const ruanganRepository = new RuanganRepository();
  const ruangan: any = await ruanganRepository.findById(validatedBody.ruangan);

  const createParam = {
    ...validatedBody,
    ruangan,
  };
  const peralatanRepository = new PeralatanRepository();
  const data = await peralatanRepository.create(createParam);
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
    validatedBody = schema.updateInfocus.validateSync(body);
  } else if (
    ref?.jenisPeralatan?.toLowerCase() === JenisPeralatan['PC']?.toLowerCase()
  ) {
    validatedBody = schema.updatePc.validateSync(body);
    if (validatedBody.jenisPc) {
      const jenisPCRepository = new JenisPcRepostiory();
      const jenisPc = await jenisPCRepository.findById(validatedBody.jenisPc);
      validatedBody = { ...validatedBody, jenisPc };
    }
  } else {
    validatedBody = schema.update.validateSync(body);
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
  const data = await peralatanRepository.update(validateParam.uid, createParam);
  res.json({
    message: 'Successfully Update Peralatan',
    data,
  });
};

export const getPeralatanById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'peralatanId');
  const peralatanRepository = new PeralatanRepository();
  const data = await peralatanRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Peralatan By Id',
    data,
  });
};

export const getAllPeralatan = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const peralatanRepository = new PeralatanRepository();
  const data = await peralatanRepository.findAll(
    page as string,
    limit as string
  );
  res.json({
    message: 'Successfully Get Peralatan',
    data,
  });
};

export const deletePeralatanById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'peralatanId');
  const peralatanRepository = new PeralatanRepository();
  const data = await peralatanRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
