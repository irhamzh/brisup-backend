import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './hotel.schema';
import HotelRepository from './hotel.repository';

export const createHotel = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const hotelRepository = new HotelRepository();
  const data = await hotelRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Hotel',
    data,
  });
};

export const updateHotel = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'hotelId');
  const validatedBody = yupValidate(schema.create, body);

  const hotelRepository = new HotelRepository();
  const data = await hotelRepository.update(validateParam.uid, validatedBody);
  res.json({
    message: 'Successfully Update Hotel',
    data,
  });
};

export const getHotelById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'hotelId');
  const hotelRepository = new HotelRepository();
  const data = await hotelRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Hotel By Id',
    data,
  });
};

export const getAllHotel = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const hotelRepository = new HotelRepository();
  const data = await hotelRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await hotelRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get Hotel',
    data,
    totalCount,
  });
};

export const deleteHotelById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'hotelId');
  const hotelRepository = new HotelRepository();
  const data = await hotelRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
