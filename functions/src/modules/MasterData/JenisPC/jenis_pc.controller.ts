import { Request, Response } from 'express';
import schema from '@modules/MasterData/JenisPC/jenis_pc.schema';

import JenisPcRepository from '@modules/MasterData/JenisPC/jenis_pc.repository';
import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

export const createJenisPc = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const jenisPcRepository = new JenisPcRepository();
  const data = await jenisPcRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create JenisPc',
    data,
  });
};

export const updateJenisPc = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'jenisPcId');
  const validatedBody = yupValidate(schema.create, body);

  const jenisPcRepository = new JenisPcRepository();
  const data = await jenisPcRepository.update(validateParam.uid, validatedBody);
  res.json({
    message: 'Successfully Update JenisPc',
    data,
  });
};

export const getJenisPcById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'jenisPcId');
  const jenisPcRepository = new JenisPcRepository();
  const data = await jenisPcRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get JenisPc By Id',
    data,
  });
};

export const getAllJenisPc = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const jenisPcRepository = new JenisPcRepository();
  const data = await jenisPcRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await jenisPcRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get JenisPc',
    data,
    totalCount,
  });
};

export const deleteJenisPcById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'jenisPcId');
  const jenisPcRepository = new JenisPcRepository();
  const data = await jenisPcRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
