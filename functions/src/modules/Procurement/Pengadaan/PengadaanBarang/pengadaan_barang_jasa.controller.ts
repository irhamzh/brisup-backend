import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import ProviderRepository from '@modules/MasterData/Provider/provider.repository';
import EducationRepository from '@modules/MasterData/Education/education.repository';

import schema from './pengadaan_barang_jasa.schema';
import PengadaanRepository from './pengadaan_barang_jasa.repository';
import MappingBodyByType from './helpers/MappingBodyByType';

export const createPengadaan = async (req: Request, res: Response) => {
  const { body } = req;
  const masterValidate = yupValidate(schema.baseCreate, body);
  let validatedBody: any = MappingBodyByType(
    masterValidate.typePengadaan,
    body
  );

  const educationRepository = new EducationRepository();
  const providerRepository = new ProviderRepository();
  const pengadaanRepository = new PengadaanRepository();

  if (validatedBody?.provider) {
    const provider: any = await providerRepository.findById(
      validatedBody.provider
    );
    validatedBody.provider = provider;
  }
  if (validatedBody?.namaPendidikan) {
    const namaPendidikan: any = await educationRepository.findById(
      validatedBody.namaPendidikan
    );
    validatedBody.namaPendidikan = namaPendidikan;
  }

  const data = await pengadaanRepository.create(validatedBody);

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
  let validatedBody: any = MappingBodyByType(
    ref?.typePengadaan,
    body,
    'update'
  );
  if (validatedBody.provider) {
    const provider: any = await providerRepository.findById(
      validatedBody.provider
    );
    validatedBody = { ...validatedBody, provider };
  }
  if (validatedBody.namaPendidikan) {
    const namaPendidikan: any = await educationRepository.findById(
      validatedBody.namaPendidikan
    );
    validatedBody = { ...validatedBody, namaPendidikan };
  }

  const data = await pengadaanRepository.update(
    validateParam.uid,
    validatedBody
  );

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
