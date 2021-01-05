import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as BusBoy from 'busboy';
import { Response, NextFunction } from 'express';

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
        // Cloud functions impose this restriction anyway
        fileSize: 10 * 1024 * 1024,
      },
    });

    const fields: StringKeys = {};
    const files: IFiles = {};
    const fileWrites: Array<Promise<void>> = [];

    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    const tmpdir = os.tmpdir();

    busboy.on('field', (key, value) => {
      // You could do additional deserialization logic here, values will just be
      // strings
      fields[key] = value;
    });

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      //  if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      //    throw new ExtensionError(['png', 'jpeg']);
      //  }
      const filepath = path.join(tmpdir, filename);
      console.log(
        `Handling file upload field ${fieldname}: ${filename} (${filepath})`
      );
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
