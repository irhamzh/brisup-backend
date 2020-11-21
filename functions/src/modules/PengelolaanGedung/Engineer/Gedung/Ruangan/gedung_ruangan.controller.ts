import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import RuanganRepository from '@modules/Ruangan/ruangan.repository';
import RoomTypeRepository from '@modules/RoomType/room_type.repository';
import BuildingTypeRepository from '@modules/BuildingType/building_type.repository';

import schema from './gedung_ruangan.schema';
import BuildingRoomRepository from './gedung_ruangan.repository';

export const createBuildingRoom = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const buildingRoomRepository = new BuildingRoomRepository();
  const roomTypeRepository = new RoomTypeRepository();
  const buildingRepository = new BuildingTypeRepository();
  const roomRepository = new RuanganRepository();

  const buldingType: any = await buildingRepository.findById(
    validatedBody.buldingType
  );
  const roomType: any = await roomTypeRepository.findById(
    validatedBody.roomType
  );
  const ruangan: any = await roomRepository.findById(validatedBody.ruangan);
  const createParam = {
    ...validatedBody,
    roomType,
    buldingType,
    ruangan,
  };
  const data: admin.firestore.DocumentData = await buildingRoomRepository.create(
    createParam
  );

  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };
  res.json({
    message: 'Successfully Create BuildingRoom',
    data: formatedData,
  });
};

export const updateBuildingRoom = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'buildingRoomId');
  let validatedBody = yupValidate(schema.update, body);

  const buildingRoomRepository = new BuildingRoomRepository();
  const roomTypeRepository = new RoomTypeRepository();
  const buildingRepository = new BuildingTypeRepository();
  const roomRepository = new RuanganRepository();

  if (validatedBody.roomType) {
    const roomType: any = await roomTypeRepository.findById(
      validatedBody.roomType
    );
    validatedBody = { ...validatedBody, roomType };
  }

  if (validatedBody.buldingType) {
    const buldingType: any = await buildingRepository.findById(
      validatedBody.buldingType
    );
    validatedBody = { ...validatedBody, buldingType };
  }

  if (validatedBody.ruangan) {
    const ruangan: any = await roomRepository.findById(validatedBody.ruangan);
    validatedBody = { ...validatedBody, ruangan };
  }

  const data: admin.firestore.DocumentData = await buildingRoomRepository.update(
    validateParam.uid,
    validatedBody
  );

  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };

  res.json({
    message: 'Successfully Update Building Room',
    data: formatedData,
  });
};

export const getBuildingRoomById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'buildingRoomId');
  const buildingRoomRepository = new BuildingRoomRepository();
  const data: admin.firestore.DocumentData = await buildingRoomRepository.findById(
    validateParam.uid
  );

  const formatedData = {
    ...data,
    tanggal: data.tanggal.toDate(),
  };
  res.json({
    message: 'Successfully Get Building Room By Id',
    data: formatedData,
  });
};

export const getAllBuildingRoom = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const buildingRoomRepository = new BuildingRoomRepository();
  const data = await buildingRoomRepository.findAll(
    page as string,
    limit as string
  );
  const totalCount = await buildingRoomRepository.countDocument();

  const formatedData = data.map((item: admin.firestore.DocumentData) => ({
    ...item,
    tanggal: item.tanggal.toDate(),
  }));
  res.json({
    message: 'Successfully Get BuildingRoom',
    data: formatedData,
    totalCount,
  });
};

export const deleteBuildingRoomById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'buildingRoomId');
  const buildingRoomRepository = new BuildingRoomRepository();
  const data = await buildingRoomRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete By Id',
    data,
  });
};
