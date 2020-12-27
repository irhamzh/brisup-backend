interface IRoleAcceess {
  create: boolean;
  update: boolean;
  delete: boolean;
  read: boolean;
  dashboard: boolean;
  approvalKabag: boolean;
  approvalWakabag: boolean;
}

export interface IRoleBase {
  name: string;
  fixedAsset: IRoleAcceess;
  procurement: IRoleAcceess;
  generalAffair: IRoleAcceess;
  financialAdmin: IRoleAcceess;
  createdAt?: Date;
  updatedAt?: Date;
}
