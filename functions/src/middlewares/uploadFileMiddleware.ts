// import * as fs from 'fs';
// import * as os from 'os';
// import * as path from 'path';
// import * as BusBoy from 'busboy';
// // import * as admin from 'firebase-admin';
// import { Request, Response, NextFunction } from 'express';
// import ExtensionError from '@interfaces/ExtensionError';
// const allowedMethods: string[] = ['POST', 'PUT'];

// export class FileUpload {
//   public fileName: string;
//   public encoding: string;
//   public mimeType: string;
//   protected buffer: Buffer;

//   constructor(opts: any) {
//     this.fileName = opts.fileName;
//     this.encoding = opts.encoding;
//     this.mimeType = opts.mimeType;
//     this.buffer = new Buffer('');
//   }

//   public appendData(data: any) {
//     this.buffer = Buffer.concat([this.buffer, data]);
//   }

//   public getBuffer(): Buffer {
//     return this.buffer;
//   }

//   public getBytes(): number {
//     return this.buffer.byteLength;
//   }
// }

// export default function filesUpload(
//   req: any,
//   res: Response,
//   next: NextFunction
// ) {
//   if (
//     allowedMethods.includes(req.method) &&
//     req.rawBody &&
//     req.headers['content-type'].startsWith('multipart/form-data')
//   ) {
//     const busboy = new BusBoy({
//       headers: req.headers,
//       limits: {
//         // Cloud functions impose this restriction anyway
//         fileSize: 10 * 1024 * 1024,
//       },
//     });

//     const fields = {};
//     const files = [];
//     const fileWrites = [];
//     // Note: os.tmpdir() points to an in-memory file system on GCF
//     // Thus, any files in it must fit in the instance's memory.
//     const tmpdir = os.tmpdir();

//     busboy.on('field', (key, value) => {
//       // You could do additional deserialization logic here, values will just be
//       // strings
//       fields[key] = value;
//     });

//     busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
//       const filepath = path.join(tmpdir, filename);
//       console.log(
//         `Handling file upload field ${fieldname}: ${filename} (${filepath})`
//       );
//       const writeStream = fs.createWriteStream(filepath);
//       file.pipe(writeStream);

//       fileWrites.push(
//         new Promise((resolve, reject) => {
//           file.on('end', () => writeStream.end());
//           writeStream.on('finish', () => {
//             fs.readFile(filepath, (err, buffer) => {
//               const size = Buffer.byteLength(buffer);
//               console.log(`${filename} is ${size} bytes`);
//               if (err) {
//                 return reject(err);
//               }

//               files.push({
//                 fieldname,
//                 originalname: filename,
//                 encoding,
//                 mimetype,
//                 buffer,
//                 size,
//               });

//               try {
//                 fs.unlinkSync(filepath);
//               } catch (error) {
//                 return reject(error);
//               }

//               resolve();
//             });
//           });
//           writeStream.on('error', reject);
//         })
//       );
//     });

//     busboy.on('finish', () => {
//       Promise.all(fileWrites)
//         .then(() => {
//           req.body = fields;
//           req.files = files;
//           next();
//         })
//         .catch(next);
//     });

//     busboy.end(req.rawBody);
//   } else {
//     next();
//   }
// }
