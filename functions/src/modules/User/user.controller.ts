import { Request, Response } from 'express';
import * as BusBoy from 'busboy';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as admin from 'firebase-admin';

import config from '@utils/config';
import schema from '@modules/User/user.schema';
import paramValidation from '@utils/paramValidation';
import RoleRepository from '@modules/Role/role.repository';
import UserRepository from '@modules/User/user.repository';
import ExtensionError from '@interfaces/ExtensionError';

const { v4: uuidv4 } = require('uuid');
const defaultImg = 'no-user-pic.png';

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = schema.create.validateSync(body);
  const roleRepository = new RoleRepository();
  const role: any = await roleRepository.findById(validatedBody.role);

  const createParam = {
    ...validatedBody,
    role,
    profilePicture: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${defaultImg}?alt=media`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const userRepository = new UserRepository();
  const { data, token } = await userRepository.signUp(createParam);

  res.json({
    message: 'Successfully Sign Up',
    data,
    token,
  });
};

export const logIn = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = schema.login.validateSync(body);

  const userRepository = new UserRepository();
  const token = await userRepository.logIn(validatedBody);

  res.json({
    message: 'Successfully Login',
    data: { email: validatedBody.email },
    token,
  });
};

export const getAllUser = async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  const userRepository = new UserRepository();
  const data = await userRepository.findAll(page as string, limit as string);
  res.json({
    message: 'Successfully Get User',
    data,
  });
};

export const getUserById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'userId');
  const userRepository = new UserRepository();
  const data = await userRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get User By Id',
    data,
  });
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'userId');
  const userRepository = new UserRepository();
  await userRepository.deleteSingleAuthUser(validateParam.uid);
  const data = await userRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully  Delete User By Id',
    data,
  });
};

export const updateUserById = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'userId');
  const validatedBody = schema.update.validateSync(body);
  const userRepository = new UserRepository();
  let authData = {};
  if (validatedBody.email || validatedBody.password) {
    const execute = await userRepository.updateAuth(
      validateParam.uid,
      validatedBody
    );
    authData = execute.toJSON();
  }
  const data = await userRepository.update(validateParam.uid, validatedBody);
  res.json({
    message: 'Successfully Update User',
    data,
    authData,
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
