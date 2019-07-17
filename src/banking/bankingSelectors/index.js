import { createSelector } from 'reselect';
import { format } from 'date-fns';

import { businessEventTypes } from '../businessEventTypes';
import { tabIds } from '../tabItems';

export const getOrderBy = ({ orderBy }) => orderBy;

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getOrder = createSelector(
  getSortOrder,
  getOrderBy,
  (sortOrder, orderBy) => ({
    column: orderBy,
    descending: sortOrder === 'desc',
  }),
);
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

export const formatCurrency = (amount) => {
  const formattedAmount = formatAmount(Math.abs(amount));

  return amount < 0 ? `-$${formattedAmount}` : `$${formattedAmount}`;
};

export const getBankTableData = createSelector(
  state => state.entries.length,
  len => Array(len).fill({}),
);

export const getBankEntryByIndexSelector = () => createSelector(
  (state, props) => state.entries[props.index],
  getWithdrawalAccounts,
  getDepositAccounts,
  (entry, withdrawalAccounts, depositAccounts) => {
    const accountList = entry.deposit ? depositAccounts : withdrawalAccounts;

    return ({
      ...entry,
      deposit: entry.deposit && formatAmount(entry.deposit),
      withdrawal: entry.withdrawal && formatAmount(entry.withdrawal),
      displayDate: format(entry.date, 'DD/MM/YYYY'),
      accountList,
      isLineDisabled: entry.isLoading,
    });
  },
);

const getIsTransactionTypeApproved = state => state.filterOptions.transactionType === 'Approved';

export const getShouldDisplayDateRange = state => getIsTransactionTypeApproved(state);

export const getFilterOptions = createSelector(
  state => state.filterOptions,
  getIsTransactionTypeApproved,
  (filterOptions, isTransactionTypeApproved) => {
    const { dateTo, dateFrom, ...noDateFilterOptions } = filterOptions;
    return isTransactionTypeApproved ? filterOptions : noDateFilterOptions;
  },
);

export const getIsTableEmpty = ({ entries }) => entries.length === 0;

export const getIsTableLoading = state => state.isTableLoading;

export const getIsLoading = state => state.isLoading;

export const getTransactionTypes = createSelector(
  state => state.transactionTypes,
  transactionTypes => transactionTypes.map(
    transactionType => ({
      label: transactionType.name,
      value: transactionType.value,
    }),
  ),
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

export const getIsOpenEntryCreating = state => state.openEntry.isCreating;

export const getIsOpenEntryEdited = state => state.openEntry.isEdited;

export const getOpenEntryActiveTabId = state => state.openEntry.activeTabId;

export const getDefaultOpenPosition = () => -1;

export const getIsEntryLoading = createSelector(
  getIsOpenEntryLoading,
  getEntries,
  (isOpenEntryLoading, entries) => (
    isOpenEntryLoading || entries.some(({ isLoading }) => isLoading)
  ),
);

export const getOpenEntryDefaultTabId = ({ type, sourceJournal }) => {
  if (
    type === 'unmatched'
    || sourceJournal === businessEventTypes.spendMoney
    || sourceJournal === businessEventTypes.receiveMoney
  ) {
    return tabIds.allocate;
  }

  if (
    sourceJournal === businessEventTypes.billPayment
    || sourceJournal === businessEventTypes.invoicePayment
  ) {
    return tabIds.payment;
  }

  if (sourceJournal === businessEventTypes.transferMoney) {
    return tabIds.transfer;
  }
  return tabIds.match;
};

export const getBankTransactionLineByIndex = (state, index) => {
  const entries = getEntries(state);
  return entries[index];
};

export const getIsAllocated = ({ type, journalId }) => (
  !!((type === 'singleAllocation'
    || type === 'splitAllocation'
    || type === 'payment'
    || type === 'transfer') && journalId)
);

export const getIsSplitAllocationSelected = (state) => (
  getOpenEntryActiveTabId(state) === tabIds.allocate;
);

export const getIsBalancesInvalid = ({ bankBalance, myobBalance, unallocated }) => (
  bankBalance === undefined || myobBalance === undefined || unallocated === undefined
);

const getCalculatedBalances = (state, amount) => {
  const balances = getBalances(state);
  if (getIsBalancesInvalid(balances)) {
    return balances;
  }

  const {
    bankBalance,
    myobBalance,
    unallocated,
  } = balances;

  return {
    bankBalance,
    myobBalance: myobBalance - amount,
    unallocated: unallocated + amount,
  };
};

export const getCalculatedAllocatedBalances = (state, index) => {
  const line = getBankTransactionLineByIndex(state, index);
  const { withdrawal, deposit } = line;
  const amount = (-withdrawal || deposit);

  return getCalculatedBalances(state, amount);
};

export const getBalancesForBulkResult = (state, resultEntries, isAllocate) => {
  const { entries } = state;
  const allocatedIds = resultEntries.map(allocatedEntry => allocatedEntry.transactionId);
  const amount = entries
    .filter(entry => allocatedIds.includes(entry.transactionId))
    .reduce((total, entry) => {
      const { withdrawal, deposit } = entry;
      const entryAmount = isAllocate ? (-withdrawal || deposit) : (withdrawal || -deposit);

      return total + entryAmount;
    }, 0);

  return getCalculatedBalances(state, amount);
};

export const getCalculatedUnallocatedBalances = (state, index) => {
  const line = getBankTransactionLineByIndex(state, index);
  const { withdrawal, deposit } = line;
  const amount = (withdrawal || -deposit);

  return getCalculatedBalances(state, amount);
};

export const getDisplayBalances = createSelector(
  getBalances,
  (balances) => {
    const {
      bankBalance,
      myobBalance,
      unallocated,
      bankBalanceDate,
    } = balances;

    const balanceTooltip = bankBalanceDate
      || 'Your bank hasn\'t provided a statement balance, so we can\'t show these amounts.';

    if (getIsBalancesInvalid(balances)) {
      return {
        bankBalance: '$--',
        myobBalance: '$--',
        unallocated: '$--',
        balanceTooltip,
      };
    }

    return {
      bankBalance: formatCurrency(bankBalance),
      myobBalance: formatCurrency(myobBalance),
      unallocated: formatCurrency(unallocated),
      balanceTooltip,
    };
  },
);

export const getOpenTransactionLine = createSelector(
  getEntries,
  getOpenPosition,
  (entries, openPosition) => entries[openPosition],
);

export const getTabItems = createSelector(
  getOpenTransactionLine,
  ({ sourceJournal = '', withdrawal }) => {
    const isAllocateDisabled = sourceJournal !== businessEventTypes.spendMoney
    && sourceJournal !== businessEventTypes.receiveMoney
    && sourceJournal !== '';

    const isPaymentDisabled = sourceJournal !== businessEventTypes.billPayment
    && sourceJournal !== businessEventTypes.invoicePayment
    && sourceJournal !== '';

    const isTransferDisabled = sourceJournal !== businessEventTypes.transferMoney
    && sourceJournal !== '';

    const isBillPayment = !!withdrawal;

    return [
      {
        id: tabIds.transfer,
        label: 'Transfer',
        isDisabled: isTransferDisabled,
        toolTip: isTransferDisabled && 'Unmatch this transaction before creating a new one',
      },
      {
        id: tabIds.payment,
        label: isBillPayment ? 'Bill payment' : 'Invoice payment',
        isDisabled: isPaymentDisabled,
        toolTip: isPaymentDisabled && 'Unmatch this transaction before creating a new one',
      },
      {
        id: tabIds.allocate,
        label: 'Allocate',
        isDisabled: isAllocateDisabled,
        toolTip: isAllocateDisabled && 'Unmatch this transaction before creating a new one',
      },
      {
        id: tabIds.match,
        label: 'Match transaction',
      },
    ];
  },
);
