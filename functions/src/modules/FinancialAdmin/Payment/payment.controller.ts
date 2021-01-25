import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import AccessError from '@interfaces/AccessError';
import paramValidation from '@utils/paramValidation';
import NotFoundError from '@interfaces/NotFoundError';
import validationWording from '@constants/validationWording';
import handleFirebaseUpload from '@utils/handleFirebaseUpload';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import HotelRepository from '@modules/MasterData/Hotel/hotel.repository';
import VehicleRepository from '@modules/MasterData/Vehicle/vehicle.repository';
import CateringRepository from '@modules/MasterData/Catering/catering.repository';
import ProviderRepository from '@modules/MasterData/Provider/provider.repository';

import { StatusPengadaan } from '@constants/BaseCondition';
// import { IUserBase } from '@modules/MasterData/User/interface/user.interface';

import {
  create,
  update,
  baseCreate,
  multiplePenihilan,
} from './payment.schema';
import PaymentRepository from './payment.repository';
import {
  TypePayment,
  UtilPayment,
  WithProvider,
} from './interface/payment.interface';
import { ApprovalStatus, ApprovalNextStatus } from '@constants/BaseCondition';

const defaultBucket = 'images/fa-payment/';

type CurrentStatusType =
  | 'Unapproved'
  | 'Approved oleh Supervisor I'
  | 'Diajukan Penihilan';
type StatusApprovalType =
  | 'Unapproved'
  | 'Approved oleh Supervisor I'
  | 'Diajukan Penihilan'
  | 'Approved oleh Supervisor II'
  | 'Approved oleh Wakabag'
  | 'Approved oleh Kabag';

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
  const status = StatusPengadaan['Belum Berjalan'];
  const log = {
    date: new Date(),
    userId: user.uid,
    name: user.name,
    role: user.role.name,
    status,
  };
  let createParam = {
    ...validatedBody,
    ...utilPayment,
    status,
    approvalLog: [log],
    lampiran,
  };

  if (validatedBody.typePayment === TypePayment['Penihilan PAUK']) {
    const logPenihilan = {
      date: new Date(),
      userId: user.uid,
      name: user.name,
      role: user.role.name,
      statusPenihilan: ApprovalStatus['Unapproved'],
    };
    createParam = {
      ...createParam,
      approvalLogPenihilan: [logPenihilan],
      statusPenihilan: ApprovalStatus['Unapproved'],
    };
    //-> vehicle
  } else if (
    validatedBody.typePayment === TypePayment['Tagihan Service Kendaraan']
  ) {
    const vehicleRepository = new VehicleRepository();
    const vehicle = await vehicleRepository.findById(validatedBody.vehicle);
    createParam = {
      ...createParam,
      vehicle,
    };
    // ->catering
  } else if (validatedBody.typePayment === TypePayment['Catering']) {
    const cateringRepository = new CateringRepository();
    const catering = await cateringRepository.findById(validatedBody.catering);
    createParam = {
      ...createParam,
      catering,
    };
    // -> Provider
  } else if (WithProvider.includes(validatedBody.typePayment)) {
    const providerRepository = new ProviderRepository();
    const provider = await providerRepository.findById(validatedBody.provider);
    createParam = {
      ...createParam,
      provider,
    };
    // -> hotel
  } else if (validatedBody.typePayment === TypePayment['Hotel']) {
    const hotelRepository = new HotelRepository();
    const hotel = await hotelRepository.findById(validatedBody.hotel);
    createParam = {
      ...createParam,
      hotel,
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

  // -> vehicle
  if (
    typePayment === TypePayment['Tagihan Service Kendaraan'] &&
    validatedBody?.vehicle
  ) {
    const vehicleRepository = new VehicleRepository();
    const vehicle = await vehicleRepository.findById(validatedBody.vehicle);
    validatedBody = {
      ...validatedBody,
      vehicle,
    };
    // -> catering
  } else if (
    typePayment === TypePayment['Catering'] &&
    validatedBody?.catering
  ) {
    const cateringRepository = new CateringRepository();
    const catering = await cateringRepository.findById(validatedBody.catering);
    validatedBody = {
      ...validatedBody,
      catering,
    };
    // -> Provider
  } else if (WithProvider.includes(typePayment) && validatedBody?.provider) {
    const providerRepository = new ProviderRepository();
    const provider = await providerRepository.findById(validatedBody.provider);
    validatedBody = {
      ...validatedBody,
      provider,
    };
    // -> Hotel
  } else if (typePayment === TypePayment['Hotel'] && validatedBody?.hotel) {
    const hotelRepository = new HotelRepository();
    const hotel = await hotelRepository.findById(validatedBody.hotel);
    validatedBody = {
      ...validatedBody,
      hotel,
    };
  }

  const data: admin.firestore.DocumentData = await paymentRepository.update(
    validateParam.uid,
    validatedBody,
    'lampiran'
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
  const data: admin.firestore.DocumentData = await paymentRepository.findByIdElastic(
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
  const { data, totalCount } = await paymentRepository.findAllElastic(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  // const totalCount = await paymentRepository.countDocument(filtered as string);
  res.json({
    message: 'Successfully Get Payment',
    data,
    totalCount,
  });
};

export const approveProcess = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const status = StatusPengadaan['Proses Persetujuan'];

  const paymentRepository = new PaymentRepository();
  const ref = await paymentRepository.findById(validateParam.uid);
  if (ref.status !== StatusPengadaan['Belum Berjalan']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(ref.status, status),
      'Payment'
    );
  }

  const log = {
    date: new Date(),
    userId: user.uid,
    name: user.name,
    role: user.role.name,
    status,
  };
  const data = await paymentRepository.update(validateParam.uid, {
    status,
    approvalLog: [...ref.approvalLog, log],
  });
  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const approveSupervisor = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const status = StatusPengadaan['Approved oleh Supervisor'];

  const paymentRepository = new PaymentRepository();
  const ref = await paymentRepository.findById(validateParam.uid);
  if (ref.status !== StatusPengadaan['Proses Persetujuan']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(ref.status, status),
      'Payment'
    );
  }
  const log = {
    date: new Date(),
    userId: user.uid,
    name: user.name,
    role: user.role.name,
    status,
  };

  const data = await paymentRepository.update(validateParam.uid, {
    status,
    approvalLog: [...ref.approvalLog, log],
  });

  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const approveWakabag = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const status = StatusPengadaan['Approved oleh Wakabag'];

  const paymentRepository = new PaymentRepository();
  const ref = await paymentRepository.findById(validateParam.uid);
  if (ref.status !== StatusPengadaan['Approved oleh Supervisor']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(ref.status, status),
      'Payment'
    );
  }
  const log = {
    date: new Date(),
    userId: user.uid,
    name: user.name,
    role: user.role.name,
    status,
  };

  const data = await paymentRepository.update(validateParam.uid, {
    status,
    approvalLog: [...ref.approvalLog, log],
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
  const status = StatusPengadaan['Approved oleh Kabag'];

  const paymentRepository = new PaymentRepository();
  const ref = await paymentRepository.findById(validateParam.uid);
  if (ref.status !== StatusPengadaan['Approved oleh Supervisor']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(ref.status, status),
      'Payment'
    );
  }

  const log = {
    date: new Date(),
    userId: user.uid,
    name: user.name,
    role: user.role.name,
    status,
  };

  const data = await paymentRepository.update(validateParam.uid, {
    status,
    approvalLog: [...ref.approvalLog, log],
  });

  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const approveFinish = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  const status = StatusPengadaan['Selesai'];

  const paymentRepository = new PaymentRepository();
  const ref = await paymentRepository.findById(validateParam.uid);
  if (
    ref.status !== StatusPengadaan['Approved oleh Kabag'] ||
    ref.status !== StatusPengadaan['Approved oleh Wakabag']
  ) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(ref.status, status),
      'Payment'
    );
  }

  const log = {
    date: new Date(),
    userId: user.uid,
    name: user.name,
    role: user.role.name,
    status,
  };

  const data = await paymentRepository.update(validateParam.uid, {
    status,
    approvalLog: [...ref.approvalLog, log],
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
  const role = user?.role;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');

  // -> get getPAUKById
  const paymentRepository = new PaymentRepository();
  const ref = await paymentRepository.findById(validateParam.uid);

  if (ref.typePayment !== TypePayment['Penihilan PAUK']) {
    throw new NotFoundError(validationWording.notFound('PAUK'), 'PAUK');
  }

  // -> cek statusPenihilan sudah di posisi terkahir atau belum
  if (
    ref.statusPenihilan === ApprovalStatus['Approved oleh Wakabag'] ||
    ref.statusPenihilan === ApprovalStatus['Approved oleh Kabag']
  ) {
    throw new InvalidRequestError('Persetujuan telah selesai', 'PAUK');
  }

  // -> get next statusPenihilan
  const currentStatus: CurrentStatusType = ref.statusPenihilan;
  let statusPenihilan: StatusApprovalType = ApprovalNextStatus[currentStatus];

  //validate role
  if (
    (statusPenihilan === ApprovalStatus['Approved oleh Supervisor I'] ||
      statusPenihilan === ApprovalStatus['Approved oleh Supervisor II']) &&
    !role['financialAdmin']['approvalSupervisor']
  ) {
    throw new AccessError('Approve Supervisor');
  } else if (
    ref.statusPenihilan === ApprovalStatus['Approved oleh Supervisor II']
  ) {
    // -> set next statusPenihilan Approved oleh Supervisor II
    if (role['financialAdmin']['approvalKabag']) {
      status = ApprovalStatus['Approved oleh Kabag'];
    } else if (role['financialAdmin']['approvalWakabag']) {
      status = ApprovalStatus['Approved oleh Wakabag'];
    } else {
      throw new AccessError(
        'Approve Wakil Kepala Bagian | Approve Kepala Bagian Financial'
      );
    }
  }

  // -> set log
  const log = {
    statusPenihilan,
    date: new Date(),
    userId: user.uid,
    name: user.name,
    role: role.name,
  };
  const approvalLogPenihilan = [...ref.approvalLogPenihilan, log];

  //update statusPenihilan
  const data = await paymentRepository.update(validateParam.uid, {
    statusPenihilan,
    approvalLogPenihilan,
  });
  res.json({
    message: 'Sukses Approve Persekot',
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
