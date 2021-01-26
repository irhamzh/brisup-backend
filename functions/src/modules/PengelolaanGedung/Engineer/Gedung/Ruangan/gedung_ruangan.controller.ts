import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import RuanganRepository from '@modules/MasterData/Ruangan/ruangan.repository';
import RoomTypeRepository from '@modules/MasterData/RoomType/room_type.repository';
import BuildingTypeRepository from '@modules/MasterData/BuildingType/building_type.repository';

import schema from './gedung_ruangan.schema';
import BuildingRoomRepository from './gedung_ruangan.repository';

export const createBuildingRoom = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const buildingRoomRepository = new BuildingRoomRepository();
  const roomTypeRepository = new RoomTypeRepository();
  const buildingRepository = new BuildingTypeRepository();
  const roomRepository = new RuanganRepository();

  const buildingType: any = await buildingRepository.findById(
    validatedBody.buildingType
  );
  const roomType: any = await roomTypeRepository.findById(
    validatedBody.roomType
  );
  const ruangan: any = await roomRepository.findById(validatedBody.ruangan);
  const createParam = {
    ...validatedBody,
    roomType,
    buildingType,
    ruangan,
  };
  const data: admin.firestore.DocumentData = await buildingRoomRepository.create(
    createParam
  );

  res.json({
    message: 'Successfully Create BuildingRoom',
    data,
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

  if (validatedBody.buildingType) {
    const buildingType: any = await buildingRepository.findById(
      validatedBody.buildingType
    );
    validatedBody = { ...validatedBody, buildingType };
  }

  if (validatedBody.ruangan) {
    const ruangan: any = await roomRepository.findById(validatedBody.ruangan);
    validatedBody = { ...validatedBody, ruangan };
  }

  const data: admin.firestore.DocumentData = await buildingRoomRepository.update(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Building Room',
    data,
  });
};

export const getBuildingRoomById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'buildingRoomId');
  const buildingRoomRepository = new BuildingRoomRepository();
  const data: admin.firestore.DocumentData = await buildingRoomRepository.findByIdElastic(
    validateParam.uid
  );

  res.json({
    message: 'Successfully Get Building Room By Id',
    data,
  });
};

export const getAllBuildingRoom = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const buildingRoomRepository = new BuildingRoomRepository();
  const { data, totalCount } = await buildingRoomRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await buildingRoomRepository.countDocument(
  //   filtered as string
  // );

  res.json({
    message: 'Successfully Get BuildingRoom',
    data,
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
