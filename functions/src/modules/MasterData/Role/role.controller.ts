import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import schema from '@modules/MasterData/Role/role.schema';
import RoleRepository from '@modules/MasterData/Role/role.repository';
import UserRepository from '@modules/MasterData/User/user.repository';

export const createRole = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

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
  const validatedBody = yupValidate(schema.create, body);

  // -> update role
  const roleRepository = new RoleRepository();
  const data = await roleRepository.update(validateParam.uid, validatedBody);

  // -> get user by role
  const userRepository = new UserRepository();
  const user = await userRepository.find(
    JSON.stringify([{ id: 'role', value: data.id }])
  );

  const userData: admin.firestore.DocumentData = [];
  user.forEach((doc: firebase.firestore.DocumentData) => {
    const snap = { id: doc.id, ...doc.data() };
    return userData.push(snap);
  });

  // -> revoke access token
  if (userData.length > 0) {
    for (let i = 0; i < userData.length; i++) {
      console.log('revoke ->', userData[i].name);
      await userRepository.revokeRefreshTokens(userData[i].id);
    }
  }

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
  const { page, limit, filtered, sorted } = req.query;
  const roleRepository = new RoleRepository();
  const data = await roleRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await roleRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get Role',
    data,
    totalCount,
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
