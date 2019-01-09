import ReceiveMoneyIntents from '../../receiveMoney/ReceiveMoneyIntents';

const ReceiveMoneyMapping = {
  [ReceiveMoneyIntents.LOAD_RECEIVE_MONEY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, receiveMoneyId }) => `/${businessId}/receiveMoney/load_receive_money_detail/${receiveMoneyId}`,
  },
};

export default ReceiveMoneyMapping;
