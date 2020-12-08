import { Request, Response } from 'express';
import schema from '@modules/FixedAsset/Pengadaan/TandaTerimaBarang/tanda_terima_barang.schema';

import TandaTerimaBarangRepository from '@modules/FixedAsset/Pengadaan/TandaTerimaBarang/tanda_terima_barang.repository';
import ProviderRepository from '@modules/MasterData/Provider/provider.repository';
import PengadaanRepository from '@modules/FixedAsset/Pengadaan/PengadaanBarang/pengadaan.repository';

import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

export const createTandaTerimaBarang = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const tandaTerimaBarang = new TandaTerimaBarangRepository();
  const providerRepository = new ProviderRepository();
  const provider: any = await providerRepository.findById(
    validatedBody.provider
  );
  const pengadaanRepository = new PengadaanRepository();
  const pengadaan: any = await pengadaanRepository.findById(
    validatedBody.pengadaan
  );
  const createParam = {
    ...validatedBody,
    provider,
    pengadaan,
  };

  const data = await tandaTerimaBarang.create(createParam);
  res.json({
    message: 'Successfully Create Tanda Terima Barang',
    data,
  });
};

export const updateTandaTerimaBarang = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'tandaTerimaBarangId');
  const validatedBody = yupValidate(schema.update, body);
  let createParam: any = validatedBody;
  // delete createParam.provider;
  if (validatedBody.provider) {
    const providerRepository = new ProviderRepository();
    const provider: any = await providerRepository.findById(
      validatedBody.provider
    );
    createParam = { ...createParam, provider };
  }
  if (validatedBody.pengadaan) {
    const pengadaanRepository = new PengadaanRepository();
    const pengadaan: any = await pengadaanRepository.findById(
      validatedBody.pengadaan
    );
    createParam = { ...createParam, pengadaan };
  }

  const tandaTerimaBarang = new TandaTerimaBarangRepository();
  const data = await tandaTerimaBarang.update(validateParam.uid, createParam);
  res.json({
    message: 'Successfully Update Tanda Terima Barang',
    data,
  });
};

export const getTandaTerimaBarangById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'tandaTerimaBarangId');
  const tandaTerimaBarang = new TandaTerimaBarangRepository();
  const data = await tandaTerimaBarang.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Tanda Terima Barang By Id',
    data,
  });
};

export const getAllTandaTerimaBarang = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const tandaTerimaBarang = new TandaTerimaBarangRepository();
  const data = await tandaTerimaBarang.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await tandaTerimaBarang.countDocument(filtered as string);
  res.json({
    message: 'Successfully Get All Tanda Terima Barang',
    data,
    totalCount,
  });
};

export const deleteTandaTerimaBarangById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'tandaTerimaBarangId');
  const tandaTerimaBarang = new TandaTerimaBarangRepository();
  const data = await tandaTerimaBarang.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Tanda Terima Barang By Id',
    data,
  });
};
