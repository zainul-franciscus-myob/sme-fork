import { createSelector } from 'reselect';
import dateFormat from 'dateformat';

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getOrderBy = ({ orderBy }) => orderBy;

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getFlipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');

export const getAlert = ({ alert }) => alert;


export const getFilterOptions = ({ filterOptions }) => filterOptions;
export const getAppliedFilterOptions = ({ appliedFilterOptions }) => appliedFilterOptions;

export const getBankAccounts = state => state.bankAccounts;

export const getEntries = state => state.entries;

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;

const getWithdrawalAccounts = state => state.withdrawalAccounts;
const getDepositAccounts = state => state.depositAccounts;

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
      const accountList = entry.deposit ? depositAccounts : withdrawalAccounts;

      return ({
        ...entry,
        deposit: entry.deposit && formatAmount(entry.deposit),
        withdrawal: entry.withdrawal && formatAmount(entry.withdrawal),
        displayDate: dateFormat(entry.date, 'dd/mm/yyyy'),
        accountList,
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
