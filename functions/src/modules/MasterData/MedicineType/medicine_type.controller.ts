import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';

import schema from './medicine_type.schema';
import MedicineTypeRepository from './medicine_type.repository';

export const createMedicineType = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const medicineTypeRepository = new MedicineTypeRepository();
  const data = await medicineTypeRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create MedicineType',
    data,
  });
};

export const updateMedicineType = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'medicineTypeId');
  const validatedBody = yupValidate(schema.create, body);

  const medicineTypeRepository = new MedicineTypeRepository();
  const data = await medicineTypeRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update MedicineType',
    data,
  });
};

export const getMedicineTypeById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'medicineTypeId');
  const medicineTypeRepository = new MedicineTypeRepository();
  const data = await medicineTypeRepository.findByIdElastic(validateParam.uid);
  res.json({
    message: 'Successfully Get MedicineType By Id',
    data,
  });
};

export const getAllMedicineType = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const medicineTypeRepository = new MedicineTypeRepository();
  const { data, totalCount } = await medicineTypeRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await medicineTypeRepository.countDocument(
  //   filtered as string
  // );

  res.json({
    message: 'Successfully Get MedicineType',
    data,
    totalCount,
  });
};

export const deleteMedicineTypeById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'medicineTypeId');
  const medicineTypeRepository = new MedicineTypeRepository();
  const data = await medicineTypeRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
