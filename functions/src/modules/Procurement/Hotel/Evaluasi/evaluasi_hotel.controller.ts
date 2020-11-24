import { Request, Response } from 'express';

import paramValidation from '@utils/paramValidation';
import yupValidate from '@utils/yupValidate';

import schema from './evaluasi_hotel.schema';
import EvaluasiHotelRepository from './evaluasi_hotel.repository';
import firestoreTimeStampToDate from '@utils/firestoreTimeStampToDate';

export const createEvaluasiHotel = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const evaluasiHotelRepository = new EvaluasiHotelRepository();
  const data = await evaluasiHotelRepository.create(validatedBody);
  const formatedData = firestoreTimeStampToDate(data);

  res.json({
    message: 'Successfully Create EvaluasiHotel',
    data: formatedData,
  });
};

export const updateEvaluasiHotel = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'evaluasiHotelId');
  const validatedBody = yupValidate(schema.update, body);

  const evaluasiHotelRepository = new EvaluasiHotelRepository();
  const data = await evaluasiHotelRepository.update(
    validateParam.uid,
    validatedBody
  );
  const formatedData = firestoreTimeStampToDate(data);
  res.json({
    message: 'Successfully Update EvaluasiHotel',
    data: formatedData,
  });
};

export const getEvaluasiHotelById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'evaluasiHotelId');
  const evaluasiHotelRepository = new EvaluasiHotelRepository();
  const data = await evaluasiHotelRepository.findById(validateParam.uid);
  const formatedData = firestoreTimeStampToDate(data);

  res.json({
    message: 'Successfully Get EvaluasiHotel By Id',
    data: formatedData,
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
  const formatedData = firestoreTimeStampToDate(data);

  res.json({
    message: 'Successfully Get EvaluasiHotel',
    data: formatedData,
    totalCount,
  });
};

export const deleteEvaluasiHotelById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'evaluasiHotelId');
  const evaluasiHotelRepository = new EvaluasiHotelRepository();
  const data = await evaluasiHotelRepository.delete(validateParam.uid);
  const formatedData = firestoreTimeStampToDate(data);

  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data: formatedData,
  });
};
