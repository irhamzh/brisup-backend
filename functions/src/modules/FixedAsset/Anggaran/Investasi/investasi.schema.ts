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
    briCorpuBreakdownAnggaranBiayaSatuan: yup
      .number()
      .required(
        validationWording.required('briCorpuBreakdownAnggaranBiayaSatuan')
      ),
    briCorpuBreakdownAnggaranJumlah: yup
      .number()
      .required(validationWording.required('briCorpuBreakdownAnggaranJumlah')),
    briCorpuBreakdownAnggaranTotalBiaya: yup
      .number()
      .required(
        validationWording.required('briCorpuBreakdownAnggaranTotalBiaya')
      ),
    briCorpuRealisasiAnggaranBiayaSatuan: yup
      .number()
      .required(
        validationWording.required('briCorpuRealisasiAnggaranBiayaSatuan')
      ),
    briCorpuRealisasiAnggaranJumlah: yup
      .number()
      .required(validationWording.required('briCorpuRealisasiAnggaranJumlah')),
    briCorpuRealisasiAnggaranTotalBiaya: yup
      .number()
      .required(
        validationWording.required('briCorpuRealisasiAnggaranTotalBiaya')
      ),
    briCorpuSisaAnggaran: yup
      .number()
      .required(validationWording.required('briCorpuSisaAnggaran')),
    briCorpu: yup.string().required(validationWording.required('briCorpu')),
    //campusMedan
    campusMedanBreakdownAnggaranBiayaSatuan: yup
      .number()
      .required(
        validationWording.required('campusMedanBreakdownAnggaranBiayaSatuan')
      ),
    campusMedanBreakdownAnggaranJumlah: yup
      .number()
      .required(
        validationWording.required('campusMedanBreakdownAnggaranJumlah')
      ),
    campusMedanBreakdownAnggaranTotalBiaya: yup
      .number()
      .required(
        validationWording.required('campusMedanBreakdownAnggaranTotalBiaya')
      ),
    campusMedanRealisasiAnggaranBiayaSatuan: yup
      .number()
      .required(
        validationWording.required('campusMedanRealisasiAnggaranBiayaSatuan')
      ),
    campusMedanRealisasiAnggaranJumlah: yup
      .number()
      .required(
        validationWording.required('campusMedanRealisasiAnggaranJumlah')
      ),
    campusMedanRealisasiAnggaranTotalBiaya: yup
      .number()
      .required(
        validationWording.required('campusMedanRealisasiAnggaranTotalBiaya')
      ),
    campusMedanSisaAnggaran: yup
      .number()
      .required(validationWording.required('campusMedanSisaAnggaran')),
    campusMedan: yup
      .string()
      .required(validationWording.required('campusMedan')),
    //padang
    campusPadangBreakdownAnggaranBiayaSatuan: yup
      .number()
      .required(
        validationWording.required('campusPadangBreakdownAnggaranBiayaSatuan')
      ),
    campusPadangBreakdownAnggaranJumlah: yup
      .number()
      .required(
        validationWording.required('campusPadangBreakdownAnggaranJumlah')
      ),
    campusPadangBreakdownAnggaranTotalBiaya: yup
      .number()
      .required(
        validationWording.required('campusPadangBreakdownAnggaranTotalBiaya')
      ),
    campusPadangRealisasiAnggaranBiayaSatuan: yup
      .number()
      .required(
        validationWording.required('campusPadangRealisasiAnggaranBiayaSatuan')
      ),
    campusPadangRealisasiAnggaranJumlah: yup
      .number()
      .required(
        validationWording.required('campusPadangRealisasiAnggaranJumlah')
      ),
    campusPadangRealisasiAnggaranTotalBiaya: yup
      .number()
      .required(
        validationWording.required('campusPadangRealisasiAnggaranTotalBiaya')
      ),
    campusPadangSisaAnggaran: yup
      .number()
      .required(validationWording.required('campusPadangSisaAnggaran')),
    campusPadang: yup
      .string()
      .required(validationWording.required('campusPadang')),
    //jakarta
    campusJakartaBreakdownAnggaranBiayaSatuan: yup
      .number()
      .required(
        validationWording.required('campusJakartaBreakdownAnggaranBiayaSatuan')
      ),
    campusJakartaBreakdownAnggaranJumlah: yup
      .number()
      .required(
        validationWording.required('campusJakartaBreakdownAnggaranJumlah')
      ),
    campusJakartaBreakdownAnggaranTotalBiaya: yup
      .number()
      .required(
        validationWording.required('campusJakartaBreakdownAnggaranTotalBiaya')
      ),
    campusJakartaRealisasiAnggaranBiayaSatuan: yup
      .number()
      .required(
        validationWording.required('campusJakartaRealisasiAnggaranBiayaSatuan')
      ),
    campusJakartaRealisasiAnggaranJumlah: yup
      .number()
      .required(
        validationWording.required('campusJakartaRealisasiAnggaranJumlah')
      ),
    campusJakartaRealisasiAnggaranTotalBiaya: yup
      .number()
      .required(
        validationWording.required('campusJakartaRealisasiAnggaranTotalBiaya')
      ),
    campusJakartaSisaAnggaran: yup
      .number()
      .required(validationWording.required('campusJakartaSisaAnggaran')),
    campusJakarta: yup
      .string()
      .required(validationWording.required('campusJakarta')),
    //bandung
    campusBandungBreakdownAnggaranBiayaSatuan: yup
      .number()
      .required(
        validationWording.required('campusBandungBreakdownAnggaranBiayaSatuan')
      ),
    campusBandungBreakdownAnggaranJumlah: yup
      .number()
      .required(
        validationWording.required('campusBandungBreakdownAnggaranJumlah')
      ),
    campusBandungBreakdownAnggaranTotalBiaya: yup
      .number()
      .required(
        validationWording.required('campusBandungBreakdownAnggaranTotalBiaya')
      ),
    campusBandungRealisasiAnggaranBiayaSatuan: yup
      .number()
      .required(
        validationWording.required('campusBandungRealisasiAnggaranBiayaSatuan')
      ),
    campusBandungRealisasiAnggaranJumlah: yup
      .number()
      .required(
        validationWording.required('campusBandungRealisasiAnggaranJumlah')
      ),
    campusBandungRealisasiAnggaranTotalBiaya: yup
      .number()
      .required(
        validationWording.required('campusBandungRealisasiAnggaranTotalBiaya')
      ),
    campusBandungSisaAnggaran: yup
      .number()
      .required(validationWording.required('campusBandungSisaAnggaran')),
    campusBandung: yup
      .string()
      .required(validationWording.required('campusBandung')),
    //yogyakarta
    campusYogyakartaBreakdownAnggaranBiayaSatuan: yup
      .number()
      .required(
        validationWording.required(
          'campusYogyakartaBreakdownAnggaranBiayaSatuan'
        )
      ),
    campusYogyakartaBreakdownAnggaranJumlah: yup
      .number()
      .required(
        validationWording.required('campusYogyakartaBreakdownAnggaranJumlah')
      ),
    campusYogyakartaBreakdownAnggaranTotalBiaya: yup
      .number()
      .required(
        validationWording.required(
          'campusYogyakartaBreakdownAnggaranTotalBiaya'
        )
      ),
    campusYogyakartaRealisasiAnggaranBiayaSatuan: yup
      .number()
      .required(
        validationWording.required(
          'campusYogyakartaRealisasiAnggaranBiayaSatuan'
        )
      ),
    campusYogyakartaRealisasiAnggaranJumlah: yup
      .number()
      .required(
        validationWording.required('campusYogyakartaRealisasiAnggaranJumlah')
      ),
    campusYogyakartaRealisasiAnggaranTotalBiaya: yup
      .number()
      .required(
        validationWording.required(
          'campusYogyakartaRealisasiAnggaranTotalBiaya'
        )
      ),
    campusYogyakartaSisaAnggaran: yup
      .number()
      .required(validationWording.required('campusYogyakartaSisaAnggaran')),
    campusYogyakarta: yup
      .string()
      .required(validationWording.required('campusYogyakarta')),
    //surabaya
    campusSurabayaBreakdownAnggaranBiayaSatuan: yup
      .number()
      .required(
        validationWording.required('campusSurabayaBreakdownAnggaranBiayaSatuan')
      ),
    campusSurabayaBreakdownAnggaranJumlah: yup
      .number()
      .required(
        validationWording.required('campusSurabayaBreakdownAnggaranJumlah')
      ),
    campusSurabayaBreakdownAnggaranTotalBiaya: yup
      .number()
      .required(
        validationWording.required('campusSurabayaBreakdownAnggaranTotalBiaya')
      ),
    campusSurabayaRealisasiAnggaranBiayaSatuan: yup
      .number()
      .required(
        validationWording.required('campusSurabayaRealisasiAnggaranBiayaSatuan')
      ),
    campusSurabayaRealisasiAnggaranJumlah: yup
      .number()
      .required(
        validationWording.required('campusSurabayaRealisasiAnggaranJumlah')
      ),
    campusSurabayaRealisasiAnggaranTotalBiaya: yup
      .number()
      .required(
        validationWording.required('campusSurabayaRealisasiAnggaranTotalBiaya')
      ),
    campusSurabayaSisaAnggaran: yup
      .number()
      .required(validationWording.required('campusSurabayaSisaAnggaran')),
    campusSurabaya: yup
      .string()
      .required(validationWording.required('campusSurabaya')),
    campusMakassarBreakdownAnggaranBiayaSatuan: yup
      .number()
      .required(
        validationWording.required('campusMakassarBreakdownAnggaranBiayaSatuan')
      ),
    //makassar
    campusMakassarBreakdownAnggaranJumlah: yup
      .number()
      .required(
        validationWording.required('campusMakassarBreakdownAnggaranJumlah')
      ),
    campusMakassarBreakdownAnggaranTotalBiaya: yup
      .number()
      .required(
        validationWording.required('campusMakassarBreakdownAnggaranTotalBiaya')
      ),
    campusMakassarRealisasiAnggaranBiayaSatuan: yup
      .number()
      .required(
        validationWording.required('campusMakassarRealisasiAnggaranBiayaSatuan')
      ),
    campusMakassarRealisasiAnggaranJumlah: yup
      .number()
      .required(
        validationWording.required('campusMakassarRealisasiAnggaranJumlah')
      ),
    campusMakassarRealisasiAnggaranTotalBiaya: yup
      .number()
      .required(
        validationWording.required('campusMakassarRealisasiAnggaranTotalBiaya')
      ),
    campusMakassarSisaAnggaran: yup
      .number()
      .required(validationWording.required('campusMakassarSisaAnggaran')),
    campusMakassar: yup
      .string()
      .required(validationWording.required('campusMakassar')),
    //total
    totalCampusBreakdownAnggaranBiayaSatuan: yup
      .number()
      .required(
        validationWording.required(' totalCampusBreakdownAnggaranBiayaSatuan')
      ),
    totalCampusBreakdownAnggaranJumlah: yup
      .number()
      .required(
        validationWording.required(' totalCampusBreakdownAnggaranJumlah')
      ),
    totalCampusBreakdownAnggaranTotalBiaya: yup
      .number()
      .required(
        validationWording.required(' totalCampusBreakdownAnggaranTotalBiaya')
      ),
    totalCampusRealisasiAnggaranBiayaSatuan: yup
      .number()
      .required(
        validationWording.required(' totalCampusRealisasiAnggaranBiayaSatuan')
      ),
    totalCampusRealisasiAnggaranJumlah: yup
      .number()
      .required(
        validationWording.required(' totalCampusRealisasiAnggaranJumlah')
      ),
    totalCampusRealisasiAnggaranTotalBiaya: yup
      .number()
      .required(
        validationWording.required(' totalCampusRealisasiAnggaranTotalBiaya')
      ),
    totalCampusSisaAnggaran: yup
      .number()
      .required(validationWording.required(' totalCampusSisaAnggaran')),
    totalCampus: yup
      .string()
      .required(validationWording.required(' totalCampus')),
  })
  .required();

export default { baseCreate, create };
