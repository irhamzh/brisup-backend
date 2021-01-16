import { sortParamAttributes, StringKeys } from '@interfaces/BaseInterface';

export default function applySortElasticSearch(sorted: sortParamAttributes[]) {
  if (!sorted || sorted?.length < 1 || !sorted[0]?.id) {
    return [{ createdAt: 'desc' }];
  }

  const sortBody: StringKeys[] = [];
  for (const sortParam of sorted) {
    const { id, desc = true } = sortParam;
    if (id) {
      sortBody.push({ [id]: desc ? 'desc' : 'asc' });
    }
  }
  return sortBody || [{ createdAt: 'desc' }];
}
