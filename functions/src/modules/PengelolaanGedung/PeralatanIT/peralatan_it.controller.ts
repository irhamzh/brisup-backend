import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

import schema from './peralatan_it.schema';
import { TypeItem } from '@modules/Item/interface/item.interface';
import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import PeralatanITRepository from './peralatan_it.repository';
import FloorRepository from '@modules/Floor/floor.repository';
import ItemRepository from '@modules/Item/item.repository';
import RuanganRepository from '@modules/Ruangan/ruangan.repository';

export const createPeralatanIT = async (req: Request, res: Response) => {
  const { body } = req;
  let validatedBody = undefined;
  validatedBody = yupValidate(schema.baseCreate, body);
  if (body?.typePeralatanIT?.toLowerCase() === TypeItem.fisik?.toLowerCase()) {
    validatedBody = yupValidate(schema.createPeralatanFisik, body);
  } else {
    validatedBody = yupValidate(schema.createPeralatan, body);
  }

  const peralatanITRepository = new PeralatanITRepository();
  const floorRepository = new FloorRepository();
  const itemRepository = new ItemRepository();
  const ruanganRepository = new RuanganRepository();

  const item: any = await itemRepository.findById(validatedBody.item);
  const ruangan: any = await ruanganRepository.findById(validatedBody.ruangan);
  const floor: any = await floorRepository.findById(validatedBody.floor);
  const createParam = {
    ...validatedBody,
    floor,
    ruangan,
    item,
  };
  const data: admin.firestore.DocumentData = await peralatanITRepository.create(
    createParam
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
  const itemRepository = new ItemRepository();
  const ruanganRepository = new RuanganRepository();

  const ref: admin.firestore.DocumentData = await peralatanITRepository.findById(
    validateParam.uid
  );
  if (ref?.typePeralatanIT?.toLowerCase() === TypeItem.fisik?.toLowerCase()) {
    validatedBody = yupValidate(schema.updatePeralatanFisik, body);
  } else {
    validatedBody = yupValidate(schema.update, body);
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
  if (validatedBody.item) {
    const item: any = await itemRepository.findById(validatedBody.item);
    validatedBody = { ...validatedBody, item };
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
  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };
  res.json({
    message: 'Successfully Get PeralatanIT By Id',
    data: formatedData,
  });
};

export const getAllPeralatanIT = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const peralatanITRepository = new PeralatanITRepository();
  const data = await peralatanITRepository.findAll(
    page as string,
    limit as string
  );
  const totalCount = await peralatanITRepository.countDocument();
  const formatedData = data.map((item: admin.firestore.DocumentData) => ({
    ...item,
    tanggal: item.tanggal.toDate(),
  }));
  res.json({
    message: 'Successfully Get PeralatanIT',
    data: formatedData,
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
