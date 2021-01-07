import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import HotelRepository from '@modules/MasterData/Hotel/hotel.repository';

import schema from './klasifikasi_hotel.schema';
import HotelClasificationRepository from './klasifikasi_hotel.repository';
import WorkingOrderRepository from '@modules/WorkingOrder/working_order.repository';

export const createHotelClasification = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);
  const hotelClasificationRepository = new HotelClasificationRepository();
  const workingOrderRepository = new WorkingOrderRepository();
  const hotelRepository = new HotelRepository();

  const hotelName: any = await hotelRepository.findById(
    validatedBody.hotelName
  );
  const workingOrder: any = await workingOrderRepository.findById(
    validatedBody.workingOrder
  );
  const createParam = {
    ...validatedBody,
    workingOrder,
    hotelName,
  };

  const data = await hotelClasificationRepository.create(createParam);

  res.json({
    message: 'Successfully Create Hotel Clasification',
    data,
  });
};

export const updateHotelClasification = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'hotelClasificationId');
  let validatedBody = yupValidate(schema.update, body);

  const hotelClasificationRepository = new HotelClasificationRepository();
  const workingOrderRepository = new WorkingOrderRepository();
  const hotelRepository = new HotelRepository();

  if (validatedBody.hotelName) {
    const hotelName: any = await hotelRepository.findById(
      validatedBody.hotelName
    );
    validatedBody = { ...validatedBody, hotelName };
  }
  if (validatedBody.workingOrder) {
    const workingOrder: any = await workingOrderRepository.findById(
      validatedBody.workingOrder
    );
    validatedBody = { ...validatedBody, workingOrder };
  }

  const data = await hotelClasificationRepository.update(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Hotel Clasification',
    data,
  });
};

export const getHotelClasificationById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'hotelClasificationId');
  const hotelClasificationRepository = new HotelClasificationRepository();
  const data = await hotelClasificationRepository.findById(validateParam.uid);

  res.json({
    message: 'Successfully Get Hotel Clasification By Id',
    data,
  });
};

export const getAllHotelClasification = async (req: Request, res: Response) => {
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
    message: 'Successfully Get Hotel Clasification',
    data,
    totalCount,
  });
};

export const deleteHotelClasificationById = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'hotelClasificationId');
  const hotelClasificationRepository = new HotelClasificationRepository();
  const data = await hotelClasificationRepository.delete(validateParam.uid);

  res.json({
    message: 'Successfully Delete Hotel Clasification By Id',
    data,
  });
};
