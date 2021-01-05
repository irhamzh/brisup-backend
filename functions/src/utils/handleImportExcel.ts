const excelToJson = require('convert-excel-to-json');

// import removeFileTemporary from '@utils/removeFileTemporary';
import { StringKeys, IFiles } from '@interfaces/BaseInterface';

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
