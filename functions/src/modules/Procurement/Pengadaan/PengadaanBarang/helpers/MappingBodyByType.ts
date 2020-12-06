import yupValidate from '@utils/yupValidate';
import schema from '../pengadaan_barang_jasa.schema';
import { TypePengadaan } from '../interface/pengadaan_barang_jasa.interface';

export function createMappingBodyByType(key: string, body: any) {
  let validatedBody = undefined;
  if (
    key.toLowerCase() === TypePengadaan['Penunjukan Langsung']?.toLowerCase()
  ) {
    validatedBody = yupValidate(schema.createPenunjukanLangsung, body);
  } else if (
    key.toLowerCase() === TypePengadaan['Pemilihan Langsung']?.toLowerCase()
  ) {
    validatedBody = yupValidate(schema.createPemilihanLangsung, body);
  } else {
    validatedBody = yupValidate(schema.createPembelianLansung, body);
  }
  return validatedBody;
}
export function updateMappingBodyByType(key: string, body: any) {
  let validatedBody = undefined;
  if (
    key.toLowerCase() === TypePengadaan['Penunjukan Langsung']?.toLowerCase()
  ) {
    validatedBody = yupValidate(schema.updatePenunjukanLangsung, body);
  } else if (
    key.toLowerCase() === TypePengadaan['Pemilihan Langsung']?.toLowerCase()
  ) {
    validatedBody = yupValidate(schema.updatePemilihanLangsung, body);
  } else {
    validatedBody = yupValidate(schema.updatePembelianLansung, body);
  }

  return validatedBody;
}
