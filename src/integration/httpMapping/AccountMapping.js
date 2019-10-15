import {
  SORT_AND_FILTER_ACCOUNT_LIST,
} from '../../account/AccountListIntents';

const AccountMapping = {
  [SORT_AND_FILTER_ACCOUNT_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/account/filter_account_list`,
  },
};

export default AccountMapping;
