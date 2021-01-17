import {
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  startOfDay,
  endOfDay,
} from 'date-fns';

import { filterParamAttributes } from '@interfaces/BaseInterface';

export default function applyFilterElasticSearch(
  filtered: filterParamAttributes[]
) {
  const defaultReturn = {
    bool: {
      must: [],
    },
  };
  if (!filtered || filtered?.length < 1 || !filtered[0]?.id) {
    return defaultReturn;
  }

  const filterBody: any[] = [];
  for (const filterParam of filtered) {
    let { id, value } = filterParam;
    if (id.includes('$')) {
      const [operatorQuery, fieldQuery] = id.split('$');
      if (operatorQuery.toLocaleLowerCase() === 'in') {
        const fieldName = fieldQuery + '.keyword';
        filterBody.push({
          terms: {
            [fieldName]: value,
          },
        });
      } else if (operatorQuery === 'month-year') {
        const startDay = startOfMonth(new Date(value));
        const endDay = endOfMonth(new Date(value));
        filterBody.push({
          range: {
            [fieldQuery]: { gte: startDay, lte: endDay },
          },
        });
      } else if (operatorQuery === 'year') {
        const startDay = startOfYear(new Date(value));
        const endDay = endOfYear(new Date(value));
        filterBody.push({
          range: {
            [fieldQuery]: { gte: startDay, lte: endDay },
          },
        });
      } else if (operatorQuery === 'atDate') {
        const startDay = startOfDay(new Date(value));
        const endDay = endOfDay(new Date(value));
        filterBody.push({
          range: {
            [fieldQuery]: { gte: startDay, lte: endDay },
          },
        });
      } else if (operatorQuery === 'beforeDate') {
        const endDay = endOfDay(new Date(value));
        filterBody.push({
          range: {
            [fieldQuery]: { lt: endDay },
          },
        });
      } else if (operatorQuery === 'afterDate') {
        const startDay = startOfDay(new Date(value));
        filterBody.push({
          range: {
            [fieldQuery]: { gt: startDay },
          },
        });
      } else if (operatorQuery === 'betweenDate') {
        const startDay = startOfDay(new Date(value[0]));
        const endDay = endOfDay(new Date(value[1]));
        filterBody.push({
          range: {
            [fieldQuery]: { gte: startDay, lte: endDay },
          },
        });
      } else {
        filterBody.push({
          [operatorQuery]: {
            [fieldQuery]: value,
          },
        });
      }
    } else {
      filterBody.push({
        wildcard: {
          [id]: `*${value}*`,
        },
      });
    }
  }
  const queryParam = {
    bool: {
      must: filterBody,
    },
  };
  return queryParam || defaultReturn;
}
