import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import AccessError from '@interfaces/AccessError';
import paramValidation from '@utils/paramValidation';
import NotFoundError from '@interfaces/NotFoundError';
import validationWording from '@constants/validationWording';
import handleFirebaseUpload from '@utils/handleFirebaseUpload';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import VehicleRepository from '@modules/MasterData/Vehicle/vehicle.repository';

import { StatusPengadaan } from '@constants/BaseCondition';
// import { IUserBase } from '@modules/MasterData/User/interface/user.interface';

import {
  create,
  update,
  baseCreate,
  multiplePenihilan,
} from './payment.schema';
import PaymentRepository from './payment.repository';
import { TypePayment, UtilPayment } from './interface/payment.interface';
import { ApprovalStatus, ApprovalNextStatus } from '@constants/BaseCondition';

const defaultBucket = 'images/fa-payment/';

export const createPayment = async (req: any, res: Response) => {
  const user = res.locals.decoded;
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

  let createParam = {
    ...validatedBody,
    ...utilPayment,
    status: StatusPengadaan['Belum Berjalan'],
    lampiran,
  };

  if (validatedBody.typePayment === TypePayment['Penihilan PAUK']) {
    const log = {
      date: new Date(),
      userId: user.uid,
      name: user.name,
      role: user.role.name,
      statusPenihilan: ApprovalStatus['Unapproved'],
    };
    createParam = {
      ...createParam,
      approvalLogPenihilan: [log],
      statusPenihilan: ApprovalStatus['Unapproved'],
    };
  } else if (
    validatedBody.typePayment === TypePayment['Tagihan Service Kendaraan']
  ) {
    const vehicleRepository = new VehicleRepository();
    const vehicle = await vehicleRepository.findById(validatedBody.vehicle);
    createParam = {
      ...validatedBody,
      vehicle,
    };
  }

  const data = await paymentRepository.create(createParam);

  res.json({
    message: 'Successfully Create Aktivitas Payment',
    data,
  });
};

export const updatePayment = async (req: any, res: Response) => {
  const { body, params, arrayFiles } = req;
  const validateParam = paramValidation(params, 'id');

  // -> get payment by id
  const paymentRepository = new PaymentRepository();
  const ref = await paymentRepository.findById(validateParam.uid);

  // -> validate payment type
  const typePayment = ref?.typePayment;
  if (!typePayment) {
    throw new InvalidRequestError('Invalid Payment Type', 'typePayment');
  }
  let validatedBody = yupValidate(update[typePayment], body);

  if (arrayFiles?.lampiran && arrayFiles?.lampiran?.length > 0) {
    let lampiran = [];
    for (const key of arrayFiles.lampiran) {
      const { filename, path, mimetype, fieldname } = key;
      const pathBucket = defaultBucket + filename;
      const upload = await handleFirebaseUpload(path, pathBucket, mimetype, {
        [fieldname]: key,
      });
      lampiran.push(upload);
    }
    validatedBody = { ...validatedBody, lampiran };
  }

  if (
    typePayment === TypePayment['Tagihan Service Kendaraan'] &&
    validatedBody.vehicle
  ) {
    const vehicleRepository = new VehicleRepository();
    const vehicle = await vehicleRepository.findById(validatedBody.vehicle);
    validatedBody = {
      ...validatedBody,
      vehicle,
    };
  }

  const data: admin.firestore.DocumentData = await paymentRepository.update(
    validateParam.uid,
    validatedBody
  );
  res.json({
    message: 'Successfully Update Aktivitas Payment',
    data,
  });
};

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

export const approveProcess = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');

  const paymentRepository = new PaymentRepository();
  const ref = await paymentRepository.findById(validateParam.uid);
  if (ref.status !== StatusPengadaan['Belum Berjalan']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(
        ref.status,
        StatusPengadaan['Proses Persetujuan']
      ),
      'Payment'
    );
  }

  const data = await paymentRepository.update(validateParam.uid, {
    status: StatusPengadaan['Proses Persetujuan'],
  });
  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const approveWabag = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');

  if (
    !user ||
    (user?.role?.name !== 'Wakil Kepala Bagian' && user?.role?.name !== 'Admin')
  ) {
    throw new AccessError('Approve Wakil Kepala Bagian');
  }

  const paymentRepository = new PaymentRepository();
  const ref = await paymentRepository.findById(validateParam.uid);
  if (ref.status !== StatusPengadaan['Proses Persetujuan']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(
        ref.status,
        StatusPengadaan['Approved oleh Wakabag']
      ),
      'Payment'
    );
  }
  const data = await paymentRepository.update(validateParam.uid, {
    status: StatusPengadaan['Approved oleh Wakabag'],
  });
  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const approveKabag = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');

  if (
    !user ||
    (user?.role?.name !== 'Kepala Bagian' && user?.role?.name !== 'Admin')
  ) {
    throw new AccessError('Approve Kepala Bagian');
  }

  const paymentRepository = new PaymentRepository();
  const ref = await paymentRepository.findById(validateParam.uid);
  if (ref.status !== StatusPengadaan['Approved oleh Wakabag']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(
        ref.status,
        StatusPengadaan['Approved oleh Kabag']
      ),
      'Payment'
    );
  }

  const data = await paymentRepository.update(validateParam.uid, {
    status: StatusPengadaan['Approved oleh Kabag'],
  });
  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const approveFinish = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');

  const paymentRepository = new PaymentRepository();
  const ref = await paymentRepository.findById(validateParam.uid);
  if (ref.status !== StatusPengadaan['Approved oleh Kabag']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(
        ref.status,
        StatusPengadaan['Selesai']
      ),
      'Payment'
    );
  }

  const data = await paymentRepository.update(validateParam.uid, {
    status: StatusPengadaan['Selesai'],
  });
  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const dashboard = async (req: Request, res: Response) => {
  const { filtered } = req.query;
  const defaultFiltered = filtered ? JSON.parse(filtered as string) : [];

  const paymentRepository = new PaymentRepository();
  const totalBelumBerjalan =
    (await paymentRepository.countDocument(
      JSON.stringify([
        ...defaultFiltered,
        { id: 'status', value: StatusPengadaan['Belum Berjalan'] },
      ])
    )) || 0;
  const totalProsesPersetujuan =
    (await paymentRepository.countDocument(
      JSON.stringify([
        ...defaultFiltered,
        { id: 'status', value: StatusPengadaan['Proses Persetujuan'] },
      ])
    )) || 0;
  const totalApprovedWakabag =
    (await paymentRepository.countDocument(
      JSON.stringify([
        ...defaultFiltered,
        { id: 'status', value: StatusPengadaan['Approved oleh Wakabag'] },
      ])
    )) || 0;
  const totalApprovedKabag =
    (await paymentRepository.countDocument(
      JSON.stringify([
        ...defaultFiltered,
        { id: 'status', value: StatusPengadaan['Approved oleh Kabag'] },
      ])
    )) || 0;
  const totalSelesai =
    (await paymentRepository.countDocument(
      JSON.stringify([
        ...defaultFiltered,
        { id: 'status', value: StatusPengadaan['Selesai'] },
      ])
    )) || 0;
  const data = {
    totalBelumBerjalan,
    totalProsesPersetujuan:
      Number(totalProsesPersetujuan) + Number(totalApprovedWakabag) || 0,
    totalApprovedWakabag,
    totalApprovedKabag,
    totalBelumSelesai: totalApprovedKabag,
    totalSelesai,
  };
  res.json({
    message: 'Successfully getDashboard',
    data,
  });
};

export const approvalPenihilan = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');

  // -> get getPAUKById
  const paymentRepository = new PaymentRepository();
  const ref = await paymentRepository.findById(validateParam.uid);

  if (ref.typePayment !== TypePayment['Penihilan PAUK']) {
    throw new NotFoundError(validationWording.notFound('PAUK'), 'PAUK');
  }

  // -> get next statusPenihilan
  const currentStatus:
    | 'Unapproved'
    | 'Approved oleh Supervisor I'
    | 'Diajukan Penihilan' = ref.statusPenihilan;

  let statusPenihilan:
    | 'Unapproved'
    | 'Approved oleh Supervisor I'
    | 'Diajukan Penihilan'
    | 'Approved oleh Supervisor II'
    | 'Approved oleh Wakabag'
    | 'Approved oleh Kabag' = ApprovalNextStatus[currentStatus];

  // -> cek statusPenihilan sudah di posisi terkahir atau belum
  if (
    ref.statusPenihilan === ApprovalStatus['Approved oleh Wakabag'] ||
    ref.statusPenihilan === ApprovalStatus['Approved oleh Kabag']
  ) {
    throw new InvalidRequestError('Persetujuan telah selesai', 'PAUK');
  }

  //validate role
  if (
    (statusPenihilan === ApprovalStatus['Approved oleh Supervisor I'] ||
      statusPenihilan === ApprovalStatus['Approved oleh Supervisor II']) &&
    !user?.role?.name.includes('Supervisor')
  ) {
    throw new AccessError('Approve Supervisor');
  } else if (
    ref.statusPenihilan === ApprovalStatus['Approved oleh Supervisor II']
  ) {
    // -> set next statusPenihilan Approved oleh Supervisor II
    if (user?.role?.name !== 'Kepala Bagian') {
      statusPenihilan = ApprovalStatus['Approved oleh Kabag'];
    } else if (user?.role?.name !== 'Wakil Kepala Bagian') {
      statusPenihilan = ApprovalStatus['Approved oleh Wakabag'];
    } else {
      throw new AccessError(
        'Approve Wakil Kepala Bagian | Approve Kepala Bagian'
      );
    }
  }

  // -> set log
  const log = {
    statusPenihilan,
    date: new Date(),
    userId: user.uid,
    name: user.name,
    role: user.role.name,
  };
  const approvalLogPenihilan = [...ref.approvalLogPenihilan, log];

  //update statusPenihilan
  const data = await paymentRepository.update(validateParam.uid, {
    statusPenihilan,
    approvalLogPenihilan,
  });
  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const pengajuanPenihilan = async (req: Request, res: Response) => {
  const { body } = req;
  const user = res.locals.decoded;
  const validatedBody = yupValidate(multiplePenihilan, body);

  const persekotRepository = new PaymentRepository();
  const invalidRow = await persekotRepository.pengajuanPenihilan(
    validatedBody.paukIds,
    user
  );
  res.json({
    message: 'Successfully Update Persekot',
    invalidRow,
  });
};
