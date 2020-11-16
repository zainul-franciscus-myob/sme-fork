import {
  LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE,
  RECODE,
  SORT_AND_FILTER_FIND_AND_RECODE_LIST,
} from '../FindAndRecodeIntents';

const HttpFindAndRecodeMapping = {
  [SORT_AND_FILTER_FIND_AND_RECODE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/find_and_recode/sort_and_filter`,
  },
  [LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/find_and_recode/sort_and_filter`,
  },
  [RECODE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/find_and_recode/recode`,
  },
};

export default HttpFindAndRecodeMapping;
