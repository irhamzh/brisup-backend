import * as fs from 'fs';

import { IFiles } from '@interfaces/BaseInterface';

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
