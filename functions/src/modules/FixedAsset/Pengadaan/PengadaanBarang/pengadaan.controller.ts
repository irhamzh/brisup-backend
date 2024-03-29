import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

import schema from './pengadaan.schema';
import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import PengadaanRepository from './pengadaan.repository';
import { StatusPengadaan } from '@constants/BaseCondition';
// import { IUserBase } from '@modules/MasterData/User/interface/user.interface';
import AccessError from '@interfaces/AccessError';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import validationWording from '@constants/validationWording';

export const getAllPengadaan = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const pengadaanRepository = new PengadaanRepository();
  const { data, totalCount } = await pengadaanRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );

  // const totalCount = await pengadaanRepository.countDocument(
  //   filtered as string
  // );

  res.json({
    message: 'Successfully Get All Pengadaan',
    data,
    totalCount,
  });
};

//Pengadaan Jasa Konsultan - Seleksi Langsung
export const createKonsultanSeleksiLangsung = async (
  req: Request,
  res: Response
) => {
  const user = res.locals.decoded;
  const { body } = req;
  const validatedBody = yupValidate(
    schema.createKonsultanSeleksiLangsung,
    body
  );
  const pengadaanRepository = new PengadaanRepository();
  const data: admin.firestore.DocumentData = await pengadaanRepository.createPengadaan(
    validatedBody,
    'konsultan',
    'Seleksi Langsung',
    user,
    validatedBody?.provider
  );

  res.json({
    message: 'Successfully Create Pengadaan Jasa Konsultan Seleksi Langsung',
    data: data,
  });
};

export const updateKonsultanSeleksiLangsung = async (
  req: Request,
  res: Response
) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'pengadaanId');
  const validatedBody = yupValidate(
    schema.updateKonsultanSeleksiLangsung,
    body
  );
  const pengadaanRepository = new PengadaanRepository();
  const data: admin.firestore.DocumentData = await pengadaanRepository.updatePengadaan(
    validateParam.uid,
    validatedBody,
    'konsultan',
    'Seleksi Langsung',
    validatedBody?.provider
  );

  res.json({
    message: 'Successfully Update Pengadaan',
    data: data,
  });
};

export const getPengadaanKonsultanSeleksiLangsungById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'pengadaanId');
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.findOneById(
    validateParam.uid,
    'konsultan',
    'Seleksi Langsung'
  );
  res.json({
    message: 'Successfully Get Pengadaan By Id',
    data,
  });
};

export const getAllPengadaanKonsultanSeleksiLangsung = async (
  req: Request,
  res: Response
) => {
  const { page, limit } = req.query;
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.findAllPengadaan(
    page as string,
    limit as string,
    'konsultan',
    'Seleksi Langsung'
  );
  const totalCount = await pengadaanRepository.countDocumentPengadaan(
    'konsultan',
    'Seleksi Langsung'
  );

  res.json({
    message: 'Successfully Get Pengadaan',
    data,
    totalCount,
  });
};

//Pengadaan Jasa Konsultan - Penunjukan Langsung
export const createKonsultanPenunjukanLangsung = async (
  req: Request,
  res: Response
) => {
  const user = res.locals.decoded;
  const { body } = req;
  const validatedBody = yupValidate(
    schema.createKonsultanPenunjukanLangsung,
    body
  );
  const pengadaanRepository = new PengadaanRepository();
  const data: admin.firestore.DocumentData = await pengadaanRepository.createPengadaan(
    validatedBody,
    'konsultan',
    'Penunjukan Langsung',
    user,
    validatedBody?.provider
  );
  res.json({
    message:
      'Successfully Create Pengadaan Jasa Konsultan Penunjukan  Langsung',
    data: data,
  });
};

export const updateKonsultanPenunjukanLangsung = async (
  req: Request,
  res: Response
) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'pengadaanId');
  const validatedBody = yupValidate(
    schema.updateKonsultanPenunjukanLangsung,
    body
  );
  const pengadaanRepository = new PengadaanRepository();
  const data: admin.firestore.DocumentData = await pengadaanRepository.updatePengadaan(
    validateParam.uid,
    validatedBody,
    'konsultan',
    'Penunjukan Langsung',
    validatedBody?.provider
  );

  res.json({
    message: 'Successfully Update Pengadaan',
    data: data,
  });
};

export const getPengadaanKonsultanPenunjukanLangsungById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'pengadaanId');
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.findOneById(
    validateParam.uid,
    'konsultan',
    'Penunjukan Langsung'
  );
  res.json({
    message: 'Successfully Get Pengadaan By Id',
    data,
  });
};

export const getAllPengadaanKonsultanPenunjukanLangsung = async (
  req: Request,
  res: Response
) => {
  let { page, limit } = req.query;
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.findAllPengadaan(
    page as string,
    limit as string,
    'konsultan',
    'Penunjukan Langsung'
  );
  const totalCount = await pengadaanRepository.countDocumentPengadaan(
    'konsultan',
    'Penunjukan Langsung'
  );

  res.json({
    message: 'Successfully Get Pengadaan',
    data,
    totalCount,
  });
};

//Pengadaan Barang dan/atau Jasa (IT & Non IT) - Swakelola
export const createBarangSwakelola = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const { body } = req;
  const validatedBody = yupValidate(schema.createSwakelolaPembelian, body);
  const pengadaanRepository = new PengadaanRepository();
  const data: admin.firestore.DocumentData = await pengadaanRepository.createPengadaan(
    validatedBody,
    'barang',
    'Swakelola',
    user,
    validatedBody?.provider
  );
  res.json({
    message: 'Successfully Create Pengadaan Jasa Barang Swakelola',
    data: data,
  });
};

export const updateBarangSwakelola = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'pengadaanId');
  const validatedBody = yupValidate(schema.updateSwakelolaPembelian, body);
  const pengadaanRepository = new PengadaanRepository();
  const data: admin.firestore.DocumentData = await pengadaanRepository.updatePengadaan(
    validateParam.uid,
    validatedBody,
    'barang',
    'Swakelola',
    validatedBody?.provider
  );

  res.json({
    message: 'Successfully Update Pengadaan',
    data: data,
  });
};

export const getPengadaanBarangSwakelolaById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'pengadaanId');
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.findOneById(
    validateParam.uid,
    'barang',
    'Swakelola'
  );
  res.json({
    message: 'Successfully Get Pengadaan By Id',
    data,
  });
};

export const getAllPengadaanBarangSwakelola = async (
  req: Request,
  res: Response
) => {
  let { page, limit } = req.query;
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.findAllPengadaan(
    page as string,
    limit as string,
    'barang',
    'Swakelola'
  );
  const totalCount = await pengadaanRepository.countDocumentPengadaan(
    'barang',
    'Swakelola'
  );

  res.json({
    message: 'Successfully Get Pengadaan',
    data,
    totalCount,
  });
};

//Pengadaan Barang dan/atau Jasa (IT & Non IT) - Pembelian Langsung
export const createBarangPembelianLangsung = async (
  req: Request,
  res: Response
) => {
  const user = res.locals.decoded;
  const { body } = req;
  const validatedBody = yupValidate(schema.createSwakelolaPembelian, body);
  const pengadaanRepository = new PengadaanRepository();
  const data: admin.firestore.DocumentData = await pengadaanRepository.createPengadaan(
    validatedBody,
    'barang',
    'Pembelian Langsung',
    user,
    validatedBody?.provider
  );
  res.json({
    message: 'Successfully Create Pengadaan Jasa Barang Pembelian Langsung',
    data: data,
  });
};

export const updateBarangPembelianLangsung = async (
  req: Request,
  res: Response
) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'pengadaanId');
  const validatedBody = yupValidate(schema.updateSwakelolaPembelian, body);
  const pengadaanRepository = new PengadaanRepository();
  const data: admin.firestore.DocumentData = await pengadaanRepository.updatePengadaan(
    validateParam.uid,
    validatedBody,
    'barang',
    'Pembelian Langsung',
    validatedBody?.provider
  );

  res.json({
    message: 'Successfully Update Pengadaan',
    data: data,
  });
};

export const getPengadaanBarangPembelianLangsungById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'pengadaanId');
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.findOneById(
    validateParam.uid,
    'barang',
    'Pembelian Langsung'
  );
  res.json({
    message: 'Successfully Get Pengadaan By Id',
    data,
  });
};

export const getAllPengadaanBarangPembelianLangsung = async (
  req: Request,
  res: Response
) => {
  let { page, limit } = req.query;
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.findAllPengadaan(
    page as string,
    limit as string,
    'barang',
    'Pembelian Langsung'
  );
  const totalCount = await pengadaanRepository.countDocumentPengadaan(
    'barang',
    'Pembelian Langsung'
  );

  res.json({
    message: 'Successfully Get Pengadaan',
    data,
    totalCount,
  });
};

//Pengadaan Barang dan/atau Jasa (IT & Non IT) - Penunjukan Langsung
export const createBarangPenunjukanLangsung = async (
  req: Request,
  res: Response
) => {
  const user = res.locals.decoded;
  const { body } = req;
  const validatedBody = yupValidate(
    schema.createBarangPenunjukanLangsung,
    body
  );
  const pengadaanRepository = new PengadaanRepository();
  const data: admin.firestore.DocumentData = await pengadaanRepository.createPengadaan(
    validatedBody,
    'barang',
    'Penunjukan Langsung',
    user,
    validatedBody?.provider
  );
  res.json({
    message:
      'Successfully Create Pengadaan Pengadaan Jasa Barang Penunjukan Langsung',
    data: data,
  });
};

export const updateBarangPenunjukanLangsung = async (
  req: Request,
  res: Response
) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'pengadaanId');
  const validatedBody = yupValidate(
    schema.updateBarangPenunjukanLangsung,
    body
  );
  const pengadaanRepository = new PengadaanRepository();
  const data: admin.firestore.DocumentData = await pengadaanRepository.updatePengadaan(
    validateParam.uid,
    validatedBody,
    'barang',
    'Penunjukan Langsung',
    validatedBody?.provider
  );

  res.json({
    message: 'Successfully Update Pengadaan',
    data: data,
  });
};

export const getPengadaanBarangPenunjukanLangsungById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'pengadaanId');
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.findOneById(
    validateParam.uid,
    'barang',
    'Penunjukan Langsung'
  );
  res.json({
    message: 'Successfully Get Pengadaan By Id',
    data,
  });
};

export const getAllPengadaanBarangPenunjukanLangsung = async (
  req: Request,
  res: Response
) => {
  let { page, limit } = req.query;
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.findAllPengadaan(
    page as string,
    limit as string,
    'barang',
    'Penunjukan Langsung'
  );
  const totalCount = await pengadaanRepository.countDocumentPengadaan(
    'barang',
    'Penunjukan Langsung'
  );

  res.json({
    message: 'Successfully Get Pengadaan',
    data,
    totalCount,
  });
};

//Pengadaan Barang dan/atau Jasa (IT & Non IT) - Pemilihan Langsung
export const createBarangPemilihanLangsung = async (
  req: Request,
  res: Response
) => {
  const user = res.locals.decoded;
  const { body } = req;
  const validatedBody = yupValidate(schema.createBarangPemilihanLangsung, body);
  const pengadaanRepository = new PengadaanRepository();
  const data: admin.firestore.DocumentData = await pengadaanRepository.createPengadaan(
    validatedBody,
    'barang',
    'Pemilihan Langsung',
    user,
    validatedBody?.provider
  );
  res.json({
    message: 'Successfully Create Pengadaan Jasa Barang Pemilihan Langsung',
    data: data,
  });
};

export const updateBarangPemilihanLangsung = async (
  req: Request,
  res: Response
) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'pengadaanId');
  const validatedBody = yupValidate(schema.updateBarangPemilihanLangsung, body);
  const pengadaanRepository = new PengadaanRepository();
  const data: admin.firestore.DocumentData = await pengadaanRepository.updatePengadaan(
    validateParam.uid,
    validatedBody,
    'barang',
    'Pemilihan Langsung',
    validatedBody?.provider
  );

  res.json({
    message: 'Successfully Update Pengadaan',
    data: data,
  });
};

export const getPengadaanBarangPemilihanLangsungById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'pengadaanId');
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.findOneById(
    validateParam.uid,
    'barang',
    'Pemilihan Langsung'
  );
  res.json({
    message: 'Successfully Get Pengadaan By Id',
    data,
  });
};

export const getAllPengadaanBarangPemilihanLangsung = async (
  req: Request,
  res: Response
) => {
  let { page, limit } = req.query;
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.findAllPengadaan(
    page as string,
    limit as string,
    'barang',
    'Pemilihan Langsung'
  );
  const totalCount = await pengadaanRepository.countDocumentPengadaan(
    'barang',
    'Pemilihan Langsung'
  );

  res.json({
    message: 'Successfully Get Pengadaan',
    data,
    totalCount,
  });
};

//Pengadaan Barang dan/atau Jasa (IT & Non IT) - Lelang
export const createBarangLelang = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const { body } = req;
  const validatedBody = yupValidate(schema.createBarangLelang, body);
  const pengadaanRepository = new PengadaanRepository();
  const data: admin.firestore.DocumentData = await pengadaanRepository.createPengadaan(
    validatedBody,
    'barang',
    'Lelang',
    user,
    validatedBody?.provider
  );
  res.json({
    message: 'Successfully Create Pengadaan Jasa Barang Lelang',
    data: data,
  });
};

export const updateBarangLelang = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'pengadaanId');
  const validatedBody = yupValidate(schema.updateBarangLelang, body);
  const pengadaanRepository = new PengadaanRepository();
  const data: admin.firestore.DocumentData = await pengadaanRepository.updatePengadaan(
    validateParam.uid,
    validatedBody,
    'barang',
    'Lelang',
    validatedBody?.provider
  );

  res.json({
    message: 'Successfully Update Pengadaan',
    data: data,
  });
};

export const getPengadaanBarangLelangById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'pengadaanId');
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.findOneById(
    validateParam.uid,
    'barang',
    'Lelang'
  );
  res.json({
    message: 'Successfully Get Pengadaan By Id',
    data,
  });
};

export const getAllPengadaanBarangLelang = async (
  req: Request,
  res: Response
) => {
  let { page, limit } = req.query;
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.findAllPengadaan(
    page as string,
    limit as string,
    'barang',
    'Lelang'
  );
  const totalCount = await pengadaanRepository.countDocumentPengadaan(
    'barang',
    'Lelang'
  );

  res.json({
    message: 'Successfully Get Pengadaan',
    data,
    totalCount,
  });
};

export const deletePengadaanById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'pengadaanId');
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Pengadaan By Id',
    data,
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
      validationWording.invalidNextStatus(
        ref.status,
        StatusPengadaan['Approved oleh Kabag']
      ),
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

export const approveKabagWakabag = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const role = user?.role;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');

  let status = '';
  if (role['fixedAsset']['approvalKabag']) {
    status = StatusPengadaan['Approved oleh Kabag'];
  } else if (role['fixedAsset']['approvalWakabag']) {
    status = StatusPengadaan['Approved oleh Wakabag'];
  } else {
    throw new AccessError(
      'Approve Wakil Kepala Bagian | Approve Kepala Bagian Fixed Asset'
    );
  }

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
    role: role.name,
    status,
  };

  const data = await pengadaanRepository.update(validateParam.uid, {
    status,
    approvalLog: [...ref.approvalLog, log],
  });

  res.json({
    message: 'Successfully Approve Data',
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
    ref.status !== StatusPengadaan['Approved oleh Kabag'] &&
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
  const totalApprovedSupervisor =
    (await pengadaanRepository.countDocument(
      JSON.stringify([
        ...defaultFiltered,
        { id: 'status', value: StatusPengadaan['Approved oleh Supervisor'] },
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
      Number(totalProsesPersetujuan) + Number(totalApprovedSupervisor) || 0,
    totalApprovedSupervisor,
    totalApprovedWakabag,
    totalApprovedKabag,
    totalBelumSelesai:
      Number(totalApprovedWakabag) + Number(totalApprovedKabag) || 0,
    totalSelesai,
  };
  res.json({
    message: 'Successfully getDashboard',
    data,
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
