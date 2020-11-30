import * as fs from 'fs';

interface IFile {
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
  buffer: Buffer;
}

interface IFiles {
  [key: string]: IFile;
}

export default function removeFileTemporary(files: IFiles) {
  if (files && Object.keys(files).length > 0) {
    const entryFiles = Object.entries(files);
    for (let i = 0; i < entryFiles.length; i++) {
      const [key, value] = entryFiles[i];
      console.log('Byebyeeeeeeeee', key, value.path);
      fs.unlinkSync(value.path);
    }
  }
}
