import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

import schema from './pengadaan.schema';
import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import PengadaanRepository from './pengadaan.repository';

export const getAllPengadaan = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.findAll(
    page as string,
    limit as string
  );

  const formatedData = data.map((item: admin.firestore.DocumentData) => {
    if (item.tanggalPengadaan) {
      return {
        ...item,
        tanggalPengadaan: item.tanggalPengadaan.toDate(),
      };
    }
    if (item.tanggalSPK) {
      return {
        ...item,
        tanggalSPK: item.tanggalSPK.toDate(),
      };
    }
    if (item.masaBerlaku) {
      return {
        ...item,
        masaBerlaku: item.masaBerlaku.toDate(),
      };
    }
    if (item.sampai) {
      return {
        ...item,
        sampai: item.sampai.toDate(),
      };
    }
    return item;
  });
  const totalCount = await pengadaanRepository.countDocument();

  res.json({
    message: 'Successfully Get All Pengadaan',
    data: formatedData,
    totalCount,
  });
};

//Pengadaan Jasa Konsultan - Seleksi Langsung
export const createKonsultanSeleksiLangsung = async (
  req: Request,
  res: Response
) => {
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
    validatedBody.provider
  );

  res.json({
    message:
      'Successfully Create Pengadaan Pengadaan Jasa Konsultan Seleksi Langsung',
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
    validatedBody.provider
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
  let { page, limit } = req.query;
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
  const formatedData = data.map((item: admin.firestore.DocumentData) => {
    if (item.tanggalPengadaan) {
      return {
        ...item,
        tanggalPengadaan: item.tanggalPengadaan.toDate(),
      };
    }
    if (item.tanggalSPK) {
      return {
        ...item,
        tanggalSPK: item.tanggalSPK.toDate(),
      };
    }
    if (item.masaBerlaku) {
      return {
        ...item,
        masaBerlaku: item.masaBerlaku.toDate(),
      };
    }
    if (item.sampai) {
      return {
        ...item,
        sampai: item.sampai.toDate(),
      };
    }
    return item;
  });
  res.json({
    message: 'Successfully Get Pengadaan',
    data: formatedData,
    totalCount,
  });
};

//Pengadaan Jasa Konsultan - Penunjukan Langsung
export const createKonsultanPenunjukanLangsung = async (
  req: Request,
  res: Response
) => {
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
    validatedBody.provider
  );
  res.json({
    message:
      'Successfully Create Pengadaan Pengadaan Jasa Konsultan Penunjukan  Langsung',
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
    validatedBody.provider
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
  const formatedData = data.map((item: admin.firestore.DocumentData) => {
    if (item.tanggalPengadaan) {
      return {
        ...item,
        tanggalPengadaan: item.tanggalPengadaan.toDate(),
      };
    }
    if (item.tanggalSPK) {
      return {
        ...item,
        tanggalSPK: item.tanggalSPK.toDate(),
      };
    }
    if (item.masaBerlaku) {
      return {
        ...item,
        masaBerlaku: item.masaBerlaku.toDate(),
      };
    }
    if (item.sampai) {
      return {
        ...item,
        sampai: item.sampai.toDate(),
      };
    }
    return item;
  });
  res.json({
    message: 'Successfully Get Pengadaan',
    data: formatedData,
    totalCount,
  });
};

//Pengadaan Barang dan/atau Jasa (IT & Non IT) - Swakelola
export const createBarangSwakelola = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.createSwakelolaPembelian, body);
  const pengadaanRepository = new PengadaanRepository();
  const data: admin.firestore.DocumentData = await pengadaanRepository.createPengadaan(
    validatedBody,
    'barang',
    'Swakelola',
    validatedBody.provider
  );
  res.json({
    message: 'Successfully Create Pengadaan Pengadaan Jasa Barang Swakelola',
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
    validatedBody.provider
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
  const formatedData = data.map((item: admin.firestore.DocumentData) => {
    if (item.tanggalPengadaan) {
      return {
        ...item,
        tanggalPengadaan: item.tanggalPengadaan.toDate(),
      };
    }
    if (item.tanggalSPK) {
      return {
        ...item,
        tanggalSPK: item.tanggalSPK.toDate(),
      };
    }
    if (item.masaBerlaku) {
      return {
        ...item,
        masaBerlaku: item.masaBerlaku.toDate(),
      };
    }
    if (item.sampai) {
      return {
        ...item,
        sampai: item.sampai.toDate(),
      };
    }
    return item;
  });
  res.json({
    message: 'Successfully Get Pengadaan',
    data: formatedData,
    totalCount,
  });
};

//Pengadaan Barang dan/atau Jasa (IT & Non IT) - Pembelian Langsung
export const createBarangPembelianLangsung = async (
  req: Request,
  res: Response
) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.createSwakelolaPembelian, body);
  const pengadaanRepository = new PengadaanRepository();
  const data: admin.firestore.DocumentData = await pengadaanRepository.createPengadaan(
    validatedBody,
    'barang',
    'Pembelian Langsung',
    validatedBody.provider
  );
  res.json({
    message:
      'Successfully Create Pengadaan Pengadaan Jasa Barang Pembelian Langsung',
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
    validatedBody.provider
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
  const formatedData = data.map((item: admin.firestore.DocumentData) => {
    if (item.tanggalPengadaan) {
      return {
        ...item,
        tanggalPengadaan: item.tanggalPengadaan.toDate(),
      };
    }
    if (item.tanggalSPK) {
      return {
        ...item,
        tanggalSPK: item.tanggalSPK.toDate(),
      };
    }
    if (item.masaBerlaku) {
      return {
        ...item,
        masaBerlaku: item.masaBerlaku.toDate(),
      };
    }
    if (item.sampai) {
      return {
        ...item,
        sampai: item.sampai.toDate(),
      };
    }
    return item;
  });
  res.json({
    message: 'Successfully Get Pengadaan',
    data: formatedData,
    totalCount,
  });
};

//Pengadaan Barang dan/atau Jasa (IT & Non IT) - Penunjukan Langsung
export const createBarangPenunjukanLangsung = async (
  req: Request,
  res: Response
) => {
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
    validatedBody.provider
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
    validatedBody.provider
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
  const formatedData = data.map((item: admin.firestore.DocumentData) => {
    if (item.tanggalPengadaan) {
      return {
        ...item,
        tanggalPengadaan: item.tanggalPengadaan.toDate(),
      };
    }
    if (item.tanggalSPK) {
      return {
        ...item,
        tanggalSPK: item.tanggalSPK.toDate(),
      };
    }
    if (item.masaBerlaku) {
      return {
        ...item,
        masaBerlaku: item.masaBerlaku.toDate(),
      };
    }
    if (item.sampai) {
      return {
        ...item,
        sampai: item.sampai.toDate(),
      };
    }
    return item;
  });
  res.json({
    message: 'Successfully Get Pengadaan',
    data: formatedData,
    totalCount,
  });
};

//Pengadaan Barang dan/atau Jasa (IT & Non IT) - Pemilihan Langsung
export const createBarangPemilihanLangsung = async (
  req: Request,
  res: Response
) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.createBarangPemilihanLangsung, body);
  const pengadaanRepository = new PengadaanRepository();
  const data: admin.firestore.DocumentData = await pengadaanRepository.createPengadaan(
    validatedBody,
    'barang',
    'Pemilihan Langsung',
    validatedBody.provider
  );
  res.json({
    message:
      'Successfully Create Pengadaan Pengadaan Jasa Barang Pemilihan Langsung',
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
    validatedBody.provider
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
  const formatedData = data.map((item: admin.firestore.DocumentData) => {
    if (item.tanggalPengadaan) {
      return {
        ...item,
        tanggalPengadaan: item.tanggalPengadaan.toDate(),
      };
    }
    if (item.tanggalSPK) {
      return {
        ...item,
        tanggalSPK: item.tanggalSPK.toDate(),
      };
    }
    if (item.masaBerlaku) {
      return {
        ...item,
        masaBerlaku: item.masaBerlaku.toDate(),
      };
    }
    if (item.sampai) {
      return {
        ...item,
        sampai: item.sampai.toDate(),
      };
    }
    return item;
  });
  res.json({
    message: 'Successfully Get Pengadaan',
    data: formatedData,
    totalCount,
  });
};

//Pengadaan Barang dan/atau Jasa (IT & Non IT) - Lelang
export const createBarangLelang = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.createBarangLelang, body);
  const pengadaanRepository = new PengadaanRepository();
  const data: admin.firestore.DocumentData = await pengadaanRepository.createPengadaan(
    validatedBody,
    'barang',
    'Lelang',
    validatedBody.provider
  );
  res.json({
    message: 'Successfully Create Pengadaan Pengadaan Jasa Barang Lelang',
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
    validatedBody.provider
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
  const formatedData = data.map((item: admin.firestore.DocumentData) => {
    if (item.tanggalPengadaan) {
      return {
        ...item,
        tanggalPengadaan: item.tanggalPengadaan.toDate(),
      };
    }
    if (item.tanggalSPK) {
      return {
        ...item,
        tanggalSPK: item.tanggalSPK.toDate(),
      };
    }
    if (item.masaBerlaku) {
      return {
        ...item,
        masaBerlaku: item.masaBerlaku.toDate(),
      };
    }
    if (item.sampai) {
      return {
        ...item,
        sampai: item.sampai.toDate(),
      };
    }
    return item;
  });
  res.json({
    message: 'Successfully Get Pengadaan',
    data: formatedData,
    totalCount,
  });
};

export const deletePengadaanById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'pengadaanId');
  const pengadaanRepository = new PengadaanRepository();
  const data = await pengadaanRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
