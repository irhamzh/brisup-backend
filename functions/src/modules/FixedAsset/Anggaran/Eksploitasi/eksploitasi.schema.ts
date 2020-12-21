import * as yup from 'yup';

import validationWording from '@constants/validationWording';

const baseCreate = yup
  .object()
  .shape({
    tanggal: yup.date().required(validationWording.required('tanggal')),
  })
  .required();

const create = yup
  .object()
  .shape({
    kode: yup.string().required(validationWording.required('kode')),
    deskripsi: yup.string().required(validationWording.required('deskripsi')),
    //bri corpu
    briCorpuBreakdownAnggaran: yup
      .number()
      .required(validationWording.required('briCorpuBreakdownAnggaran')),
    briCorpuRealisasiAnggaran: yup
      .number()
      .required(validationWording.required('briCorpuRealisasiAnggaran')),
    briCorpuSisaAnggaran: yup
      .number()
      .required(validationWording.required('briCorpuSisaAnggaran')),
    briCorpu: yup.string().required(validationWording.required('briCorpu')),
    //medan
    campusMedanBreakdownAnggaran: yup
      .number()
      .required(validationWording.required('campusMedanBreakdownAnggaran')),
    campusMedanRealisasiAnggaran: yup
      .number()
      .required(validationWording.required('campusMedanRealisasiAnggaran')),
    campusMedanSisaAnggaran: yup
      .number()
      .required(validationWording.required('campusMedanSisaAnggaran')),
    campusMedan: yup
      .string()
      .required(validationWording.required('campusMedan')),
    //padang
    campusPadangBreakdownAnggaran: yup
      .number()
      .required(validationWording.required('campusPadangBreakdownAnggaran')),
    campusPadangRealisasiAnggaran: yup
      .number()
      .required(validationWording.required('campusPadangRealisasiAnggaran')),
    campusPadangSisaAnggaran: yup
      .number()
      .required(validationWording.required('campusPadangSisaAnggaran')),
    campusPadang: yup
      .string()
      .required(validationWording.required('campusPadang')),
    //jakarta
    campusJakartaBreakdownAnggaran: yup
      .number()
      .required(validationWording.required('campusJakartaBreakdownAnggaran')),
    campusJakartaRealisasiAnggaran: yup
      .number()
      .required(validationWording.required('campusJakartaRealisasiAnggaran')),
    campusJakartaSisaAnggaran: yup
      .number()
      .required(validationWording.required('campusJakartaSisaAnggaran')),
    campusJakarta: yup
      .string()
      .required(validationWording.required('campusJakarta')),
    //bandung
    campusBandungBreakdownAnggaran: yup
      .number()
      .required(validationWording.required('campusBandungBreakdownAnggaran')),
    campusBandungRealisasiAnggaran: yup
      .number()
      .required(validationWording.required('campusBandungRealisasiAnggaran')),
    campusBandungSisaAnggaran: yup
      .number()
      .required(validationWording.required('campusBandungSisaAnggaran')),
    campusBandung: yup
      .string()
      .required(validationWording.required('campusBandung')),
    //yogyakarta
    campusYogyakartaBreakdownAnggaran: yup
      .number()
      .required(
        validationWording.required('campusYogyakartaBreakdownAnggaran')
      ),
    campusYogyakartaRealisasiAnggaran: yup
      .number()
      .required(
        validationWording.required('campusYogyakartaRealisasiAnggaran')
      ),
    campusYogyakartaSisaAnggaran: yup
      .number()
      .required(validationWording.required('campusYogyakartaSisaAnggaran')),
    campusYogyakarta: yup
      .string()
      .required(validationWording.required('campusYogyakarta')),
    //surabaya
    campusSurabayaBreakdownAnggaran: yup
      .number()
      .required(validationWording.required('campusSurabayaBreakdownAnggaran')),
    campusSurabayaRealisasiAnggaran: yup
      .number()
      .required(validationWording.required('campusSurabayaRealisasiAnggaran')),
    campusSurabayaSisaAnggaran: yup
      .number()
      .required(validationWording.required('campusSurabayaSisaAnggaran')),
    campusSurabaya: yup
      .string()
      .required(validationWording.required('campusSurabaya')),
    //makassar
    campusMakassarBreakdownAnggaran: yup
      .number()
      .required(validationWording.required('campusMakassarBreakdownAnggaran')),
    campusMakassarRealisasiAnggaran: yup
      .number()
      .required(validationWording.required('campusMakassarRealisasiAnggaran')),
    campusMakassarSisaAnggaran: yup
      .number()
      .required(validationWording.required('campusMakassarSisaAnggaran')),
    campusMakassar: yup
      .string()
      .required(validationWording.required('campusMakassar')),
    //total
    totalCampusBreakdownAnggaran: yup
      .number()
      .required(validationWording.required('totalCampusBreakdownAnggaran')),
    totalCampusRealisasiAnggaran: yup
      .number()
      .required(validationWording.required('totalCampusRealisasiAnggaran')),
    totalCampusSisaAnggaran: yup
      .number()
      .required(validationWording.required('totalCampusSisaAnggaran')),
    totalCampus: yup
      .string()
      .required(validationWording.required('totalCampus')),
  })
  .required();

export default { baseCreate, create };
