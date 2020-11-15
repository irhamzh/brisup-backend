import * as yup from 'yup';
import validationWording from '@constants/validationWording';

export default function (params: any, field = 'uid') {
  const paramValidationData = yup
    .object()
    .shape({
      uid: yup.string().required(validationWording.required(field)),
    })
    .required();
  return paramValidationData.validateSync(params);
}
