const excelToJson = require('convert-excel-to-json');

// import removeFileTemporary from '@utils/removeFileTemporary';

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

export default async function handleImportExcel(
  path: string,
  columnToKey: StringKeys,
  files: IFiles
) {
  const dataExcel = excelToJson({
    sourceFile: path,
    header: {
      rows: 1,
    },
    sheets: ['Sheet1'],
    columnToKey: columnToKey,
  });
  // removeFileTemporary(files);
  return dataExcel.Sheet1 || [];
}
