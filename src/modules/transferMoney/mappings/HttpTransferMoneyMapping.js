import {
  CREATE_TRANSFER_MONEY,
  DELETE_TRANSFER_MONEY,
  LOAD_NEW_DUPLICATE_TRANSFER_MONEY,
  LOAD_NEW_TRANSFER_MONEY,
  LOAD_TRANSFER_MONEY_DETAIL,
} from '../TransferMoneyIntents';

const HttpTransferMoneyMapping = {
  [LOAD_NEW_TRANSFER_MONEY]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/transferMoney/load_new_transfer_money`,
  },
  [LOAD_NEW_DUPLICATE_TRANSFER_MONEY]: {
    method: 'GET',
    getPath: ({ businessId, duplicateTransferMoneyId }) => `/${businessId}/transferMoney/load_new_duplicate_transfer_money/${duplicateTransferMoneyId}`,
  },
  [CREATE_TRANSFER_MONEY]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/transferMoney/create_transfer_money`,
  },
  [LOAD_TRANSFER_MONEY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, transferMoneyId }) => `/${businessId}/transferMoney/load_transfer_money_detail/${transferMoneyId}`,
  },
  [DELETE_TRANSFER_MONEY]: {
    method: 'DELETE',
    getPath: ({ businessId, transferMoneyId }) => `/${businessId}/transferMoney/delete_transfer_money/${transferMoneyId}`,
  },
};

export default HttpTransferMoneyMapping;
