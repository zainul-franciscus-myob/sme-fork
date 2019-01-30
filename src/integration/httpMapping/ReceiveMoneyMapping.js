import {
  CREATE_RECEIVE_MONEY,
  DELETE_RECEIVE_MONEY,
  GET_CALCULATED_TOTALS,
  LOAD_NEW_RECEIVE_MONEY,
  LOAD_RECEIVE_MONEY_DETAIL,
  UPDATE_RECEIVE_MONEY,
} from '../../receiveMoney/ReceiveMoneyIntents';

const ReceiveMoneyMapping = {
  [LOAD_NEW_RECEIVE_MONEY]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/receiveMoney/load_new_receive_money`,
  },
  [LOAD_RECEIVE_MONEY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, receiveMoneyId }) => `/${businessId}/receiveMoney/load_receive_money_detail/${receiveMoneyId}`,
  },
  [DELETE_RECEIVE_MONEY]: {
    method: 'DELETE',
    getPath: ({ businessId, receiveMoneyId }) => `/${businessId}/receiveMoney/delete_receive_money_detail/${receiveMoneyId}`,
  },
  [CREATE_RECEIVE_MONEY]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/receiveMoney/create_receive_money`,
  },
  [UPDATE_RECEIVE_MONEY]: {
    method: 'PUT',
    getPath: ({ businessId, receiveMoneyId }) => `/${businessId}/receiveMoney/update_receive_money_detail/${receiveMoneyId}`,
  },
  [GET_CALCULATED_TOTALS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/receiveMoney/calculate_totals`,
  },
};

export default ReceiveMoneyMapping;
