import { IRoleBase } from '@modules/MasterData/Role/interface/role.interface';
export interface IUserBase {
  name: string;
  email: string;
  profilePicture: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDecoded {
  uid: string;
  name: string;
  email: string;
  role: IRoleBase;
}

export interface IUserExtended extends IUserBase {
  password: string;
}
