import { Request, Response } from 'express';
import schema from '@modules/Partner/partner.schema';

import PartnerRepository from '@modules/Partner/partner.repository';
import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

export const createPartner = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const partnerRepository = new PartnerRepository();
  const data = await partnerRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Partner',
    data,
  });
};

export const updatePartner = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'partnerId');
  const validatedBody = yupValidate(schema.update, body);
  const partnerRepository = new PartnerRepository();
  const data = await partnerRepository.update(validateParam.uid, validatedBody);
  res.json({
    message: 'Successfully Update Partner',
    data,
  });
};

export const getPartnerById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'partnerId');
  const partnerRepository = new PartnerRepository();
  const data = await partnerRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Partner By Id',
    data,
  });
};

export const getAllPartner = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const partnerRepository = new PartnerRepository();
  const data = await partnerRepository.findAll(page as string, limit as string);
  const totalCount = await partnerRepository.countDocument();

  res.json({
    message: 'Successfully Get Partner',
    data,
    totalCount,
  });
};

export const deletePartnerById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'partnerId');
  const partnerRepository = new PartnerRepository();
  const data = await partnerRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Partner By Id',
    data,
  });
};
