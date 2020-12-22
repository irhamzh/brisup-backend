import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import InvalidRequestError from '@interfaces/InvalidRequestError';

import schema from './formasi_pekerja.schema';
import FormasiPekerjaRepository from './formasi_pekerja.repository';

export const createFormasiPekerja = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const formasiRepository = new FormasiPekerjaRepository();

  const exist = await formasiRepository.findOne(
    JSON.stringify([
      { id: 'levelJabatan', value: validatedBody.levelJabatan },
      { id: 'unitKerja', value: validatedBody.unitKerja },
    ])
  );
  if (exist || exist?.id) {
    throw new InvalidRequestError(
      `Formasi dengan Level Jabatan ${validatedBody.levelJabatan}  dan Unit Kerja  ${validatedBody.unitKerja}  telah ada`,
      'Formasi Pekerja'
    );
  }

  const data = await formasiRepository.create({
    ...validatedBody,
    pemenuhan: 0,
  });
  res.json({
    message: 'Successfully Create Formasi Pekerja',
    data,
  });
};

// export const updateFormasiPekerja = async (req: Request, res: Response) => {
//   const { body, params } = req;
//   const validateParam = paramValidation(params, 'formasiId');
//   const validatedBody = yupValidate(schema.create, body);

//   const formasiRepository = new FormasiPekerjaRepository();
//   const data = await formasiRepository.update(
//     validateParam.uid,
//     validatedBody
//   );
//   res.json({
//     message: 'Successfully Update Formasi Pekerja',
//     data,
//   });
// };

export const getFormasiPekerjaById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'formasiId');
  const formasiRepository = new FormasiPekerjaRepository();
  const data = await formasiRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Formasi Pekerja By Id',
    data,
  });
};

export const getAllFormasiPekerja = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const formasiRepository = new FormasiPekerjaRepository();
  const data = await formasiRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await formasiRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get Formasi Pekerja',
    data,
    totalCount,
  });
};

export const deleteFormasiPekerjaById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'formasiId');
  const formasiRepository = new FormasiPekerjaRepository();
  const data = await formasiRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Formasi Pekerja By Id',
    data,
  });
};
