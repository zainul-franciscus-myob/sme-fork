import ReceiveMoneyIntents from '../../receiveMoney/ReceiveMoneyIntents';

const ReceiveMoneyMapping = {
  [ReceiveMoneyIntents.LOAD_NEW_RECEIVE_MONEY]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/receiveMoney/load_new_receive_money`,
  },
  [ReceiveMoneyIntents.LOAD_RECEIVE_MONEY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, receiveMoneyId }) => `/${businessId}/receiveMoney/load_receive_money_detail/${receiveMoneyId}`,
  },
  [ReceiveMoneyIntents.DELETE_RECEIVE_MONEY]: {
    method: 'DELETE',
    getPath: ({ businessId, receiveMoneyId }) => `/${businessId}/receiveMoney/delete_receive_money_detail/${receiveMoneyId}`,
  },
  [ReceiveMoneyIntents.CREATE_RECEIVE_MONEY]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/receiveMoney/create_receive_money`,
  },
  [ReceiveMoneyIntents.UPDATE_RECEIVE_MONEY]: {
    method: 'PUT',
    getPath: ({ businessId, receiveMoneyId }) => `/${businessId}/receiveMoney/update_receive_money_detail/${receiveMoneyId}`,
  },
  [ReceiveMoneyIntents.GET_CALCULATED_TOTALS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/receiveMoney/calculate_totals`,
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
};

export default ReceiveMoneyMapping;
