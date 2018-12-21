import SpendMoneyIntents from '../../spendMoney/SpendMoneyIntents';

const SpendMoneyMapping = {
  [SpendMoneyIntents.LOAD_NEW_SPEND_MONEY]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/spendMoney/load_new_spend_money`,
  },
  [SpendMoneyIntents.LOAD_SPEND_MONEY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, spendMoneyId }) => `/${businessId}/spendMoney/load_spend_money_detail/${spendMoneyId}`,
  },
  [SpendMoneyIntents.CREATE_SPEND_MONEY]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/spendMoney/create_spend_money`,
  },
  [SpendMoneyIntents.DELETE_SPEND_MONEY]: {
    method: 'DELETE',
    getPath: ({ businessId, spendMoneyId }) => `/${businessId}/spendMoney/delete_spend_money_detail/${spendMoneyId}`,
  },
  [SpendMoneyIntents.UPDATE_SPEND_MONEY]: {
    method: 'PUT',
    getPath: ({ businessId, spendMoneyId }) => `/${businessId}/spendMoney/update_spend_money_detail/${spendMoneyId}`,
  },
  [SpendMoneyIntents.LOAD_REFERENCE_ID]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/spendMoney/get_reference_id`,
  },
  [SpendMoneyIntents.GET_CALCULATED_TOTALS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/spendMoney/calculate_totals`,
  },
  [SpendMoneyIntents.LOAD_SPEND_MONEY_ENTRIES]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/spendMoney/load_spend_money_entries`,
  },
  [SpendMoneyIntents.FILTER_SPEND_MONEY_ENTRIES]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/spendMoney/filter_spend_money_entries`,
  },
  [SpendMoneyIntents.SORT_SPEND_MONEY_ENTRIES]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/spendMoney/filter_spend_money_entries`,
  },
};

export default SpendMoneyMapping;
