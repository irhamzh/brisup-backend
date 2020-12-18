import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import { StatusPengadaan } from '@constants/BaseCondition';

import ProviderRepository from '@modules/MasterData/Provider/provider.repository';
import { IProviderBase } from '@modules/MasterData/Provider/interface/provider.interface';
import EducationRepository from '@modules/MasterData/Education/education.repository';
import { IEducationBase } from '@modules/MasterData/Education/interface/education.interface';
import { IUserBase } from '@modules/MasterData/User/interface/user.interface';
import AccessError from '@interfaces/AccessError';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import validationWording from '@constants/validationWording';

import schema from './pengadaan_barang_jasa.schema';
import {
  createMappingBodyByType,
  updateMappingBodyByType,
} from './helpers/MappingBodyByType';
import PengadaanRepository from './pengadaan_barang_jasa.repository';

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
  createParam = {
    ...validatedBody,
    provider,
    isDraft: false,
    status: StatusPengadaan['Belum Berjalan'],
  };

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
  // @ts-ignore
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

export const getAllPengadaanFull = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const pengadaanRepository = new PengadaanRepository();
  const { data, totalCount } = await pengadaanRepository.getPengadaanFull(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );

  res.json({
    message: 'Successfully Get AllPengadaan',
    data,
    totalCount,
  });
};

export const approveProcess = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');

  const pengadaanRepository = new PengadaanRepository();
  const ref = await pengadaanRepository.findById(validateParam.uid);
  if (ref.status !== StatusPengadaan['Belum Berjalan']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(
        ref.status,
        StatusPengadaan['Proses Persetujuan']
      ),
      'Pengadaan'
    );
  }

  const data = await pengadaanRepository.update(validateParam.uid, {
    status: StatusPengadaan['Proses Persetujuan'],
  });
  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const approveWabag = async (req: Request, res: Response) => {
  const user: IUserBase = res.locals.decoded;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');

  if (!user || user?.role?.name !== 'Wakil Kepala Bagian') {
    throw new AccessError('Approve Wakil Kepala Bagian');
  }

  const pengadaanRepository = new PengadaanRepository();
  const ref = await pengadaanRepository.findById(validateParam.uid);
  if (ref.status !== StatusPengadaan['Proses Persetujuan']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(
        ref.status,
        StatusPengadaan['Approved oleh Wakabag']
      ),
      'Pengadaan'
    );
  }
  const data = await pengadaanRepository.update(validateParam.uid, {
    status: StatusPengadaan['Approved oleh Wakabag'],
  });
  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const approveKabag = async (req: Request, res: Response) => {
  const user: IUserBase = res.locals.decoded;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');

  if (!user || user?.role?.name !== 'Kepala Bagian') {
    throw new AccessError('Approve Kepala Bagian');
  }

  const pengadaanRepository = new PengadaanRepository();
  const ref = await pengadaanRepository.findById(validateParam.uid);
  if (ref.status !== StatusPengadaan['Approved oleh Wakabag']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(
        ref.status,
        StatusPengadaan['Approved oleh Kabag']
      ),
      'Pengadaan'
    );
  }

  const data = await pengadaanRepository.update(validateParam.uid, {
    status: StatusPengadaan['Approved oleh Kabag'],
  });
  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const approveFinish = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');

  const pengadaanRepository = new PengadaanRepository();
  const ref = await pengadaanRepository.findById(validateParam.uid);
  if (ref.status !== StatusPengadaan['Approved oleh Kabag']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(
        ref.status,
        StatusPengadaan['Selesai']
      ),
      'Pengadaan'
    );
  }

  const data = await pengadaanRepository.update(validateParam.uid, {
    status: StatusPengadaan['Selesai'],
  });
  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const dashboard = async (req: Request, res: Response) => {
  const { filtered } = req.query;
  const defaultFiltered = filtered ? JSON.parse(filtered as string) : [];
  const pengadaanRepository = new PengadaanRepository();
  const totalBelumBerjalan =
    (await pengadaanRepository.countDocument(
      JSON.stringify([
        ...defaultFiltered,
        { id: 'status', value: StatusPengadaan['Belum Berjalan'] },
      ])
    )) || 0;
  const totalProsesPersetujuan =
    (await pengadaanRepository.countDocument(
      JSON.stringify([
        ...defaultFiltered,
        { id: 'status', value: StatusPengadaan['Proses Persetujuan'] },
      ])
    )) || 0;
  const totalApprovedWakabag =
    (await pengadaanRepository.countDocument(
      JSON.stringify([
        ...defaultFiltered,
        { id: 'status', value: StatusPengadaan['Approved oleh Wakabag'] },
      ])
    )) || 0;
  const totalApprovedKabag =
    (await pengadaanRepository.countDocument(
      JSON.stringify([
        ...defaultFiltered,
        { id: 'status', value: StatusPengadaan['Approved oleh Kabag'] },
      ])
    )) || 0;
  const totalSelesai =
    (await pengadaanRepository.countDocument(
      JSON.stringify([
        ...defaultFiltered,
        { id: 'status', value: StatusPengadaan['Selesai'] },
      ])
    )) || 0;
  const data = {
    totalBelumBerjalan,
    totalProsesPersetujuan:
      Number(totalProsesPersetujuan) + Number(totalApprovedWakabag) || 0,
    totalApprovedWakabag,
    totalApprovedKabag,
    totalBelumSelesai: totalApprovedKabag,
    totalSelesai,
  };
  res.json({
    message: 'Successfully getDashboard',
    data,
  });
};
