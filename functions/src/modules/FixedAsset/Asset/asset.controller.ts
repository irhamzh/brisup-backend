import { Request, Response } from 'express';

import yupValidate from '@utils/yupValidate';
import AccessError from '@interfaces/AccessError';
import paramValidation from '@utils/paramValidation';
import schema from '@modules/FixedAsset/Asset/asset.schema';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import AssetRepository from '@modules/FixedAsset/Asset/asset.repository';
import {
  ApprovalStatusAsset,
  ApprovalNextStatusAsset,
} from './interface/asset.interface';

type CurrentStatusType =
  | 'Unapproved'
  | 'Approved oleh Supervisor I'
  | 'Diajukan Penghapusbukuan';
type StatusApprovalType =
  | 'Unapproved'
  | 'Approved oleh Supervisor I'
  | 'Diajukan Penghapusbukuan'
  | 'Approved oleh Supervisor II'
  | 'Approved oleh Wakabag'
  | 'Approved oleh Kabag';

export const createAsset = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const { body } = req;
  const validatedBody = yupValidate(schema.create, body);
  const assetRepository = new AssetRepository();
  let createParam = validatedBody;
  if (!validatedBody.condition) {
    createParam.condition = 'Belum Ditentukan';
  }

  const log = {
    date: new Date(),
    userId: user.uid,
    name: user.name,
    role: user.role.name,
    status: ApprovalStatusAsset['Unapproved'],
  };
  const data = await assetRepository.create({
    ...validatedBody,
    status: ApprovalStatusAsset['Unapproved'],
    approvalLog: [log],
  });

  res.json({
    message: 'Successfully Create Asset',
    data,
  });
};

export const updateAsset = async (req: Request, res: Response) => {
  const { body, params } = req;
  const validateParam = paramValidation(params, 'assetId');
  const validatedBody = yupValidate(schema.update, body);
  const assetRepository = new AssetRepository();
  const data = await assetRepository.update(validateParam.uid, validatedBody);
  res.json({
    message: 'Successfully Update Asset',
    data,
  });
};

export const getAssetById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'assetId');
  const assetRepository = new AssetRepository();
  const data = await assetRepository.findById(validateParam.uid);
  res.json({
    message: 'Successfully Get Asset By Id',
    data,
  });
};

export const getAllAsset = async (req: Request, res: Response) => {
  const { page, limit, filtered, sorted } = req.query;
  const assetRepository = new AssetRepository();
  const data = await assetRepository.findAll(
    page as string,
    limit as string,
    filtered as string,
    sorted as string
  );
  const totalCount = await assetRepository.countDocument(filtered as string);
  res.json({
    message: 'Successfully Get All Asset',
    data,
    totalCount,
  });
};

export const deleteAssetById = async (req: Request, res: Response) => {
  const { params } = req;
  const validateParam = paramValidation(params, 'assetId');
  const assetRepository = new AssetRepository();
  const data = await assetRepository.delete(validateParam.uid);
  res.json({
    message: 'Successfully Delete Asset By Id',
    data,
  });
};

export const deleteMultipleAsset = async (req: Request, res: Response) => {
  const { body } = req;
  const validatedBody = yupValidate(schema.deleteArrayIds, body);
  const assetRepository = new AssetRepository();
  await assetRepository.deleteMultiple(validatedBody.assetIds);
  res.json({
    message: 'Successfully Delete Multiple Asset',
    deletedAsset: validatedBody.assetIds,
  });
};

export const importExcel = async (req: any, res: Response) => {
  const { files } = req;

  const assetRepository = new AssetRepository();
  const invalidRow = await assetRepository.importExcel(
    files,
    {
      B: 'name',
      C: 'information',
      D: 'condition',
    },
    schema.create
  );

  res.json({
    message: 'Successfully Import Asset',
    invalidRow,
  });
};

export const approval = async (req: Request, res: Response) => {
  const user = res.locals.decoded;
  const role = user?.role;
  const { params } = req;
  const validateParam = paramValidation(params, 'id');

  // -> get getPersekotById
  const assetRepository = new AssetRepository();
  const ref = await assetRepository.findById(validateParam.uid);

  // -> cek status sudah di posisi terkahir atau belum
  if (
    ref.status === ApprovalStatusAsset['Approved oleh Wakabag'] ||
    ref.status === ApprovalStatusAsset['Approved oleh Kabag']
  ) {
    throw new InvalidRequestError('Persetujuan telah selesai', 'Persekot');
  }

  // -> get next status
  const currentStatus: CurrentStatusType = ref.status;
  let status: StatusApprovalType = ApprovalNextStatusAsset[currentStatus];

  //validate role
  if (
    (status === ApprovalStatusAsset['Approved oleh Supervisor I'] ||
      status === ApprovalStatusAsset['Approved oleh Supervisor II']) &&
    !role['fixedAsset']['approvalSupervisor']
  ) {
    throw new AccessError('Approve Supervisor Fixed Asset');
  } else if (
    ref.status === ApprovalStatusAsset['Approved oleh Supervisor II']
  ) {
    // -> set next status Approved oleh Supervisor II
    if (role['fixedAsset']['approvalKabag']) {
      status = ApprovalStatusAsset['Approved oleh Kabag'];
    } else if (role['fixedAsset']['approvalWakabag']) {
      status = ApprovalStatusAsset['Approved oleh Wakabag'];
    } else {
      throw new AccessError(
        'Approve Wakil Kepala Bagian | Approve Kepala Bagian Fixed Asset'
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
  const data = await assetRepository.update(validateParam.uid, {
    status,
    approvalLog,
  });
  res.json({
    message: 'Sukses Approve Persekot',
    data,
  });
};

export const pengajuanPenghapusbukuan = async (req: Request, res: Response) => {
  const { body } = req;
  const user = res.locals.decoded;
  const validatedBody = yupValidate(schema.deleteArrayIds, body);

  const persekotRepository = new AssetRepository();
  const invalidRow = await persekotRepository.pengajuanPenghapusbukuan(
    validatedBody.assetIds,
    user
  );
  res.json({
    message: 'Sukses Approve Persekot',
    invalidRow,
  });
};
