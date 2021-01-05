import * as admin from 'firebase-admin';

import { sortParamAttributes } from '@interfaces/BaseInterface';

export default function applySortQuery(
  query: admin.firestore.Query,
  sorted: sortParamAttributes[]
) {
  if (!sorted || !sorted[0].id) {
    return query.orderBy('createdAt', 'desc');
  }
  const { id, desc = true } = sorted[0];
  const sortType = desc === true ? 'desc' : 'asc';
  return query.orderBy(id, sortType);
}
