export interface FilterQueryAttributes {
  page: string | number;
  limit: string | number;
  filtered: string;
  sorted: string;
}
export interface IApprovalLog {
  date: Date;
  userId: string;
  name: string;
  role: string;
  status: string;
}

export interface IFile {
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
  buffer: Buffer;
}
export interface IFiles {
  [key: string]: IFile;
}
export interface StringKeys {
  [key: string]: string;
}

export interface sortParamAttributes {
  id: string;
  desc: boolean;
}
export interface filterParamAttributes {
  id: string;
  value: string;
}
