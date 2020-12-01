import yupValidate from '@utils/yupValidate';

import schema from '../internship.schema';
import { Type } from '../interface/internship.interface';

export default function MappingBodyByType(
  key: string,
  body: any,
  action = 'create'
) {
  let validatedBody = undefined;
  if (action === 'create') {
    if (key.toLowerCase() === Type['Sekolah']?.toLowerCase()) {
      validatedBody = yupValidate(schema.createSekolah, body);
    } else {
      validatedBody = yupValidate(schema.createUniversity, body);
    }
  } else {
    if (key.toLowerCase() === Type['Sekolah']?.toLowerCase()) {
      validatedBody = yupValidate(schema.updateSekolah, body);
    } else {
      validatedBody = yupValidate(schema.updateUniversity, body);
    }
  }
  return validatedBody;
}
