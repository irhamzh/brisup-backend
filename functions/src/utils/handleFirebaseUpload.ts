import * as admin from 'firebase-admin';

const { v4: uuidv4 } = require('uuid');

import config from '@utils/config';
import removeFileTemporary from '@utils/removeFileTemporary';

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

export default async function handleFirebaseUpload(
  pathFile: string,
  pathBucket: string,
  mimetype: string,
  files: IFiles
) {
  const downloadToken = uuidv4();

  await admin
    .storage()
    .bucket(config.storageBucket)
    .upload(pathFile, {
      resumable: false,
      destination: pathBucket,
      metadata: {
        metadata: {
          contentType: mimetype,
          firebaseStorageDownloadTokens: downloadToken,
        },
      },
    });

  removeFileTemporary(files);
  const adminUrl = `https://firebasestorage.googleapis.com/v0/b/${
    config.storageBucket
  }/o/${encodeURIComponent(pathBucket)}?alt=media&token=${downloadToken}`;

  return adminUrl;
}
