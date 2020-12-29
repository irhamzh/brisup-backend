export interface ISistemManajemenKinerjaBase {
  name: string;
  pn: number;
  penilaian: IPenilaian[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPenilaian {
  value: string;
  year: string;
}
