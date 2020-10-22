import {
  CREATE_RECEIVE_MONEY,
  DELETE_RECEIVE_MONEY,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_CONTACT_OPTIONS,
  LOAD_DUPLICATE_RECEIVE_MONEY,
  LOAD_NEW_RECEIVE_MONEY,
  LOAD_RECEIVE_MONEY_DETAIL,
  SEARCH_CONTACT,
  UPDATE_RECEIVE_MONEY,
} from '../ReceiveMoneyIntents';

const HttpReceiveMoneyMapping = {
  [LOAD_NEW_RECEIVE_MONEY]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/receiveMoney/load_new_receive_money`,
  },
  [LOAD_RECEIVE_MONEY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, receiveMoneyId }) =>
      `/${businessId}/receiveMoney/load_receive_money_detail/${receiveMoneyId}`,
  },
  [DELETE_RECEIVE_MONEY]: {
    method: 'DELETE',
    getPath: ({ businessId, receiveMoneyId }) =>
      `/${businessId}/receiveMoney/delete_receive_money_detail/${receiveMoneyId}`,
  },
  [CREATE_RECEIVE_MONEY]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/receiveMoney/create_receive_money`,
  },
  [UPDATE_RECEIVE_MONEY]: {
    method: 'PUT',
    getPath: ({ businessId, receiveMoneyId }) =>
      `/${businessId}/receiveMoney/update_receive_money_detail/${receiveMoneyId}`,
  },
  [LOAD_ACCOUNT_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, accountId }) =>
      `/${businessId}/receiveMoney/load_account/${accountId}`,
  },
  [LOAD_CONTACT_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, contactId }) =>
      `/${businessId}/receiveMoney/load_contact/${contactId}`,
  },
  [LOAD_CONTACT_OPTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/receiveMoney/load_contacts`,
  },
  [SEARCH_CONTACT]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/receiveMoney/load_contacts`,
  },
  [LOAD_DUPLICATE_RECEIVE_MONEY]: {
    method: 'GET',
    getPath: ({ businessId, duplicateId }) =>
      `/${businessId}/receiveMoney/load_duplicate_receive_money_detail/${duplicateId}`,
  },
};

export default HttpReceiveMoneyMapping;
