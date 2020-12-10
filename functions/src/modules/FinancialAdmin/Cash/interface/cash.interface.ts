export interface ICashBase {
  tanggal: Date;
  nominal: number;
  unitKerjaTujuan: string;
  lampiran: string[];
  information: string;
  createdAt?: Date;
  updatedAt?: Date;
}
