import { Request, Response } from 'express';
import paramValidation from '@utils/paramValidation';
import * as admin from 'firebase-admin';
import { formatDate } from '@utils/Date';
import yupValidate from '@utils/yupValidate';

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
  let formatedData = data;
  if (formatedData.tanggal) {
    formatedData = { ...data, tanggal: formatDate(data.tanggal.toDate()) };
  }

  res.json({
    message: 'Successfully Create Peralatan',
    data: formatedData,
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
  let formatedData = data;
  if (formatedData.tanggal) {
    formatedData = { ...data, tanggal: formatDate(data.tanggal.toDate()) };
  }

  res.json({
    message: 'Successfully Update Peralatan',
    data: formatedData,
  });
};

export const getPeralatanById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'peralatanId');
  const peralatanRepository = new PeralatanRepository();
  const data: admin.firestore.DocumentData = await peralatanRepository.findById(
    validateParam.uid
  );
  let formatedData = data;
  if (formatedData.tanggal) {
    formatedData = { ...data, tanggal: formatDate(data.tanggal.toDate()) };
  }

  res.json({
    message: 'Successfully Get Peralatan By Id',
    data: formatedData,
  });
};

export const getAllPeralatan = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const peralatanRepository = new PeralatanRepository();
  const data = await peralatanRepository.findAll(
    page as string,
    limit as string
  );
  const formatedData = data.map((item: admin.firestore.DocumentData) => {
    if (item.tanggal) {
      return {
        ...item,
        tanggal: formatDate(item.tanggal.toDate()),
      };
    }
    return item;
  });
  const totalCount = await peralatanRepository.countDocument();
  res.json({
    message: 'Successfully Get Peralatan',
    data: formatedData,
    totalCount,
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
