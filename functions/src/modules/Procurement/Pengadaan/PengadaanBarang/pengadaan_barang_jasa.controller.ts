import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import ProviderRepository from '@modules/MasterData/Provider/provider.repository';
import { IProviderBase } from '@modules/MasterData/Provider/interface/provider.interface';
import EducationRepository from '@modules/MasterData/Education/education.repository';
import { IEducationBase } from '@modules/MasterData/Education/interface/education.interface';

import schema from './pengadaan_barang_jasa.schema';
import {
  createMappingBodyByType,
  updateMappingBodyByType,
} from './helpers/MappingBodyByType';
import PengadaanRepository from './pengadaan_barang_jasa.repository';
// import {
//   IPembelianLangsung,
//   IPemilihanLangsung,
//   IPenunjukanLangsung,
// } from './interface/pengadaan_barang_jasa.interface';

export const createPengadaan = async (req: Request, res: Response) => {
  const { body } = req;
  const masterValidate = yupValidate(schema.baseCreate, body);
  const validatedBody = createMappingBodyByType(
    masterValidate.typePengadaan,
    body
  );

  const providerRepository = new ProviderRepository();
  const educationRepository = new EducationRepository();
  const pengadaanRepository = new PengadaanRepository();
  const provider: IProviderBase = await providerRepository.findById(
    validatedBody.provider
  );
  let createParam = undefined;
  createParam = { ...validatedBody, provider };

  if (createParam?.namaPendidikan) {
    const namaPendidikan: IEducationBase = await educationRepository.findById(
      createParam.namaPendidikan
    );
    createParam = { ...createParam, namaPendidikan };
  }
  const data = await pengadaanRepository.create(createParam);

  res.json({
    message: 'Successfully Create Data',
    data,
  });
};

export const updatePengadaan = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'id');
  const educationRepository = new EducationRepository();
  const providerRepository = new ProviderRepository();
  const pengadaanRepository = new PengadaanRepository();

  const ref = await pengadaanRepository.findById(validateParam.uid);
  const validatedBody = updateMappingBodyByType(ref?.typePengadaan, body);
  let createParam = undefined;
  createParam = { ...validatedBody };

  if (createParam.provider) {
    const provider: IProviderBase = await providerRepository.findById(
      createParam.provider
    );
    createParam = { ...createParam, provider };
  }
  if (createParam.namaPendidikan) {
    const namaPendidikan: IEducationBase = await educationRepository.findById(
      createParam.namaPendidikan
    );
    createParam = { ...createParam, namaPendidikan };
  }
  const data = await pengadaanRepository.update(validateParam.uid, createParam);
  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const deletePengadaanById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const pengadaanRepository = new PengadaanRepository();

  const data = await pengadaanRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete By Id',
    data,
  });
};
export const getPengadaanById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.findById(validateParam.uid);

  res.json({
    message: 'Successfully Get Pengadaan By Id',
    data,
  });
};

export const getAllPengadaan = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await pengadaanRepository.countDocument(
    filtered as string
  );

  res.json({
    message: 'Successfully Get AllPengadaan ',
    data,
    totalCount,
  });
};
