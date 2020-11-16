import { Request, Response } from 'express';
import schema from '@modules/JenisPC/jenis_pc.schema';

import JenisPcRepository from '@modules/JenisPC/jenis_pc.repository';
import paramValidation from '@utils/paramValidation';

export const createJenisPc = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = schema.create.validateSync(body);
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
  const validatedBody = schema.create.validateSync(body);
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
  let { page, limit } = req.query;
  const jenisPcRepository = new JenisPcRepository();
  const data = await jenisPcRepository.findAll(page as string, limit as string);
  res.json({
    message: 'Successfully Get JenisPc',
    data,
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
