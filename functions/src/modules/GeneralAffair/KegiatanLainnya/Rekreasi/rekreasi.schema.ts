import * as yup from 'yup';
import validationWording from '@constants/validationWording';

const create = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
    name: yup.string().required(validationWording.required('name')),
    jumlahSiswa: yup
      .number()
      .required(validationWording.required('jumlahSiswa')),
    pic: yup.string().required(validationWording.required('pic')),
    formPermintaanLop: yup
      .boolean()
      .required(validationWording.required('formPermintaanLop')),
    ijinPenugasan: yup
      .boolean()
      .required(validationWording.required('ijinPenugasan')),
    biayaRekreasi: yup
      .boolean()
      .required(validationWording.required('biayaRekreasi')),
    laporanRekreasi: yup
      .boolean()
      .required(validationWording.required('laporanRekreasi')),
  })
  .required();

const update = yup
  .object()
  .shape({
    tanggal: yup.date(),
    name: yup.string(),
    jumlahSiswa: yup.number(),
    pic: yup.string(),
    formPermintaanLop: yup.boolean(),
    ijinPenugasan: yup.boolean(),
    biayaRekreasi: yup.boolean(),
    laporanRekreasi: yup.boolean(),
  })
  .required();

export default {
  create,
  update,
};
