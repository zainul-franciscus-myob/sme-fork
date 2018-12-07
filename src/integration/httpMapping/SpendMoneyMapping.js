import SpendMoneyIntents from '../../spendMoney/SpendMoneyIntents';

const SpendMoneyMapping = {
  [SpendMoneyIntents.LOAD_NEW_SPEND_MONEY]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/spendMoney/load_new_spend_money`,
  },
  [SpendMoneyIntents.CREATE_SPEND_MONEY]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/spendMoney/create_spend_money`,
  },
  [SpendMoneyIntents.LOAD_REFERENCE_ID]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/spendMoney/get_reference_id`,
  },
  [SpendMoneyIntents.GET_CALCULATED_TOTALS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/spendMoney/calculate_totals`,
  },
};

export default SpendMoneyMapping;
