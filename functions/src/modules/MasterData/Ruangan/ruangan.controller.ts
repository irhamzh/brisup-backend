import { Request, Response } from 'express';
import schema from '@modules/MasterData/Ruangan/ruangan.schema';

import RuanganRepository from '@modules/MasterData/Ruangan/ruangan.repository';
import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

export const createRuangan = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const ruanganRepository = new RuanganRepository();
  const data = await ruanganRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Ruangan',
    data,
  });
};

export const updateRuangan = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'ruanganId');
  const validatedBody = yupValidate(schema.create, body);

  const ruanganRepository = new RuanganRepository();
  const data = await ruanganRepository.update(validateParam.uid, validatedBody);
  res.json({
    message: 'Successfully Update Ruangan',
    data,
  });
};

export const getRuanganById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'ruanganId');
  const ruanganRepository = new RuanganRepository();
  const data = await ruanganRepository.findByIdElastic(validateParam.uid);
  res.json({
    message: 'Successfully Get Ruangan By Id',
    data,
  });
};

export const getAllRuangan = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const ruanganRepository = new RuanganRepository();
  const { data, totalCount } = await ruanganRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await ruanganRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get Ruangan',
    data,
    totalCount,
  });
};

export const deleteRuanganById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'ruanganId');
  const ruanganRepository = new RuanganRepository();
  const data = await ruanganRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Ruangan By Id',
    data,
  });
};
