import * as yup from 'yup';
import validationWording from '@constants/validationWording';

import getAllEnumKey from '@utils/getAllEnumKeys';
import { Performance } from './interface/evaluasi_klinik.interface';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    performance: yup
      .mixed<keyof typeof Performance>()
      .oneOf(
        getAllEnumKey(Performance),
        validationWording.oneOf('Performance', ...getAllEnumKey(Performance))
      )
      .required(validationWording.required('performance')),
    information: yup
      .string()
      .required(validationWording.required('information')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    performance: yup
      .mixed<keyof typeof Performance>()
      .oneOf(
        getAllEnumKey(Performance),
        validationWording.oneOf('Performance', ...getAllEnumKey(Performance))
      ),
    information: yup.string(),
  })
  .required();
export default { update, create };
