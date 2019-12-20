import {
  LOAD_CREDITS_AND_DEBITS_LIST,
  LOAD_NEXT_PAGE,
  SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST,
} from '../CreditsAndDebitsListIntents';

const HttpCreditsAndDebitsListMapping = {
  [LOAD_CREDITS_AND_DEBITS_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/credits_and_debits/load_transaction_list`,
  },
  [SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/credits_and_debits/filter_transaction_list`,
  },
  [LOAD_NEXT_PAGE]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/credits_and_debits/filter_transaction_list`,
  },
};

export default HttpCreditsAndDebitsListMapping;
