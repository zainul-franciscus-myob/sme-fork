import {
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_LINKED_ACCOUNTS,
  SAVE_LINKED_ACCOUNTS,
} from '../LinkedAccountsIntents';

const HttpLinkedAccountsMapping = {
  [LOAD_LINKED_ACCOUNTS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/linkedAccounts/load_linked_accounts`,
  },
  [SAVE_LINKED_ACCOUNTS]: {
    method: 'PUT',
    getPath: ({ businessId }) =>
      `/${businessId}/linkedAccounts/update_linked_accounts`,
  },
  [LOAD_ACCOUNT_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, accountId }) =>
      `/${businessId}/linkedAccounts/load_account/${accountId}`,
  },
};

export default HttpLinkedAccountsMapping;
