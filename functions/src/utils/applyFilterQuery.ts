import * as admin from 'firebase-admin';

interface filterParamAttributes {
  id: string;
  value: string;
}
export default function applyFilterQuery(
  query: admin.firestore.Query,
  filtered: filterParamAttributes[] | []
) {
  if (!filtered || filtered?.length < 1) {
    return query;
  }
  for (const filterParam of filtered) {
    let { id, value } = filterParam;
    // query=query.startAt(name).endAt(name+'\uf8ff')
    query = query.where(id, '==', value);
    // query = query.where(id, '>=', value).where(id, '<=', value+ '\uf8ff')
  }
  return query;
}
