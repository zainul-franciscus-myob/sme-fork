import { createSelector } from 'reselect/lib/index';
import dateFormat from 'dateformat';

import { tabIds } from '../tabItems';

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getOrderBy = ({ orderBy }) => orderBy;

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getFlipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');

export const getAlert = ({ alert }) => alert;

export const getAppliedFilterOptions = ({ appliedFilterOptions }) => appliedFilterOptions;

export const getBankAccounts = state => state.bankAccounts;

export const getEntries = state => state.entries;

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;

export const getWithdrawalAccounts = state => state.withdrawalAccounts;
export const getDepositAccounts = state => state.depositAccounts;

export const formatAmount = amount => Intl
  .NumberFormat('en-AU', {
    style: 'decimal',
    minimumFractionDigits: '2',
    maximumFractionDigits: '2',
  })
  .format(amount);

export const getTableEntries = createSelector(
  getEntries,
  getWithdrawalAccounts,
  getDepositAccounts,
  (entries, withdrawalAccounts, depositAccounts) => entries.map(
    (entry) => {
      const accountList = entry.deposit ? depositAccounts : withdrawalAccounts;

      return ({
        ...entry,
        deposit: entry.deposit && formatAmount(entry.deposit),
        withdrawal: entry.withdrawal && formatAmount(entry.withdrawal),
        displayDate: dateFormat(entry.date, 'dd/mm/yyyy'),
        accountList,
        isLineDisabled: entry.isLoading,
      });
    },
  ),
);

export const isTransactionTypeApproved = state => state.filterOptions.transactionType === 'Approved';

export const getShouldDisplayDateRange = state => isTransactionTypeApproved(state);

export const getFilterOptions = (state) => {
  const { filterOptions } = state;
  const { dateTo, dateFrom, ...noDateFilterOptions } = filterOptions;
  return isTransactionTypeApproved(state) ? filterOptions : noDateFilterOptions;
};

export const getIsTableEmpty = ({ entries }) => entries.length === 0;

export const getIsTableLoading = state => state.isTableLoading;

export const getIsLoading = state => state.isLoading;

export const getTransactionTypes = state => state.transactionTypes.map(
  transactionType => ({
    label: transactionType.name,
    value: transactionType.value,
  }),
);

export const getBalances = state => state.balances;

export const getAllocationPayload = (index, selectedAccount, state) => {
  const entries = getEntries(state);
  const entry = entries[index];

  const { bankAccount: bankAccountId } = getFilterOptions(state);

  const {
    id: accountId,
    taxCodeId,
  } = selectedAccount;

  return {
    bankAccountId,
    transactionId: entry.transactionId,
    deposit: entry.deposit,
    withdrawal: entry.withdrawal,
    date: entry.date,
    accountId,
    taxCodeId,
  };
};

export const getUnallocationPayload = (index, state) => {
  const entries = getEntries(state);
  const entry = entries[index];

  const { bankAccount: bankAccountId } = getFilterOptions(state);

  return {
    bankAccountId,
    transactionId: entry.transactionId,
    journalLineId: entry.journalLineId,
  };
};

export const getModalType = state => state.modalType;

export const getContacts = state => state.contacts;

export const getOpenPosition = state => state.openPosition;

export const getIsOpenEntryLoading = state => state.isOpenEntryLoading;

export const getIsOpenEntryEdited = state => state.openEntry.isEdited;

export const getOpenEntryActiveTabId = state => state.openEntry.activeTabId;

export const getDefaultOpenPosition = () => -1;

export const getOpenEntryDefaultTabId = ({ type }) => {
  if (type === 'matched') {
    return undefined;
  }

  return tabIds.allocate;
};

export const getBankTransactionLineByIndex = (state, index) => {
  const entries = getEntries(state);
  return entries[index];
};

export const getIsAllocated = ({ type, journalId }) => (
  !!((type === 'singleAllocation' || type === 'splitAllocation') && journalId)
);
