import * as admin from 'firebase-admin';
import {
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  startOfDay,
  endOfDay,
} from 'date-fns';

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
  | 'not-in'
  | 'pref' //preffix
  | 'betweenDate'
  | 'month-year'
  | 'year'
  | 'atDate'
  | 'beforeDate'
  | 'afterDate';

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
      const optQuery: any = operatorQuery as WhereFilterOp;
      if (optQuery === 'month-year') {
        const startDay = startOfMonth(new Date(value));
        const endDay = endOfMonth(new Date(value));
        query = query
          .where(fieldQuery, '>=', startDay)
          .where(fieldQuery, '<=', endDay);
      } else if (optQuery === 'year') {
        const startDay = startOfYear(new Date(value));
        const endDay = endOfYear(new Date(value));
        query = query
          .where(fieldQuery, '>=', startDay)
          .where(fieldQuery, '<=', endDay);
      } else if (optQuery === 'atDate') {
        const startDay = startOfDay(new Date(value));
        const endDay = endOfDay(new Date(value));
        query = query
          .where(fieldQuery, '>=', startDay)
          .where(fieldQuery, '<=', endDay);
      } else if (optQuery === 'beforeDate') {
        const endDay = endOfDay(new Date(value));
        query = query.where(fieldQuery, '<=', endDay);
      } else if (optQuery === 'afterDate') {
        const startDay = startOfDay(new Date(value));
        query = query.where(fieldQuery, '>=', startDay);
      } else if (optQuery === 'betweenDate') {
        const dateParam = JSON.parse(value.replace(/'/g, '"'));
        const startDay = startOfDay(new Date(dateParam[0]));
        const endDay = endOfDay(new Date(dateParam[1]));
        query = query
          .where(fieldQuery, '>=', startDay)
          .where(fieldQuery, '<=', endDay);
      } else if (optQuery === 'pref') {
        query = query
          .where(fieldQuery, '>=', value)
          .where(fieldQuery, '<=', value + '\uf8ff')
          .orderBy(fieldQuery);
        // query = query
        //   .orderBy(fieldQuery)
        //   .startAt(value)
        //   .endAt(value + '\uf8ff');
      } else if (WhereFilterOperator.includes(optQuery)) {
        query = query.where(fieldQuery, optQuery, value);
      }
    } else {
      query = query.where(id, '==', value);
    }
  }
  return query;
}
