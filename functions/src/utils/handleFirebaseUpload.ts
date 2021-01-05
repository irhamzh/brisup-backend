import * as admin from 'firebase-admin';

const { v4: uuidv4 } = require('uuid');

import config from '@utils/config';
import { IFiles } from '@interfaces/BaseInterface';
import removeFileTemporary from '@utils/removeFileTemporary';

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
