import { Request, Response } from 'express';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import * as BusBoy from 'busboy';
import * as admin from 'firebase-admin';

import config from '@utils/config';
import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import ExtensionError from '@interfaces/ExtensionError';
import schema from '@modules/MasterData/User/user.schema';
import RoleRepository from '@modules/MasterData/Role/role.repository';
import UserRepository from '@modules/MasterData/User/user.repository';

const { v4: uuidv4 } = require('uuid');
const defaultImg = 'no-user-pic.png';

export const getTokenData = async (req: Request, res: Response) => {
  res.json({
    message: 'Successfully Decode Token',
    data: res.locals.decoded,
  });
};

export const getCurrentAuth = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const userRepository = new UserRepository();
  const data = await userRepository.getCurrentAuth(user.uid);
  res.json({
    message: 'Successfully Get User By Id',
    data,
  });
};

export const revokeToken = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const userRepository = new UserRepository();
  const data = await userRepository.revokeRefreshTokens(user.uid);
  res.json({
    message: 'Successfully Get User By Id',
    data,
  });
};

export const getAllUser = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const userRepository = new UserRepository();
  const data = await userRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await userRepository.countDocument(filtered as string);

  const roleRepository = new RoleRepository();
  const dataWithRole = [];
  for (const user of data) {
    const role = await roleRepository.findById(user.role);
    dataWithRole.push({ ...user, role });
  }

  res.json({
    message: 'Successfully Get User',
    data: dataWithRole,
    totalCount,
  });
};

export const getUserById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'userId');
  const userRepository = new UserRepository();
  const data = await userRepository.findById(validateParam.uid);
  const roleRepository = new RoleRepository();
  const role = await roleRepository.findById(data.role);

  res.json({
    message: 'Successfully Get User By Id',
    data: { ...data, role },
  });
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'userId');
  const userRepository = new UserRepository();
  const data = await userRepository.delete(validateParam.uid);
  await userRepository.deleteSingleAuthUser(validateParam.uid);
  res.json({
    message: 'Successfully  Delete User By Id',
    data,
  });
};

export const logIn = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.login, body);

  //-> get current data auth by email
  const userRepository = new UserRepository();
  const currentUser = await userRepository.getCurrentAuthByEmail(
    validatedBody.email
  );

  //-> role data
  const roleRepository = new RoleRepository();
  const role = await roleRepository.findById(
    currentUser?.customClaims?.role?.id
  );

  //-> execute login
  const { token, refreshToken, decodedToken } = await userRepository.logIn(
    validatedBody,
    role,
    currentUser.uid,
    currentUser?.customClaims?.name
  );
  res.json({
    message: 'Successfully Login',
    data: decodedToken,
    token,
    refreshToken,
  });
};

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const roleRepository = new RoleRepository();
  const role = await roleRepository.findById(validatedBody.role);

  const createParam = {
    ...validatedBody,
    role: role.id,
    profilePicture: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${defaultImg}?alt=media`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const userRepository = new UserRepository();
  const { data } = await userRepository.signUp(createParam, role);

  res.json({
    message: 'Successfully Sign Up',
    data,
    // token,
    // refreshToken,
  });
};

export const updateUserById = async (req: Request, res: Response) => {
  const { body, params } = req;

  //-> validate
  const validateParam = paramValidation(params, 'userId');
  let validatedBody = yupValidate(schema.update, body);
  if (validatedBody?.role) {
    const roleRepository = new RoleRepository();
    const role = await roleRepository.findById(validatedBody.role);
    validatedBody = { ...validatedBody, role: role.id };
  }

  //-> execute update
  const createParam = JSON.parse(JSON.stringify(validatedBody));
  if (createParam.password) {
    delete createParam.password;
  }
  const userRepository = new UserRepository();
  const data = await userRepository.update(validateParam.uid, createParam);

  //-> get role data
  const roleRepository = new RoleRepository();
  const role = await roleRepository.findById(data.role);

  const { token, refreshToken, decodedToken } = await userRepository.updateAuth(
    validateParam.uid,
    { ...data, password: validatedBody.password },
    role
  );

  // const { token, refreshToken, decodedToken } = await userRepository.logIn({
  //   email: data.email,
  //   password: data.password,
  // });

  res.json({
    message: 'Successfully Update User',
    data: { ...data, role },
    token,
    refreshToken,
    decodedToken,
  });
};

export const uploadImage = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'userId');
  const busboy = new BusBoy({ headers: req.headers });
  let imageFileName: string;
  let imageToBeUploaded: any = {};

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      throw new ExtensionError(['png', 'jpeg']);
    }
    // const imageExtension = filename.split('.')[filename.split('.').length - 1];
    imageFileName = filename;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on('finish', async () => {
    await admin
      .storage()
      .bucket(config.storageBucket)
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        destination: `images/${validateParam.uid}/${imageFileName}`,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
            firebaseStorageDownloadTokens: uuidv4(),
          },
        },
      });
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/images%2F${validateParam.uid}%2F${imageFileName}?alt=media`;
    const userRepository = new UserRepository();
    const data = await userRepository.update(validateParam.uid, {
      profilePicture: imageUrl,
    });
    res.json({
      message: 'Successfully Update Profile Picture',
      data,
    });
  });

  busboy.end();
};
