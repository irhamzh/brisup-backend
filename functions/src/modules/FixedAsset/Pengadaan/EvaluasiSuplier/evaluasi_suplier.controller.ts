import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import ProviderRepository from '@modules/MasterData/Provider/provider.repository';
import PengadaanRepository from '@modules/FixedAsset/Pengadaan/PengadaanBarang/pengadaan.repository';

import schema from '@modules/FixedAsset/Pengadaan/EvaluasiSuplier/evaluasi_suplier.schema';
import EvaluasiSuplierRepository from '@modules/FixedAsset/Pengadaan/EvaluasiSuplier/evaluasi_suplier.repository';

export const createEvaluasiSuplier = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);
  const evaluasiSuplierRepository = new EvaluasiSuplierRepository();

  const pengadaanRepository = new PengadaanRepository();
  const pengadaan = await pengadaanRepository.findById(validatedBody.pengadaan);
  let createParam = {
    ...validatedBody,
    pengadaan,
  };

  if (validatedBody?.provider) {
    const providerRepository = new ProviderRepository();
    const provider = await providerRepository.findById(validatedBody.provider);
    createParam = {
      ...createParam,
      provider,
    };
  }

  const data = await evaluasiSuplierRepository.create(createParam);
  res.json({
    message: 'Successfully Create Evaluasi Suplier',
    data,
  });
};

export const updateEvaluasiSuplier = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'evaluasiSuplierId');
  const validatedBody = yupValidate(schema.update, body);

  let createParam = validatedBody;
  if (validatedBody?.provider) {
    const providerRepository = new ProviderRepository();
    const provider = await providerRepository.findById(validatedBody.provider);
    createParam = { ...createParam, provider };
  }
  if (validatedBody?.pengadaan) {
    const pengadaanRepository = new PengadaanRepository();
    const pengadaan = await pengadaanRepository.findById(
      validatedBody.pengadaan
    );
    createParam = { ...createParam, pengadaan };
  }

  const evaluasiSuplierRepository = new EvaluasiSuplierRepository();
  const data = await evaluasiSuplierRepository.update(
    validateParam.uid,
    createParam
  );
  res.json({
    message: 'Successfully Update Evaluasi Suplier',
    data,
  });
};

export const getEvaluasiSuplierById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'evaluasiSuplierId');
  const evaluasiSuplierRepository = new EvaluasiSuplierRepository();
  const data = await evaluasiSuplierRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Evaluasi Suplier By Id',
    data,
  });
};

export const getAllEvaluasiSuplier = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const evaluasiSuplierRepository = new EvaluasiSuplierRepository();
  const data = await evaluasiSuplierRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await evaluasiSuplierRepository.countDocument(
    filtered as string
  );

  res.json({
    message: 'Successfully Get All Evaluasi Suplier',
    data,
    totalCount,
  });
};

export const deleteEvaluasiSuplierById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'evaluasiSuplierId');
  const evaluasiSuplierRepository = new EvaluasiSuplierRepository();
  const data = await evaluasiSuplierRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Evaluasi Suplier Delete By Id',
    data,
  });
};
