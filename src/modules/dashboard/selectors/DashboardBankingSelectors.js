import { createSelector, createStructuredSelector } from 'reselect';

import {
  getBusinessId,
  getLast12MonthsDateRange,
  getRegion,
} from './DashboardSelectors';
import TransactionTypes from '../../banking/types/TransactionTypes';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

export const getHasError = (state) => state.banking.hasError;

export const getIsLoading = (state) => state.banking.isLoading;

export const getBankFeedAccounts = (state) => state.banking.bankFeedAccounts;

export const getSelectedBankFeedAccount = (state) =>
  state.banking.bankFeedAccountId;

export const getLastReconcileDate = (state) =>
  state.banking.lastReconcileDate || 'Never reconciled';

export const getBankBalanceDate = (state) => state.banking.bankBalanceDate;

export const getCurrentBalance = (state) => state.banking.currentBalance;

export const getBankFeedBalance = (state) => state.banking.bankFeedBalance;

export const getBankLatestClosingBalance = (state) =>
  state.banking.bankLatestClosingBalance;

export const getIsBankFeedAvailable = (state) =>
  !!state.banking.bankFeedAccounts.length;

export const getUnallocatedTransactionsTotal = (state) =>
  state.banking.unallocatedTransactionsTotal;

export const getBalanceDateText = createSelector(
  getBankBalanceDate,
  (balanceDate) =>
    balanceDate.length > 0
      ? `Closing account balance as of ${balanceDate}`
      : "Your bank hasn't provided a statement date."
);

export const getLoadBankingParams = createSelector(
  getSelectedBankFeedAccount,
  getLast12MonthsDateRange,
  (bankFeedAccountId, { dateFrom, dateTo }) => ({
    bankFeedAccountId,
    statementDate: formatIsoDate(new Date()),
    dateFrom,
    dateTo,
  })
);

export const getBankingLink = createSelector(
  getBusinessId,
  getRegion,
  getSelectedBankFeedAccount,
  getLast12MonthsDateRange,
  (businessId, region, bankAccount, { dateFrom, dateTo }) =>
    `/#/${region}/${businessId}/banking?bankAccount=${bankAccount}&transactionType=${TransactionTypes.UNALLOCATED}&dateFrom=${dateFrom}&dateTo=${dateTo}`
);

export const getBankfeedAmount = createStructuredSelector({
  bankFeedBalance: getBankFeedBalance,
  isLoading: getIsLoading,
});

export const getAddBankFeedUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => {
    return `/#/${region}/${businessId}/bankFeeds/create`;
  }
);
