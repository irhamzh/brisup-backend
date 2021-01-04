// import { IRoleBase } from '@modules/MasterData/Role/interface/role.interface';
export interface IUserBase {
  name: string;
  email: string;
  profilePicture: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserExtended extends IUserBase {
  password: string;
}
