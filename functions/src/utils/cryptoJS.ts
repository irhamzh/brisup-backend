import * as crypto from 'crypto-js';

import { SECRET_KEY } from '@constants/keys';

export function encryptAES(params: string) {
  return crypto.AES.encrypt(params, SECRET_KEY).toString();
}

export function decryptAES(params: string) {
  const bytes = crypto.AES.decrypt(params, SECRET_KEY);
  return bytes.toString(crypto.enc.Utf8);
}
