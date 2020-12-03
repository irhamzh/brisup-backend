import { IRoleBase } from '@modules/MasterData/Role/interface/role.interface';
export interface IUserBase {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  role: IRoleBase;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

//improve remove password from userdata
export interface IUserExtended extends IUserBase {
  password: string;
}
