import * as yup from 'yup';
import validationWording from '@constants/validationWording';

export default function (params: string, field = 'uid') {
  const paramValidationData = yup.object().shape({
    uid: yup.string().required(validationWording.required(field)),
  });
  return paramValidationData.validateSync(params);
}
