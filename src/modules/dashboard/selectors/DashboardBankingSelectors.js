import { createSelector, createStructuredSelector } from 'reselect';

import { getBusinessId, getRegion } from './DashboardSelectors';
import Config from '../../../Config';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';
import getQueryFromParams from '../../../common/getQueryFromParams/getQueryFromParams';

export const getHasError = state => state.banking.hasError;

export const getIsLoading = state => state.banking.isLoading;

export const getBankFeedAccounts = state => state.banking.bankFeedAccounts;

export const getSelectedBankFeedAccount = state => state.banking.bankFeedAccountId;

export const getLastReconcileDate = state => state.banking.lastReconcileDate;

export const getBankBalanceDate = state => state.banking.bankBalanceDate;

export const getCurrentBalance = state => state.banking.currentBalance;

export const getBankFeedBalance = state => state.banking.bankFeedBalance;

export const getBankLatestClosingBalance = state => state.banking.bankLatestClosingBalance;

export const getIsBankFeedAvailable = state => !!state.banking.bankFeedAccounts.length;

export const getUnallocatedTransactionsTotal = state => state.banking.unallocatedTransactionsTotal;

export const getLoadBankingParams = state => (
  {
    bankFeedAccountId: state.banking.bankFeedAccountId,
    statementDate: formatIsoDate(new Date()),
  }
);

export const getBankingLink = createSelector(
  getBusinessId,
  getRegion,
  getSelectedBankFeedAccount,
  (businessId, region, bankAccount) => `/#/${region}/${businessId}/banking?bankAccount=${bankAccount}`,
);


export const getBankfeedAmount = createStructuredSelector({
  bankFeedBalance: getBankFeedBalance,
  isLoading: getIsLoading,
});


const getSerialNumber = state => state.serialNumber;

export const getAddBankFeedUrl = createSelector(
  getBusinessId, getSerialNumber,
  (businessId, serialNumber) => {
    const baseUrl = Config.MANAGE_BANK_FEEDS_BASE_URL;
    const queryParams = getQueryFromParams({
      SerialNumber: serialNumber,
      CdfId: businessId,
      Action: 'app',
    });
    return `${baseUrl}${queryParams}`;
  },

);
