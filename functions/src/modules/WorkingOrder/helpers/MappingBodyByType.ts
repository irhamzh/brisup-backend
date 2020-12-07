import yupValidate from '@utils/yupValidate';
import { Division } from '@constants/BaseCondition';
import generateUniqueId from '@utils/generateAutoNumber';

import schema from '../working_order.schema';

export default function MappingBodyByType(
  key: string,
  body: any,
  action = 'create'
) {
  let validatedBody = undefined;
  if (action === 'create') {
    if (key.toLowerCase() === Division['General Affair']?.toLowerCase()) {
      validatedBody = yupValidate(schema.createGeneralAffair, body);
      const kodeWorkingOrder = generateUniqueId({
        length: 10,
        prefix: 'WK-GA-',
      });
      validatedBody = { ...validatedBody, kodeWorkingOrder };
    } else {
      validatedBody = yupValidate(schema.create, body);
      if (
        key.toLowerCase() === Division['Fixed Asset' as Division]?.toLowerCase()
      ) {
        const kodeWorkingOrder = generateUniqueId({
          length: 10,
          prefix: 'WK-FA-',
        });
        validatedBody = { ...validatedBody, kodeWorkingOrder };
      } else {
        const kodeWorkingOrder = generateUniqueId({
          length: 10,
          prefix: 'WK-PR-',
        });
        validatedBody = { ...validatedBody, kodeWorkingOrder };
      }
    }
  } else {
    if (key.toLowerCase() === Division['General Affair']?.toLowerCase()) {
      validatedBody = yupValidate(schema.updateGeneralAffair, body);
    } else {
      validatedBody = yupValidate(schema.update, body);
    }
  }
  return validatedBody;
}
