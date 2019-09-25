import {
  LOAD_ACCOUNT_LIST,
  SORT_AND_FILTER_ACCOUNT_LIST,
} from '../../account/AccountListIntents';

const AccountMapping = {
  [LOAD_ACCOUNT_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/account/load_account_list`,
  },
  [SORT_AND_FILTER_ACCOUNT_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/account/filter_account_list`,
  },
};

export default AccountMapping;
