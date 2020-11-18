import { Schema, ValidateOptions } from 'yup';

function yupValidate<T>(
  schema: Schema<T>,
  value: T | any,
  options?: ValidateOptions
): T {
  return schema.validateSync(value, {
    stripUnknown: true,
    ...options,
  });
}

export default yupValidate;
