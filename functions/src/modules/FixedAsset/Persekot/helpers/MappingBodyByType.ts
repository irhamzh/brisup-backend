import yupValidate from '@utils/yupValidate';

import { Division } from '@constants/BaseCondition';

import schema from '../persekot.schema';

export default function MappingBodyByType(
  key: string,
  body: any,
  action = 'create'
) {
  let validatedBody = undefined;
  if (action === 'create') {
    if (key.toLowerCase() === Division['Financial Admin']?.toLowerCase()) {
      validatedBody = yupValidate(schema.crateFinancialAdmin, body);
    } else {
      validatedBody = yupValidate(schema.baseCreate, body);
    }
  } else {
    if (key.toLowerCase() === Division['Financial Admin']?.toLowerCase()) {
      validatedBody = yupValidate(schema.updateFinancialAdmin, body);
    } else {
      validatedBody = yupValidate(schema.baseUpdate, body);
    }
  }
  return validatedBody;
}
