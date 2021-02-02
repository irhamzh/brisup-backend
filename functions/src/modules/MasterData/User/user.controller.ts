import { Request, Response } from 'express';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as BusBoy from 'busboy';
import * as jwt from 'jsonwebtoken';
import * as admin from 'firebase-admin';

import config from '@utils/config';
import yupValidate from '@utils/yupValidate';
import { REFRESH_TOKEN_KEY } from '@constants/keys';
import paramValidation from '@utils/paramValidation';
import NotFoundError from '@interfaces/NotFoundError';
import { DivisionUser } from '@constants/BaseCondition';
import ExtensionError from '@interfaces/ExtensionError';
import schema from '@modules/MasterData/User/user.schema';
import validationWording from '@constants/validationWording';
import RoleRepository from '@modules/MasterData/Role/role.repository';
import UserRepository from '@modules/MasterData/User/user.repository';
import { decryptAES } from '@utils/cryptoJS';
import { IUpdateAuth } from '@modules/MasterData/User/interface/user.interface';

const { v4: uuidv4 } = require('uuid');
const defaultImg = 'no-user-pic.png';

const RoleAllDivision = ['Admin', 'Kepala Bagian', 'Wakil Kepala Bagian'];

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

export const refreshToken = async (req: Request, res: Response) => {
  const { query } = req;
  if (!query.token) {
    throw new NotFoundError(
      validationWording.notFound('token in query'),
      'token'
    );
  }
  try {
    const decoded: any = jwt.verify(query.token as string, REFRESH_TOKEN_KEY);
    const email = decoded.email;
    const password = decryptAES(decoded.secretKey);

    const userRepository = new UserRepository();
    const currentUser = await userRepository.getCurrentAuthByEmail(email);

    //-> role data
    const roleRepository = new RoleRepository();
    const role = await roleRepository.findById(
      currentUser?.customClaims?.role?.id
    );

    //-> execute login
    const { token, decodedToken } = await userRepository.logIn(
      { email: decoded.email, password: password },
      role,
      currentUser.uid,
      currentUser?.customClaims?.name,
      currentUser?.customClaims?.division
    );
    res.json({
      message: 'Successfully Re-Auth',
      token,
      refreshTokenJWT: query.token,
      data: decodedToken,
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).send({
        message: error?.message || 'Invalid Refresh Token',
        error: true,
        canRefresh: false,
      });
    } else {
      res.status(401).send({
        message: 'Invalid Refresh Token',
        error: true,
        canRefresh: false,
      });
    }
  }
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

export const getAllUserElastic = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const userRepository = new UserRepository();
  const { data, totalCount } = await userRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );

  const roleRepository = new RoleRepository();
  const dataWithRole = [];
  for (const user of data) {
    const role = await roleRepository.findByIdElastic(user.role);
    dataWithRole.push({ ...user, role });
  }

  res.json({
    message: 'Successfully Get User',
    data: dataWithRole,
    totalCount,
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
  const data = await userRepository.findByIdElastic(validateParam.uid);

  const roleRepository = new RoleRepository();
  const role = await roleRepository.findByIdElastic(data.role);

  res.json({
    message: 'Successfully Get User By Id',
    data: { ...data, role },
  });
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'userId');
  const userRepository = new UserRepository();
  //revoke
  await userRepository.revokeRefreshTokens(validateParam.uid);
  //delete
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
  const {
    token,
    refreshToken,
    refreshTokenJWT,
    decodedToken,
  } = await userRepository.logIn(
    validatedBody,
    role,
    currentUser.uid,
    currentUser?.customClaims?.name,
    currentUser?.customClaims?.division
  );
  res.json({
    message: 'Successfully Login',
    data: decodedToken,
    token,
    refreshToken,
    refreshTokenJWT,
  });
};

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);

  const roleRepository = new RoleRepository();
  const role = await roleRepository.findById(validatedBody.role);

  if (RoleAllDivision.includes(role.name)) {
    validatedBody.division = DivisionUser['All'];
  }
  const createParam = {
    ...validatedBody,
    role: role.id,
    profilePicture: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${defaultImg}?alt=media`,
  };

  const userRepository = new UserRepository();
  const { data } = await userRepository.signUp(createParam, role);

  res.json({
    message: 'Successfully Sign Up',
    data,
  });
};

export const updateUserById = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const { body, params } = req;

  //-> validate
  const validateParam = paramValidation(params, 'userId');
  let validatedBody =
    user.uid === validateParam.uid
      ? yupValidate(schema.updateMe, body)
      : yupValidate(schema.update, body);

  if (validatedBody?.role) {
    const roleRepository = new RoleRepository();
    const role = await roleRepository.findById(validatedBody.role);
    validatedBody = { ...validatedBody, role: role.id };
  }

  //-> execute update
  const createParam = JSON.parse(JSON.stringify(validatedBody));
  if (createParam?.password) {
    delete createParam.password;
  }
  const userRepository = new UserRepository();
  const data = await userRepository.update(validateParam.uid, createParam);

  //-> get role data
  const roleRepository = new RoleRepository();
  const role = await roleRepository.findById(data.role);

  if (user.uid === validateParam.uid) {
    const {
      token,
      refreshToken,
      refreshTokenJWT,
      decodedToken,
    } = await userRepository.updateAuthMe(
      validateParam.uid,
      { ...data, password: validatedBody.password },
      role
    );

    res.json({
      message: 'Successfully Update User',
      data: { ...data, role },
      token,
      refreshToken,
      refreshTokenJWT,
      decodedToken,
    });
  } else {
    let updateData: IUpdateAuth = {
      name: data.name,
      division: data.division,
      email: data.email,
    };
    if (validatedBody?.password) {
      updateData.password = validatedBody.password;
    }
    await userRepository.updateAuth(validateParam.uid, updateData, role);
    res.json({
      message: 'Successfully Update User',
      data: { ...data, role },
    });
  }
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
