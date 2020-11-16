import { Request, Response } from 'express';
import schema from '@modules/Role/role.schema';

import RoleRepository from '@modules/Role/role.repository';
import paramValidation from '@utils/paramValidation';

export const createRole = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = schema.create.validateSync(body);
  const roleRepository = new RoleRepository();
  const data = await roleRepository.create(validatedBody);
  res.json({
    message: 'Successfully Create Role',
    data,
  });
};

export const updateRole = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'roleId');
  const validatedBody = schema.create.validateSync(body);
  const roleRepository = new RoleRepository();
  const data = await roleRepository.update(validateParam.uid, validatedBody);
  res.json({
    message: 'Successfully Update Role',
    data,
  });
};

export const getRoleById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'roleId');
  const roleRepository = new RoleRepository();
  const data = await roleRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Role By Id',
    data,
  });
};

export const getAllRole = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const roleRepository = new RoleRepository();
  const data = await roleRepository.findAll(page as string, limit as string);
  res.json({
    message: 'Successfully Get Role',
    data,
  });
};

export const deleteRoleById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'roleId');
  const roleRepository = new RoleRepository();
  const data = await roleRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};
