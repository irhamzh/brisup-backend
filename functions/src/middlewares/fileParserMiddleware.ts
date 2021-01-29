import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as BusBoy from 'busboy';
import { Response, NextFunction } from 'express';

import InvalidRequestError from '@interfaces/InvalidRequestError';

import { IFiles, StringKeys } from '@interfaces/BaseInterface';

// import ExtensionError from '@interfaces/ExtensionError';
const allowedMethods: string[] = ['POST', 'PUT'];

export default function fileParser(
  req: any,
  res: Response,
  next: NextFunction
) {
  if (
    allowedMethods.includes(req.method) &&
    req.rawBody &&
    req.headers['content-type'].startsWith('multipart/form-data')
  ) {
    const busboy = new BusBoy({
      headers: req.headers,
      limits: {
        fileSize: 3 * 1024 * 1024,
      },
    });

    const fields: StringKeys = {};
    const files: IFiles = {};
    const fileWrites: Array<Promise<void>> = [];

    const tmpdir = os.tmpdir();

    busboy.on('field', (key, value) => {
      fields[key] = value;
    });

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      filename = `${Date.now()}-${filename}`;
      const filepath = path.join(tmpdir, filename);
      console.log(
        `Handling file upload field ${fieldname}: ${filename} (${filepath})`
      );

      file.on('limit', function () {
        file.resume();

        fs.unlink(filepath, (err) => {
          if (err) {
            console.error(err, 'error Delete');
          } else {
            console.log('Byebyeeeeeeeee', filepath);
          }
        });
        throw new InvalidRequestError('File upload to large', 'file');
      });

      const writeStream = fs.createWriteStream(filepath);
      file.pipe(writeStream);

      fileWrites.push(
        new Promise((resolve, reject) => {
          file.on('end', () => writeStream.end());
          writeStream.on('finish', () => {
            fs.readFile(filepath, (err, buffer) => {
              const size = Buffer.byteLength(buffer);
              console.log(`${filename} is ${size} bytes`);
              if (err) {
                return reject(err);
              }
              files[fieldname] = {
                fieldname,
                filename,
                encoding,
                mimetype,
                buffer,
                size,
                path: filepath,
              };
              resolve();
            });
          });
          writeStream.on('error', reject);
        })
      );
    });

    busboy.on('finish', () => {
      Promise.all(fileWrites)
        .then(() => {
          req.body = fields;
          req.files = files;
          next();
        })
        .catch(next);
    });

    busboy.end(req.rawBody);
  } else {
    next();
  }
}
