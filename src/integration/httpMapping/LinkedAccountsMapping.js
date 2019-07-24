import { LOAD_LINKED_ACCOUNTS, SAVE_LINKED_ACCOUNTS } from '../../linkedAccounts/LinkedAccountsIntents';

const LinkedAccountsMapping = {
  [LOAD_LINKED_ACCOUNTS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/linkedAccounts/load_linked_accounts`,
  },
  [SAVE_LINKED_ACCOUNTS]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/linkedAccounts/update_linked_accounts`,
  },
};

export default LinkedAccountsMapping;
