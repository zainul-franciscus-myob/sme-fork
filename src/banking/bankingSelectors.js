import { createSelector } from 'reselect';
import dateFormat from 'dateformat';

export const getOrder = ({ sortOrder }) => ({
  column: 'date',
  descending: sortOrder === 'desc',
});

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getAlert = ({ alert }) => alert;

export const convertToUnixTime = date => new Date(date).getTime().toString();

export const getFilterOptions = ({ filterOptions }) => filterOptions;
export const getAppliedFilterOptions = ({ appliedFilterOptions }) => appliedFilterOptions;

export const getBankAccounts = state => state.bankAccounts;

export const getFormattedFilterOptions = createSelector(
  getFilterOptions,
  getBankAccounts,
  (filterOptions, bankAccounts) => {
    const selectedBankAccountIndex = bankAccounts.findIndex(
      ({ id }) => id === filterOptions.bankAccount,
    );
    return ({
      ...filterOptions,
      selectedBankAccountIndex,
      dateFrom: convertToUnixTime(filterOptions.dateFrom),
      dateTo: convertToUnixTime(filterOptions.dateTo),
    });
  },
);

export const getEntries = state => state.entries;

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;

const getWithdrawalAccounts = state => state.withdrawalAccounts;
const getDepositAccounts = state => state.depositAccounts;

const getEntryTransactionType = ({ allocatedTo, numberOfMatches }) => {
  if (allocatedTo) {
    return 'allocated';
  }

  if (numberOfMatches > 0) {
    return 'matched';
  }

  return 'unmatched';
};

const getMatchedDisplayText = ({ numberOfMatches }) => {
  if (numberOfMatches > 1) {
    return `${numberOfMatches} matches available`;
  }

  if (numberOfMatches > 0) {
    return `${numberOfMatches} match available`;
  }

  return '';
};

const getIsDepositEntry = entry => entry.deposit !== '';

const formatAmount = amount => Intl
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
      const transactionType = getEntryTransactionType(entry);
      const accountList = getIsDepositEntry(entry) ? depositAccounts : withdrawalAccounts;

      return ({
        ...entry,
        deposit: entry.deposit && formatAmount(entry.deposit),
        withdrawal: entry.withdrawal && formatAmount(entry.withdrawal),
        displayDate: dateFormat(entry.date, 'dd/mm/yyyy'),
        accountList,
        transactionType,
        matchedDisplayText: getMatchedDisplayText(entry),
      });
    },
  ),
);

export const getShouldDisplayDateRange = state => state.filterOptions.transactionType === 'Approved';

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
