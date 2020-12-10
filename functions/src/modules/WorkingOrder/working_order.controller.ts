import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import AccessError from '@interfaces/AccessError';
import { Division } from '@constants/BaseCondition';
import paramValidation from '@utils/paramValidation';
import NotFoundError from '@interfaces/NotFoundError';
import { StatusPengadaan } from '@constants/BaseCondition';
import validationWording from '@constants/validationWording';
import schema from '@modules/WorkingOrder/working_order.schema';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import { IUserBase } from '@modules/MasterData/User/interface/user.interface';
import WorkingOrderRepository from '@modules/WorkingOrder/working_order.repository';

import MappingBodyByType from './helpers/MappingBodyByType';

export const createWorkingOrder = async (req: Request, res: Response) => {
  const { body } = req;
  const masterValidate = yupValidate(schema.baseCreate, body);
  const validatedBody: any = MappingBodyByType(masterValidate.division, body);

  const workingOrderRepository = new WorkingOrderRepository();
  const data = await workingOrderRepository.create({
    ...validatedBody,
    status: StatusPengadaan['Belum Berjalan'],
  });

  res.json({
    message: 'Successfully Create WorkingOrder',
    data,
  });
};

export const updateWorkingOrder = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'workingOrderId');
  const workingOrderRepository = new WorkingOrderRepository();
  const ref = await workingOrderRepository.findById(validateParam.uid);

  const validatedBody: any = MappingBodyByType(ref?.division, body, 'update');
  const data = await workingOrderRepository.update(
    validateParam.uid,
    validatedBody
  );

  res.json({
    message: 'Successfully Update WorkingOrder',
    data,
  });
};

export const getWorkingOrderById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'workingOrderId');
  const workingOrderRepository = new WorkingOrderRepository();
  const data = await workingOrderRepository.findById(validateParam.uid);

  res.json({
    message: 'Successfully Get WorkingOrder By Id',
    data,
  });
};

export const getAllWorkingOrder = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const workingOrderRepository = new WorkingOrderRepository();
  const data = await workingOrderRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await workingOrderRepository.countDocument(
    filtered as string
  );

  res.json({
    message: 'Successfully Get WorkingOrder',
    data,
    totalCount,
  });
};

export const deleteWorkingOrderById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'workingOrderId');
  const workingOrderRepository = new WorkingOrderRepository();
  const data = await workingOrderRepository.delete(validateParam.uid);
  res.json({
    message: 'SuccessfullyDeleteBy Id',
    data,
  });
};

export const approveProcess = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'id');

  const workingOrderRepository = new WorkingOrderRepository();
  const ref = await workingOrderRepository.findById(validateParam.uid);
  if (ref.division !== Division['General Affair']) {
    throw new NotFoundError(
      validationWording.notFound('working order general Affair'),
      'Working Order'
    );
  }
  if (ref.status !== StatusPengadaan['Belum Berjalan']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(
        ref.status,
        StatusPengadaan['Proses Persetujuan']
      ),
      'Working Order'
    );
  }
  const data = await workingOrderRepository.update(validateParam.uid, {
    status: StatusPengadaan['Proses Persetujuan'],
  });
  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const approveWabag = async (req: Request, res: Response) => {
  const user: IUserBase = res.locals.decoded;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');

  if (!user || user?.role?.name !== 'Wakil Kepala Bagian') {
    throw new AccessError('Approve Wakil Kepala Bagian');
  }

  const workingOrderRepository = new WorkingOrderRepository();

  const ref = await workingOrderRepository.findById(validateParam.uid);
  if (ref.division !== Division['General Affair']) {
    throw new NotFoundError(
      validationWording.notFound('working order general Affair'),
      'Working Order'
    );
  }
  if (ref.status !== StatusPengadaan['Proses Persetujuan']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(
        ref.status,
        StatusPengadaan['Approved oleh Wakabag']
      ),
      'Working Order'
    );
  }

  const data = await workingOrderRepository.update(validateParam.uid, {
    status: StatusPengadaan['Approved oleh Wakabag'],
  });
  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const approveKabag = async (req: Request, res: Response) => {
  const user: IUserBase = res.locals.decoded;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');
  console.log(res.locals.decoded);
  if (!user || user?.role?.name !== 'Kepala Bagian') {
    throw new AccessError('Approve Kepala Bagian');
  }

  const workingOrderRepository = new WorkingOrderRepository();

  const ref = await workingOrderRepository.findById(validateParam.uid);
  if (ref.division !== Division['General Affair']) {
    throw new NotFoundError(
      validationWording.notFound('working order general Affair'),
      'Working Order'
    );
  }
  if (ref.status !== StatusPengadaan['Approved oleh Wakabag']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(
        ref.status,
        StatusPengadaan['Approved oleh Kabag']
      ),
      'Working Order'
    );
  }

  const data = await workingOrderRepository.update(validateParam.uid, {
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

  const workingOrderRepository = new WorkingOrderRepository();
  const ref = await workingOrderRepository.findById(validateParam.uid);
  if (ref.division !== Division['General Affair']) {
    throw new NotFoundError(
      validationWording.notFound('working order general Affair'),
      'Working Order'
    );
  }
  if (ref.status !== StatusPengadaan['Approved oleh Kabag']) {
    throw new InvalidRequestError(
      validationWording.invalidNextStatus(
        ref.status,
        StatusPengadaan['Selesai']
      ),
      'Working Order'
    );
  }

  const data = await workingOrderRepository.update(validateParam.uid, {
    status: StatusPengadaan['Selesai'],
  });
  res.json({
    message: 'Successfully Update Data',
    data,
  });
};

export const dashboard = async (req: Request, res: Response) => {
  const workingOrderRepository = new WorkingOrderRepository();
  const totalBelumBerjalan =
    (await workingOrderRepository.countDocument(
      JSON.stringify([
        { id: 'status', value: StatusPengadaan['Belum Berjalan'] },
      ])
    )) || 0;
  const totalProsesPersetujuan =
    (await workingOrderRepository.countDocument(
      JSON.stringify([
        { id: 'status', value: StatusPengadaan['Proses Persetujuan'] },
      ])
    )) || 0;
  const totalApprovedWakabag =
    (await workingOrderRepository.countDocument(
      JSON.stringify([
        { id: 'status', value: StatusPengadaan['Approved oleh Wakabag'] },
      ])
    )) || 0;
  const totalApprovedKabag =
    (await workingOrderRepository.countDocument(
      JSON.stringify([
        { id: 'status', value: StatusPengadaan['Approved oleh Kabag'] },
      ])
    )) || 0;
  const totalSelesai =
    (await workingOrderRepository.countDocument(
      JSON.stringify([{ id: 'status', value: StatusPengadaan['Selesai'] }])
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