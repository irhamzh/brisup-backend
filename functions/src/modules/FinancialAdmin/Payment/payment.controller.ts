import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import handleFirebaseUpload from '@utils/handleFirebaseUpload';
import { StatusPengadaan } from '@constants/BaseCondition';

import { create, baseCreate } from './payment.schema';
import PaymentRepository from './payment.repository';
import { UtilPayment } from './interface/payment.interface';

const defaultBucket = 'images/fa-payment/';

export const createPayment = async (req: any, res: Response) => {
  const { arrayFiles, body } = req;
  const masterValidate = yupValidate(baseCreate, body);
  const typePayment = masterValidate.typePayment;
  const validatedBody = yupValidate(create[typePayment], body);
  const utilPayment = UtilPayment[typePayment];
  if (!arrayFiles?.lampiran || arrayFiles?.lampiran?.length < 1) {
    throw new InvalidRequestError('No files were uploaded', 'lampiran');
  }

  let lampiran = [];
  for (const key of arrayFiles.lampiran) {
    const { filename, path, mimetype, fieldname } = key;
    const pathBucket = defaultBucket + filename;
    const upload = await handleFirebaseUpload(path, pathBucket, mimetype, {
      [fieldname]: key,
    });
    lampiran.push(upload);
  }
  const paymentRepository = new PaymentRepository();
  const createParam = {
    ...validatedBody,
    ...utilPayment,
    status: StatusPengadaan['Belum Berjalan'],
    lampiran,
  };

  const data = await paymentRepository.create(createParam);

  res.json({
    message: 'Successfully Create Aktivitas Payment',
    data,
  });
};

// export const updatePayment = async (req: any, res: Response) => {
//   const { body, params, arrayFiles } = req;
//   const validateParam = paramValidation(params, 'id');
//   let validatedBody = undefined;
//   validatedBody = yupValidate(schema.update, body);
//   const paymentRepository = new PaymentRepository();

//   if (arrayFiles?.lampiran && arrayFiles?.lampiran?.length > 0) {
//     let lampiran = [];
//     for (const key of arrayFiles.lampiran) {
//       const { filename, path, mimetype, fieldname } = key;
//       const pathBucket = defaultBucket + filename;
//       const upload = await handleFirebaseUpload(path, pathBucket, mimetype, {
//         [fieldname]: key,
//       });
//       lampiran.push(upload);
//     }
//     validatedBody = { ...validatedBody, lampiran };
//   }
//   const data: admin.firestore.DocumentData = await paymentRepository.update(
//     validateParam.uid,
//     validatedBody
//   );
//   res.json({
//     message: 'Successfully Update Aktivitas Payment',
//     data,
//   });
// };

export const deletePaymentById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const paymentRepository = new PaymentRepository();

  const data = await paymentRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Payment By Id',
    data,
  });
};

export const getPaymentById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const paymentRepository = new PaymentRepository();
  const data: admin.firestore.DocumentData = await paymentRepository.findById(
    validateParam.uid
  );
  res.json({
    message: 'Successfully Get Payment By Id',
    data,
  });
};

export const getAllPayment = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const paymentRepository = new PaymentRepository();
  const data = await paymentRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await paymentRepository.countDocument(filtered as string);
  res.json({
    message: 'Successfully Get Payment',
    data,
    totalCount,
  });
};
