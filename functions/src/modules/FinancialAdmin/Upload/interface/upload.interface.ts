export interface IUploadBase {
  tanggal: Date;
  typeUpload: string;
  lampiran: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const TypeUpload = ['Brinet', 'Brismart', 'Titipan'];
