import SpendMoneyIntents from '../../spendMoney/SpendMoneyIntents';

const SpendMoneyMapping = {
  [SpendMoneyIntents.LOAD_NEW_SPEND_MONEY]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/spendMoney/load_new_spend_money`,
  },
};

export default SpendMoneyMapping;
