import { Request, Response } from 'express';
import schema from '@modules/RoomType/room_type.schema';

import RoomTypeRepository from '@modules/RoomType/room_type.repository';
import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

export const createRoomType = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const roomTypeRepository = new RoomTypeRepository();
  const data = await roomTypeRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create RoomType',
    data,
  });
};

export const updateRoomType = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'roomTypeId');
  const validatedBody = yupValidate(schema.create, body);

  const roomTypeRepository = new RoomTypeRepository();
  const data = await roomTypeRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update RoomType',
    data,
  });
};

export const getRoomTypeById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'roomTypeId');
  const roomTypeRepository = new RoomTypeRepository();
  const data = await roomTypeRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get RoomType By Id',
    data,
  });
};

export const getAllRoomType = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const roomTypeRepository = new RoomTypeRepository();
  const data = await roomTypeRepository.findAll(
    page as string,
    limit as string
  );
  const totalCount = await roomTypeRepository.countDocument();

  res.json({
    message: 'Successfully Get RoomType',
    data,
    totalCount,
  });
};

export const deleteRoomTypeById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'roomTypeId');
  const roomTypeRepository = new RoomTypeRepository();
  const data = await roomTypeRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
