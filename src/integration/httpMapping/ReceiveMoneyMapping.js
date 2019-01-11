import ReceiveMoneyIntents from '../../receiveMoney/ReceiveMoneyIntents';

const ReceiveMoneyMapping = {
  [ReceiveMoneyIntents.LOAD_RECEIVE_MONEY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, receiveMoneyId }) => `/${businessId}/receiveMoney/load_receive_money_detail/${receiveMoneyId}`,
  },
  [ReceiveMoneyIntents.LOAD_RECEIVE_MONEY_ENTRIES]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/receiveMoney/load_receive_money_entries`,
  },
  [ReceiveMoneyIntents.FILTER_RECEIVE_MONEY_ENTRIES]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/receiveMoney/filter_receive_money_entries`,
  },
  [ReceiveMoneyIntents.SORT_RECEIVE_MONEY_ENTRIES]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/receiveMoney/filter_receive_money_entries`,
  },
  [ReceiveMoneyIntents.DELETE_RECEIVE_MONEY]: {
    method: 'DELETE',
    getPath: ({ businessId, receiveMoneyId }) => `/${businessId}/receiveMoney/delete_receive_money_detail/${receiveMoneyId}`,
  },
};

export default ReceiveMoneyMapping;
