import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import HotelRepository from '@modules/MasterData/Hotel/hotel.repository';

import schema from './hotel.schema';
import HotelClasificationRepository from './hotel.repository';
import WorkingOrderRepository from '@modules/WorkingOrder/working_order.repository';

export const createHotel = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);
  const hotelClasificationRepository = new HotelClasificationRepository();
  const workingOrderRepository = new WorkingOrderRepository();
  const hotelRepository = new HotelRepository();

  const hotel = await hotelRepository.findById(validatedBody.hotel);
  const workingOrder = await workingOrderRepository.findById(
    validatedBody.workingOrder
  );
  const createParam = {
    ...validatedBody,
    workingOrder,
    hotel,
  };

  const data = await hotelClasificationRepository.create(createParam);

  res.json({
    message: 'Successfully Create Data',
    data,
  });
};

export const updateHotel = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'hotelClasificationId');
  let validatedBody = yupValidate(schema.update, body);

  const hotelClasificationRepository = new HotelClasificationRepository();
  const workingOrderRepository = new WorkingOrderRepository();
  const hotelRepository = new HotelRepository();

  if (validatedBody.hotel) {
    const hotel = await hotelRepository.findById(validatedBody.hotel);
    validatedBody = { ...validatedBody, hotel };
  }
  if (validatedBody.workingOrder) {
    const workingOrder = await workingOrderRepository.findById(
      validatedBody.workingOrder
    );
    validatedBody = { ...validatedBody, workingOrder };
  }

  const data = await hotelClasificationRepository.update(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const deleteHotelById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'hotelClasificationId');
  const hotelClasificationRepository = new HotelClasificationRepository();
  const data = await hotelClasificationRepository.delete(validateParam.uid);

  res.json({
    message: 'Successfully Delete Data By Id',
    data,
  });
};

export const getHotelById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'hotelClasificationId');
  const hotelClasificationRepository = new HotelClasificationRepository();
  const data = await hotelClasificationRepository.findById(validateParam.uid);

  res.json({
    message: 'Successfully Get Data By Id',
    data,
  });
};

export const getAllHotel = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const hotelClasificationRepository = new HotelClasificationRepository();
  const data = await hotelClasificationRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await hotelClasificationRepository.countDocument(
    filtered as string
  );

  res.json({
    message: 'Successfully Get Data',
    data,
    totalCount,
  });
};
