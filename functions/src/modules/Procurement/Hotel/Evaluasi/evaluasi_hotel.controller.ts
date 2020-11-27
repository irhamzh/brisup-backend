import { Request, Response } from 'express';

import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';
import HotelRepository from '@modules/MasterData/Hotel/hotel.repository';

import schema from './evaluasi_hotel.schema';
import EvaluasiHotelRepository from './evaluasi_hotel.repository';

export const createEvaluasiHotel = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);
  const hotelRepository = new HotelRepository();
  const evaluasiHotelRepository = new EvaluasiHotelRepository();

  const hotelName: any = await hotelRepository.findById(
    validatedBody.hotelName
  );

  const data = await evaluasiHotelRepository.create({
    ...validatedBody,
    hotelName,
  });

  res.json({
    message: 'Successfully Create EvaluasiHotel',
    data,
  });
};

export const updateEvaluasiHotel = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'evaluasiHotelId');
  let validatedBody = yupValidate(schema.update, body);

  const evaluasiHotelRepository = new EvaluasiHotelRepository();
  const hotelRepository = new HotelRepository();

  const hotelName: any = await hotelRepository.findById(
    validatedBody.hotelName
  );

  if (validatedBody.hotelName) {
    validatedBody = { ...validatedBody, hotelName };
  }
  const data = await evaluasiHotelRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update EvaluasiHotel',
    data,
  });
};

export const getEvaluasiHotelById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'evaluasiHotelId');
  const evaluasiHotelRepository = new EvaluasiHotelRepository();
  const data = await evaluasiHotelRepository.findById(validateParam.uid);

  res.json({
    message: 'Successfully Get EvaluasiHotel By Id',
    data,
  });
};

export const getAllEvaluasiHotel = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const evaluasiHotelRepository = new EvaluasiHotelRepository();
  const data = await evaluasiHotelRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await evaluasiHotelRepository.countDocument(
    filtered as string
  );

  res.json({
    message: 'Successfully Get EvaluasiHotel',
    data,
    totalCount,
  });
};

export const deleteEvaluasiHotelById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'evaluasiHotelId');
  const evaluasiHotelRepository = new EvaluasiHotelRepository();
  const data = await evaluasiHotelRepository.delete(validateParam.uid);

  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
