import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as BusBoy from 'busboy';

import { Response, NextFunction } from 'express';
import ExtensionError from '@interfaces/ExtensionError';
const allowedMethods: string[] = ['POST', 'PUT'];
interface StringKeys {
  [key: string]: string;
}

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

export default function uploadFileMiddleware(
  extension: string[],
  name: string,
  isArray = false
) {
  return async function fileParser(
    req: any,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (
        allowedMethods.includes(req.method) &&
        req.rawBody &&
        req.headers['content-type'].startsWith('multipart/form-data')
      ) {
        const busboy = new BusBoy({
          headers: req.headers,
          limits: {
            fileSize: 10 * 1024 * 1024,
          },
        });

        const files: IFiles = {};
        const fields: StringKeys = {};
        const arrayFiles: { [key: string]: IFile[] } = {};
        const fileWrites: Array<Promise<void>> = [];
        const tmpdir = os.tmpdir();

        busboy.on('field', (key, value) => {
          fields[key] = value;
        });

        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
          if (!filename || (name !== fieldname && !isArray)) {
            file.resume();
            return;
          }

          if (!fieldname.includes(name)) {
            file.resume();
            return;
          }

          const [inputName] = fieldname.split('[');
          if (!inputName || inputName !== name) {
            file.resume();
            return;
          }

          const ext = path.extname(filename);
          if (!extension.includes(ext)) {
            file.resume();
            throw new ExtensionError(extension);
          }
          if (isArray) {
            arrayFiles[name] = [];
          }
          filename = `${Date.now()}-${filename}`;
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
                  if (isArray && inputName === name) {
                    arrayFiles[name].push({
                      fieldname,
                      filename,
                      encoding,
                      mimetype,
                      buffer,
                      size,
                      path: filepath,
                    });
                  }
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
              req.arrayFiles = arrayFiles;
              next();
            })
            .catch(next);
        });

        busboy.end(req.rawBody);
      } else {
        next();
      }
    } catch (e) {
      if (e instanceof ExtensionError) {
        res.status(400).json({
          message: e.message,
          error: true,
        });
        return;
      }
      res.status(500).json({
        message: 'Internal server Error',
        error: e.message,
        stack: e.stack,
      });
      return;
    }
  };
}
