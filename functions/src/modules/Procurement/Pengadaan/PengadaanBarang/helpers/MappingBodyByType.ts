import yupValidate from '@utils/yupValidate';
import schema from '../pengadaan_barang_jasa.schema';
import { TypePengadaan } from '../interface/pengadaan_barang_jasa.interface';

export default function MappingBodyByType(
  key: string,
  body: any,
  action = 'create'
) {
  let validatedBody = undefined;
  if (action === 'create') {
    if (
      key.toLowerCase() === TypePengadaan['Penunjukan Langsung']?.toLowerCase()
    ) {
      validatedBody = yupValidate(schema.createPenunjukanLangsung, body);
    } else if (
      key.toLowerCase() === TypePengadaan['Pembelian Langsung']?.toLowerCase()
    ) {
      validatedBody = yupValidate(schema.createPembelianLansung, body);
    } else if (
      key.toLowerCase() === TypePengadaan['Pemilihan Langsung']?.toLowerCase()
    ) {
      validatedBody = yupValidate(schema.createPemilihanLangsung, body);
    }
  } else {
    if (
      key.toLowerCase() === TypePengadaan['Penunjukan Langsung']?.toLowerCase()
    ) {
      validatedBody = yupValidate(schema.updatePenunjukanLangsung, body);
    } else if (
      key.toLowerCase() === TypePengadaan['Pembelian Langsung']?.toLowerCase()
    ) {
      validatedBody = yupValidate(schema.updatePembelianLansung, body);
    } else if (
      key.toLowerCase() === TypePengadaan['Pemilihan Langsung']?.toLowerCase()
    ) {
      validatedBody = yupValidate(schema.updatePemilihanLangsung, body);
    }
  }
  return validatedBody;
}
