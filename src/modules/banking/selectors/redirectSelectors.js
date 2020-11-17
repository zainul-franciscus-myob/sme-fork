import {
  getBalances,
  getBankAccount,
  getBusinessId,
  getIsAllBankAccountsSelected,
  getRegion,
} from './index';
import getQueryFromParams from '../../../common/getQueryFromParams/getQueryFromParams';

const getBaseUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}`;
};

// eslint-disable-next-line import/prefer-default-export
export const getBankReconciliationUrl = (state) => {
  const baseUrl = getBaseUrl(state);
  const balances = getBalances(state);
  const { bankBalanceDate = '', bankBalance = '' } = balances;

  const defaultParams = {
    bankBalanceDate,
    bankBalance,
  };

  const params = getIsAllBankAccountsSelected(state)
    ? defaultParams
    : {
        ...defaultParams,
        bankAccount: getBankAccount(state),
      };

  const urlParams = getQueryFromParams(params);
  return `${baseUrl}/bankReconciliation${urlParams}`;
};
