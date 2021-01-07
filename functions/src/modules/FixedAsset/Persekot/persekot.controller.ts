import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import paramValidation from '@utils/paramValidation';
// import validationWording from '@constants/validationWording';
// import NotFoundError from '@interfaces/NotFoundError';
import AccessError from '@interfaces/AccessError';
import InvalidRequestError from '@interfaces/InvalidRequestError';

import schema from './persekot.schema';
import PersekotRepository from './persekot.repository';
import MappingBodyByType from './helpers/MappingBodyByType';
import {
  ApprovalStatus,
  ApprovalNextStatus,
} from './interface/persekot.interface';

export const createPersekot = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const { body } = req;
  const masterValidate = yupValidate(schema.baseCreate, body);
  const validatedBody = MappingBodyByType(masterValidate.division, body);

  const persekotRepository = new PersekotRepository();
  const log = {
    date: new Date(),
    userId: user.uid,
    name: user.name,
    role: user.role.name,
    status: ApprovalStatus['Unapproved'],
  };
  const data = await persekotRepository.create({
    ...validatedBody,
    status: ApprovalStatus['Unapproved'],
    approvalLog: [log],
  });

  res.json({
    message: 'Successfully Create Persekot',
    data,
  });
};

export const updatePersekot = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'persekotId');
  const persekotRepository = new PersekotRepository();
  const ref = await persekotRepository.findById(validateParam.uid);
  const validatedBody = MappingBodyByType(ref?.division, body, 'update');

  const data = await persekotRepository.update(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update Persekot',
    data,
  });
};

export const getPersekotById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'persekotId');
  const persekotRepository = new PersekotRepository();
  const data = await persekotRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get PersekotBy Id',
    data,
  });
};

export const getAllPersekot = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const persekotRepository = new PersekotRepository();
  const data = await persekotRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await persekotRepository.countDocument(filtered as string);

  res.json({
    message: 'Successfully Get Persekot',
    data,
    totalCount,
  });
};

export const deletePersekotById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'persekotId');
  const persekotRepository = new PersekotRepository();
  const data = await persekotRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Persekot By Id',
    data,
  });
};

export const deleteMultiplePersekot = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.deleteArrayIds, body);

  const persekotRepository = new PersekotRepository();
  await persekotRepository.deleteMultiple(validatedBody.persekotIds);
  res.json({
    message: 'Successfully Delete Multiple Persekot',
    deletedPersekot: validatedBody.persekotIds,
  });
};

export const approval = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');

  // -> get getPersekotById
  const persekotRepository = new PersekotRepository();
  const ref = await persekotRepository.findById(validateParam.uid);

  // -> get next status
  const currentStatus:
    | 'Unapproved'
    | 'Approved oleh Supervisor I'
    | 'Diajukan Penihilan' = ref.status;

  let status:
    | 'Unapproved'
    | 'Approved oleh Supervisor I'
    | 'Diajukan Penihilan'
    | 'Approved oleh Supervisor II'
    | 'Approved oleh Wakabag'
    | 'Approved oleh Kabag' = ApprovalNextStatus[currentStatus];

  // -> cek status sudah di posisi terkahir atau belum
  if (
    ref.status === ApprovalStatus['Approved oleh Wakabag'] ||
    ref.status === ApprovalStatus['Approved oleh Kabag']
  ) {
    throw new InvalidRequestError('Persetujuan telah selesai', 'Persekot');
  }

  //validate role
  if (
    (status === ApprovalStatus['Approved oleh Supervisor I'] ||
      status === ApprovalStatus['Approved oleh Supervisor II']) &&
    user?.role?.name !== 'Supervisor'
  ) {
    throw new AccessError('Approve Supervisor');
  } else if (ref.status === ApprovalStatus['Approved oleh Supervisor II']) {
    // -> set next status Approved oleh Supervisor II
    if (user?.role?.name !== 'Kepala Bagian') {
      status = ApprovalStatus['Approved oleh Kabag'];
    } else if (user?.role?.name !== 'Wakil Kepala Bagian') {
      status = ApprovalStatus['Approved oleh Wakabag'];
    } else {
      throw new AccessError(
        'Approve Wakil Kepala Bagian | Approve Kepala Bagian'
      );
    }
  }

  // -> set log
  const log = {
    status,
    date: new Date(),
    userId: user.uid,
    name: user.name,
    role: user.role.name,
  };
  const approvalLog = [...ref.approvalLog, log];

  //update status
  const data = await persekotRepository.update(validateParam.uid, {
    status,
    approvalLog,
  });
  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const pengajuanPenihilan = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.deleteArrayIds, body);

  const persekotRepository = new PersekotRepository();
  await persekotRepository.deleteMultiple(validatedBody.persekotIds);
  res.json({
    message: 'Successfully Delete Multiple Persekot',
    deletedPersekot: validatedBody.persekotIds,
  });
};
