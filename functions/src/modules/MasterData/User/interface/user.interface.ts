import { IRoleBase } from '@modules/MasterData/Role/interface/role.interface';

export interface IUserBase {
  name: string;
  email: string;
  role: string;
  division: string;
  profilePicture: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDecoded {
  uid: string;
  name: string;
  email: string;
  role: IRoleBase;
  division: string;
}

export interface IUserExtended extends IUserBase {
  password: string;
}
