// import { IRoleBase } from '@modules/MasterData/Role/interface/role.interface';
export interface IUserBase {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

//improve remove password from userdata
export interface IUserExtended extends IUserBase {
  password: string;
}
