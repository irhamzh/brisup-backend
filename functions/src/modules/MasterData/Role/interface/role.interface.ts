interface IAccessBase {
  create: boolean;
  update: boolean;
  delete: boolean;
  read: boolean;
}

interface IRoleAccess extends IAccessBase {
  dashboard: boolean;
  approvalKabag: boolean;
  approvalWakabag: boolean;
}

export interface IRoleBase {
  name: string;
  fixedAsset: IRoleAccess;
  procurement: IRoleAccess;
  generalAffair: IRoleAccess;
  financialAdmin: IRoleAccess;
  masterData: IAccessBase;
  createdAt?: Date;
  updatedAt?: Date;
}
