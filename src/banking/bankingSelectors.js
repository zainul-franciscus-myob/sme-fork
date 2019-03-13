import { createSelector } from 'reselect';

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

export const getTableEntries = createSelector(
  getEntries,
  entries => entries.map(
    entry => ({
      ...entry,
      transactionType: getEntryTransactionType(entry),
      matchedDisplayText: getMatchedDisplayText(entry),
    }),
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
