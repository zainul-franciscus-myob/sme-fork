import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_MODAL,
  DELETE_ACCOUNT,
  DELETE_ACCOUNTS,
  LOAD_ACCOUNT_DETAIL,
  LOAD_NEW_ACCOUNT,
  LOAD_NEW_ACCOUNT_MODAL,
  SORT_AND_FILTER_ACCOUNT_LIST,
  UPDATE_ACCOUNT,
} from '../AccountIntents';

const HttpAccountMapping = {
  [SORT_AND_FILTER_ACCOUNT_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/account/filter_account_list`,
  },
  [LOAD_NEW_ACCOUNT]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/account/load_new_account_detail`,
  },
  [LOAD_ACCOUNT_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, accountId }) =>
      `/${businessId}/account/load_account_detail/${accountId}`,
  },
  [CREATE_ACCOUNT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/account/create_account`,
  },
  [UPDATE_ACCOUNT]: {
    method: 'PUT',
    getPath: ({ businessId, accountId }) =>
      `/${businessId}/account/update_account_detail/${accountId}`,
  },
  [DELETE_ACCOUNT]: {
    method: 'DELETE',
    getPath: ({ businessId, accountId }) =>
      `/${businessId}/account/delete_account/${accountId}`,
  },
  [LOAD_NEW_ACCOUNT_MODAL]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/account/load_quick_account_modal`,
  },
  [CREATE_ACCOUNT_MODAL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/account/create_account_modal`,
  },
  [DELETE_ACCOUNTS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/account/delete_accounts`,
  },
};

export default HttpAccountMapping;
