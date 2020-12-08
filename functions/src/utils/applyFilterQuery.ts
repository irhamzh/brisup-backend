import * as admin from 'firebase-admin';

interface filterParamAttributes {
  id: string;
  value: string;
}

type WhereFilterOp =
  | '<'
  | '<='
  | '=='
  | '!='
  | '>='
  | '>'
  | 'array-contains'
  | 'in'
  | 'array-contains-any'
  | 'not-in';

const WhereFilterOperator = [
  '<',
  '<=',
  '==',
  '!=',
  '>=',
  '>',
  'array-contains',
  'in',
  'array-contains-any',
  'not-in',
];

export default function applyFilterQuery(
  query: admin.firestore.Query,
  filtered: filterParamAttributes[] | []
) {
  if (!filtered || filtered?.length < 1) {
    return query;
  }
  for (const filterParam of filtered) {
    let { id, value } = filterParam;
    if (id.includes('$')) {
      const [operatorQuery, fieldQuery] = id.split('$');
      console.log(id, operatorQuery, fieldQuery);
      const optQuery: any = operatorQuery as WhereFilterOp;
      if (WhereFilterOperator.includes(optQuery)) {
        query = query.where(fieldQuery, optQuery, value);
      }
    } else {
      // query=query.startAt(name).endAt(name+'\uf8ff')
      query = query.where(id, '==', value);
      // query = query.where(id, '>=', value).where(id, '<=', value+ '\uf8ff')
    }
  }
  return query;
}
