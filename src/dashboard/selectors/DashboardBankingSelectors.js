import { createSelector } from 'reselect';

import { getBusinessId, getRegion } from './DashboardSelectors';
import formatIsoDate from '../../valueFormatters/formatDate/formatIsoDate';

export const getHasError = state => state.banking.hasError;

export const getIsLoading = state => state.banking.isLoading;

export const getBankFeedAccounts = state => state.banking.bankFeedAccounts;

export const getSelectedBankFeedAccount = state => state.banking.bankFeedAccountId;

export const getLastReconcileDate = state => state.banking.lastReconcileDate;

export const getBankBalanceDate = state => state.banking.bankBalanceDate;

export const getCurrentBalance = state => state.banking.currentBalance;

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
