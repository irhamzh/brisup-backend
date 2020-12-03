import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import schema from './peralatan_it.schema';
import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import { TypeItem } from '@modules/MasterData/Item/interface/item.interface';
import ItemRepository from '@modules/MasterData/Item/item.repository';

import FloorRepository from '@modules/MasterData/Floor/floor.repository';
import PeralatanITRepository from './peralatan_it.repository';
import RuanganRepository from '@modules/MasterData/Ruangan/ruangan.repository';

export const createPeralatanIT = async (req: Request, res: Response) => {
  const { body } = req;
  let validatedBody = undefined;
  validatedBody = yupValidate(schema.baseCreate, body);
  if (body?.typePeralatanIT?.toLowerCase() === TypeItem.fisik?.toLowerCase()) {
    const itemRepository = new ItemRepository();
    validatedBody = yupValidate(schema.createPeralatanFisik, body);
    const item: any = await itemRepository.findById(validatedBody.item);
    validatedBody = { ...validatedBody, item };
  } else {
    validatedBody = yupValidate(schema.createPeralatanJaringan, body);
  }

  const peralatanITRepository = new PeralatanITRepository();
  const floorRepository = new FloorRepository();
  const ruanganRepository = new RuanganRepository();

  const ruangan: any = await ruanganRepository.findById(validatedBody.ruangan);
  const floor: any = await floorRepository.findById(validatedBody.floor);
  validatedBody = {
    ...validatedBody,
    floor,
    ruangan,
  };
  const data: admin.firestore.DocumentData = await peralatanITRepository.create(
    validatedBody
  );
  res.json({
    message: 'Successfully Create PeralatanIT',
    data,
  });
};

export const updatePeralatanIT = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'peralatanITId');
  let validatedBody = undefined;

  const peralatanITRepository = new PeralatanITRepository();
  const floorRepository = new FloorRepository();
  const ruanganRepository = new RuanganRepository();

  const ref: admin.firestore.DocumentData = await peralatanITRepository.findById(
    validateParam.uid
  );
  if (ref?.typePeralatanIT?.toLowerCase() === TypeItem.fisik?.toLowerCase()) {
    validatedBody = yupValidate(schema.updatePeralatanFisik, body);
    if (validatedBody.item) {
      const itemRepository = new ItemRepository();
      const item: any = await itemRepository.findById(validatedBody.item);
      validatedBody = { ...validatedBody, item };
    }
  } else {
    validatedBody = yupValidate(schema.updatePeralatanJaringan, body);
  }

  if (validatedBody.floor) {
    const floor: any = await floorRepository.findById(validatedBody.floor);
    validatedBody = { ...validatedBody, floor };
  }
  if (validatedBody.ruangan) {
    const ruangan: any = await ruanganRepository.findById(
      validatedBody.ruangan
    );
    validatedBody = { ...validatedBody, ruangan };
  }

  const data: admin.firestore.DocumentData = await peralatanITRepository.update(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update PeralatanIT',
    data,
  });
};

export const getPeralatanITById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'peralatanITId');
  const peralatanITRepository = new PeralatanITRepository();
  const data: admin.firestore.DocumentData = await peralatanITRepository.findById(
    validateParam.uid
  );

  res.json({
    message: 'Successfully Get PeralatanIT By Id',
    data,
  });
};

export const getAllPeralatanIT = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const peralatanITRepository = new PeralatanITRepository();
  const data = await peralatanITRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await peralatanITRepository.countDocument(
    filtered as string
  );
  res.json({
    message: 'Successfully Get PeralatanIT',
    data,
    totalCount,
  });
};

export const deletePeralatanITById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'peralatanITId');
  const peralatanITRepository = new PeralatanITRepository();
  const data = await peralatanITRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
