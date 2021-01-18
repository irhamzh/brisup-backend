import { sortParamAttributes, StringKeys } from '@interfaces/BaseInterface';

//tidak pakai keyword
const notKeyword = [
  'createdAt',
  'updateAt',
  'tanggal',
  'tanggalPengadaan',
  'masaBerlaku',
  'tanggalSPK',
  'sampai',
  'date',
  'tanggalPembukuan',
  'tanggalPelimpahan',
  'dateOfBird',
  'sampaiDengan',
  'berlakuDari',
  'expired',
  'expiredTabung',
  'tanggalRevisi',
  'tanggalKonfirmasi',
  'tanggalTerima',
  'tanggalAwal',
  'tanggalAkhir',
];
export default function applySortElasticSearch(sorted: sortParamAttributes[]) {
  if (!sorted || sorted?.length < 1 || !sorted[0]?.id) {
    return [{ createdAt: 'desc' }];
  }

  const sortBody: StringKeys[] = [];
  for (const sortParam of sorted) {
    const { id, desc = true } = sortParam;
    if (id) {
      let fieldName = id;
      if (!notKeyword.includes(id)) {
        fieldName = fieldName + '.keyword';
      }
      sortBody.push({ [fieldName]: desc ? 'desc' : 'asc' });
    }
  }
  return sortBody || [{ createdAt: 'desc' }];
}
