import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import validationWording from '@constants/validationWording';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import ProviderRepository from '@modules/MasterData/Provider/provider.repository';
import EducationRepository from '@modules/MasterData/Education/education.repository';

import { StatusPengadaan } from '@constants/BaseCondition';
import { IProviderBase } from '@modules/MasterData/Provider/interface/provider.interface';
import { IEducationBase } from '@modules/MasterData/Education/interface/education.interface';
// import { IUserBase } from '@modules/MasterData/User/interface/user.interface';

import schema from './pengadaan_barang_jasa.schema';
import {
  createMappingBodyByType,
  updateMappingBodyByType,
} from './helpers/MappingBodyByType';
import PengadaanRepository from './pengadaan_barang_jasa.repository';

export const createPengadaan = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const { body } = req;
  const masterValidate = yupValidate(schema.baseCreate, body);
  const validatedBody = createMappingBodyByType(
    masterValidate.typePengadaan,
    body
  );

  const status = StatusPengadaan['Belum Berjalan'];
  const log = {
    date: new Date(),
    userId: user.uid,
    name: user.name,
    role: user.role.name,
    status,
  };

  let createParam = undefined;
  createParam = {
    ...validatedBody,
    isDraft: false,
    status,
  };

  if (createParam?.provider) {
    const providerRepository = new ProviderRepository();
    const provider: IProviderBase = await providerRepository.findById(
      createParam.provider
    );
    createParam = { ...createParam, provider };
  }

  if (createParam?.namaPendidikan) {
    const educationRepository = new EducationRepository();
    const namaPendidikan: IEducationBase = await educationRepository.findById(
      createParam.namaPendidikan
    );
    createParam = { ...createParam, namaPendidikan };
  }

  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.create({
    ...createParam,
    status,
    approvalLog: [log],
  });

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

  if (createParam?.provider) {
    const provider: IProviderBase = await providerRepository.findById(
      createParam.provider
    );
    createParam = { ...createParam, provider };
  }
  if (createParam?.namaPendidikan) {
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
  const user = res.locals.decoded;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const status = StatusPengadaan['Proses Persetujuan'];

  const pengadaanRepository = new PengadaanRepository();
  const ref = await pengadaanRepository.findById(validateParam.uid);
  if (ref.status !== StatusPengadaan['Belum Berjalan']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(ref.status, status),
      'Pengadaan'
    );
  }
  const log = {
    date: new Date(),
    userId: user.uid,
    name: user.name,
    role: user.role.name,
    status,
  };

  const data = await pengadaanRepository.update(validateParam.uid, {
    status,
    approvalLog: [...ref.approvalLog, log],
  });
  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const approveSupervisor = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const status = StatusPengadaan['Approved oleh Supervisor'];

  const pengadaanRepository = new PengadaanRepository();
  const ref = await pengadaanRepository.findById(validateParam.uid);
  if (ref.status !== StatusPengadaan['Proses Persetujuan']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(ref.status, status),
      'Pengadaan'
    );
  }

  const log = {
    date: new Date(),
    userId: user.uid,
    name: user.name,
    role: user.role.name,
    status,
  };

  const data = await pengadaanRepository.update(validateParam.uid, {
    status,
    approvalLog: [...ref.approvalLog, log],
  });

  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const approveWabag = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const status = StatusPengadaan['Approved oleh Wakabag'];

  const pengadaanRepository = new PengadaanRepository();
  const ref = await pengadaanRepository.findById(validateParam.uid);
  if (ref.status !== StatusPengadaan['Approved oleh Supervisor']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(ref.status, status),
      'Pengadaan'
    );
  }

  const log = {
    date: new Date(),
    userId: user.uid,
    name: user.name,
    role: user.role.name,
    status,
  };

  const data = await pengadaanRepository.update(validateParam.uid, {
    status,
    approvalLog: [...ref.approvalLog, log],
  });

  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const approveKabag = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const status = StatusPengadaan['Approved oleh Kabag'];

  const pengadaanRepository = new PengadaanRepository();
  const ref = await pengadaanRepository.findById(validateParam.uid);
  if (ref.status !== StatusPengadaan['Approved oleh Supervisor']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(ref.status, status),
      'Pengadaan'
    );
  }

  const log = {
    date: new Date(),
    userId: user.uid,
    name: user.name,
    role: user.role.name,
    status,
  };

  const data = await pengadaanRepository.update(validateParam.uid, {
    status,
    approvalLog: [...ref.approvalLog, log],
  });

  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const approveFinish = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const status = StatusPengadaan['Selesai'];

  const pengadaanRepository = new PengadaanRepository();
  const ref = await pengadaanRepository.findById(validateParam.uid);
  if (
    ref.status !== StatusPengadaan['Approved oleh Kabag'] ||
    ref.status !== StatusPengadaan['Approved oleh Wakabag']
  ) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(ref.status, status),
      'Pengadaan'
    );
  }

  const log = {
    date: new Date(),
    userId: user.uid,
    name: user.name,
    role: user.role.name,
    status,
  };

  const data = await pengadaanRepository.update(validateParam.uid, {
    status,
    approvalLog: [...ref.approvalLog, log],
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
