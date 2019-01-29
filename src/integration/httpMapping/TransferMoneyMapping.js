import TransferMoneyIntents from '../../transferMoney/TransferMoneyIntents';

const ReceiveMoneyMapping = {
  [TransferMoneyIntents.LOAD_NEW_TRANSFER_MONEY]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/transferMoney/load_new_transfer_money`,
  },
  [TransferMoneyIntents.CREATE_TRANSFER_MONEY]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/transferMoney/create_transfer_money`,
  },
  [TransferMoneyIntents.LOAD_TRANSFER_MONEY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, transferMoneyId }) => `/${businessId}/transferMoney/load_transfer_money_detail/${transferMoneyId}`,
  },
  [TransferMoneyIntents.DELETE_TRANSFER_MONEY]: {
    method: 'DELETE',
    getPath: ({ businessId, transferMoneyId }) => `/${businessId}/transferMoney/delete_transfer_money/${transferMoneyId}`,
  },
};

export default ReceiveMoneyMapping;
