import { Request, Response } from 'express';
import schema from './item.schema';

import ItemRepository from './item.repository';
import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

export const createItem = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const itemRepository = new ItemRepository();
  const data = await itemRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Item',
    data,
  });
};

export const updateItem = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'itemId');
  const validatedBody = yupValidate(schema.update, body);

  const itemRepository = new ItemRepository();
  const data = await itemRepository.update(validateParam.uid, validatedBody);
  res.json({
    message: 'Successfully Update Item',
    data,
  });
};

export const getItemById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'itemId');
  const itemRepository = new ItemRepository();
  const data = await itemRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Item By Id',
    data,
  });
};

export const getAllItem = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const itemRepository = new ItemRepository();
  const data = await itemRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await itemRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get Item',
    data,
    totalCount,
  });
};

export const deleteItemById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'itemId');
  const itemRepository = new ItemRepository();
  const data = await itemRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Item By Id',
    data,
  });
};
