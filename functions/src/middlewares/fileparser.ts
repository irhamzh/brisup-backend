// const Busboy = require('busboy');

// const allowedMethods: string[] = ['POST', 'PUT'];

// export class FileUpload {

//     public fileName: string;
//     public encoding: string;
//     public mimeType: string;
//     protected buffer: Buffer;

//     constructor(opts: any) {
//         this.fileName = opts.fileName;
//         this.encoding = opts.encoding;
//         this.mimeType = opts.mimeType;
//         this.buffer = new Buffer('');
//     }

//     public appendData(data: any) {
//         this.buffer = Buffer.concat([this.buffer, data]);
//     }

//     public getBuffer(): Buffer {
//         return this.buffer;
//     }

//     public getBytes(): number {
//         return this.buffer.byteLength;
//     }

// }

// export const fileParser = function (req, res, next) {
//     if (
//         allowedMethods.includes(req.method) && req.rawBody &&
//         req.headers['content-type'].startsWith('multipart/form-data')
//     ) {
//         const busboy = new Busboy({ headers: req.headers });
//         // Placeholder
//         let files: { [fieldName: string]: FileUpload } = {};
//         req.body = {};
//         // This callback will be invoked for each file uploaded
//         busboy.on('file', (fieldName, file, fileName, encoding, mimeType) => {
//             // Note that os.tmpdir() is an in-memory file system, so should only
//             // be used for files small enough to fit in memory.
//             files[fieldName] = new FileUpload({
//                 fileName: fileName,
//                 encoding: encoding,
//                 mimeType: mimeType
//             });
//             file.on('data', (data) => {
//                 files[fieldName].appendData(data);
//             });
//         });
//         busboy.on('field', (fieldName, value) => {
//             req.body[fieldName] = value;
//         });
//         // This callback will be invoked after all uploaded files are saved.
//         busboy.on('finish', () => {
//             req.files = files;
//             next();
//         });
//         // The raw bytes of the upload will be in req.rawBody.  Send it to busboy, and get
//         // a callback when it's finished.
//         busboy.end(req.rawBody);
//     } else {
//         next();
//     }
// };
// //
