import * as yup from 'yup';
import getAllEnumKey from '@utils/getAllEnumKeys';
import validationWording from '@constants/validationWording';
import { BaseCondition, YesNo } from '@interfaces/BaseInterface';
import { JenisPeralatan } from './interface/peralatan.interface';

const create = yup
  .object()
  .shape({
    jenisPeralatan: yup
      .mixed<keyof typeof JenisPeralatan>()
      .oneOf(
        getAllEnumKey(JenisPeralatan),
        validationWording.oneOf(
          'jenis peralatan',
          ...getAllEnumKey(JenisPeralatan)
        )
      )
      .required(validationWording.required('jenis peralatan')),
    merk: yup.string().required(validationWording.required('merk')),
    sn: yup.string().required(validationWording.required('sn')),
    ruangan: yup.string().required(validationWording.required('ruangan')),
    kondisi: yup
      .mixed<keyof typeof BaseCondition>()
      .oneOf(
        getAllEnumKey(BaseCondition),
        validationWording.oneOf('kondisi', ...getAllEnumKey(BaseCondition))
      )
      .required(validationWording.required('kondisi')),
    keterangan: yup.string().required(validationWording.required('keterangan')),
    model: yup.string().required(validationWording.required('model')),
  })
  .required();

const update = yup
  .object()
  .shape({
    // jenisPeralatan: yup
    //   .mixed<keyof typeof JenisPeralatan>()
    //   .oneOf(
    //     getAllEnumKey(JenisPeralatan),
    //     validationWording.oneOf(
    //       'jenis peralatan',
    //       ...getAllEnumKey(JenisPeralatan)
    //     )
    //   )
    //   .required(validationWording.required('jenis peralatan')),
    merk: yup.string(),
    sn: yup.string(),
    ruangan: yup.string(),
    kondisi: yup
      .mixed<keyof typeof BaseCondition>()
      .oneOf(
        getAllEnumKey(BaseCondition),
        validationWording.oneOf('kondisi', ...getAllEnumKey(BaseCondition))
      ),
    keterangan: yup.string(),
    model: yup.string(),
  })
  .required();

const createInfocus = yup
  .object()
  .shape({
    jenisPeralatan: yup
      .mixed<keyof typeof JenisPeralatan>()
      .oneOf(
        getAllEnumKey(JenisPeralatan),
        validationWording.oneOf(
          'jenis peralatan',
          ...getAllEnumKey(JenisPeralatan)
        )
      )
      .required(validationWording.required('jenis peralatan')),
    merk: yup.string().required(validationWording.required('merk')),
    sn: yup.string().required(validationWording.required('sn')),
    ruangan: yup.string().required(validationWording.required('ruangan')),
    kondisi: yup
      .mixed<keyof typeof BaseCondition>()
      .oneOf(
        getAllEnumKey(BaseCondition),
        validationWording.oneOf('kondisi', ...getAllEnumKey(BaseCondition))
      )
      .required(validationWording.required('kondisi')),
    keterangan: yup.string().required(validationWording.required('keterangan')),
    model: yup.string().required(validationWording.required('model')),
    tanggal: yup.date().required(validationWording.required('tanggal')),
    lampTimer: yup.string().required(validationWording.required('lamp Timer')),
    gantiLampu: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('Ganti Lampu', ...getAllEnumKey(YesNo))
      )
      .required(validationWording.required('Ganti Lampu')),
  })
  .required();

const updateInfocus = yup
  .object()
  .shape({
    // jenisPeralatan: yup
    //   .mixed<keyof typeof JenisPeralatan>()
    //   .oneOf(
    //     getAllEnumKey(JenisPeralatan),
    //     validationWording.oneOf(
    //       'jenis peralatan',
    //       ...getAllEnumKey(JenisPeralatan)
    //     )
    //   )
    //   .required(validationWording.required('jenis peralatan')),
    merk: yup.string(),
    sn: yup.string(),
    ruangan: yup.string(),
    kondisi: yup
      .mixed<keyof typeof BaseCondition>()
      .oneOf(
        getAllEnumKey(BaseCondition),
        validationWording.oneOf('kondisi', ...getAllEnumKey(BaseCondition))
      ),
    keterangan: yup.string(),
    model: yup.string(),
    tanggal: yup.date(),
    lampTimer: yup.string(),
    gantiLampu: yup
      .mixed<keyof typeof YesNo>()
      .oneOf(
        getAllEnumKey(YesNo),
        validationWording.oneOf('Ganti Lampu', ...getAllEnumKey(YesNo))
      ),
  })
  .required();

const createPc = yup
  .object()
  .shape({
    jenisPeralatan: yup
      .mixed<keyof typeof JenisPeralatan>()
      .oneOf(
        getAllEnumKey(JenisPeralatan),
        validationWording.oneOf(
          'jenis peralatan',
          ...getAllEnumKey(JenisPeralatan)
        )
      )
      .required(validationWording.required('jenis peralatan')),
    merk: yup.string().required(validationWording.required('merk')),
    sn: yup.string().required(validationWording.required('sn')),
    ruangan: yup.string().required(validationWording.required('ruangan')),
    kondisi: yup.string().required(validationWording.required('kondisi')),
    keterangan: yup.string().required(validationWording.required('keterangan')),
    namaPengguna: yup
      .string()
      .required(validationWording.required('namaPengguna')),
    jenisPc: yup.string().required(validationWording.required('jenisPc')),
    jumlahPc: yup.number().required(validationWording.required('jumlahPc')),
    snMonitor: yup.string().required(validationWording.required('snMonitor')),
    jumlahMonitor: yup
      .number()
      .required(validationWording.required('jumlahMonitor')),
  })
  .required();

const updatePc = yup
  .object()
  .shape({
    // jenisPeralatan: yup
    //   .mixed<keyof typeof JenisPeralatan>()
    //   .oneOf(
    //     getAllEnumKey(JenisPeralatan),
    //     validationWording.oneOf(
    //       'jenis peralatan',
    //       ...getAllEnumKey(JenisPeralatan)
    //     )
    //   )
    //   .required(validationWording.required('jenis peralatan')),
    merk: yup.string(),
    sn: yup.string(),
    ruangan: yup.string(),
    kondisi: yup
      .mixed<keyof typeof BaseCondition>()
      .oneOf(
        getAllEnumKey(BaseCondition),
        validationWording.oneOf('kondisi', ...getAllEnumKey(BaseCondition))
      ),
    keterangan: yup.string(),
    namaPengguna: yup.string(),
    jenisPc: yup.string(),
    jumlahPc: yup.number(),
    snMonitor: yup.string(),
    jumlahMonitor: yup.number(),
  })
  .required();

const checkJenisBarang = yup
  .object()
  .shape({
    jenisPeralatan: yup
      .mixed<keyof typeof JenisPeralatan>()
      .oneOf(
        getAllEnumKey(JenisPeralatan),
        validationWording.oneOf(
          'jenis peralatan',
          ...getAllEnumKey(JenisPeralatan)
        )
      )
      .required(validationWording.required('jenis peralatan')),
  })
  .required();

export default {
  create,
  update,
  createInfocus,
  updateInfocus,
  createPc,
  updatePc,
  checkJenisBarang,
};
