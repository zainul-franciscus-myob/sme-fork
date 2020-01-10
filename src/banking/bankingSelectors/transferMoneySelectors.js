import { addDays, subDays } from 'date-fns';
import { createSelector } from 'reselect';

import {
  getBankTransactionLineByIndex,
  getBusinessId,
  getDisplayName,
  getEntries,
  getFilterOptions,
  getIsOpenEntryCreating,
  getModalAlert,
  getTransferAccounts,
} from '.';
import { getIsModalBlocking } from '../../bill/billDetail/selectors/billSelectors';
import formatIsoDate from '../../common/valueFormatters/formatDate/formatIsoDate';
import formatSlashDate from '../../common/valueFormatters/formatDate/formatSlashDate';

const getTransfer = state => state.openEntry.transfer;

export const getIsWithdrawal = state => state.openEntry.transfer.isWithdrawal;
export const getIsTableLoading = state => state.openEntry.transfer.isTableLoading;
export const getMatchTransferMoneyEntries = state => state.openEntry.transfer.entries;
export const getMatchTransferMoneyOrderBy = state => state.openEntry.transfer.orderBy;
export const getMatchTransferMoneySortOrder = state => state.openEntry.transfer.sortOrder;
export const getTransferFrom = state => state.openEntry.transfer.transferFrom;
export const getTransferTo = state => state.openEntry.transfer.transferTo;
export const getAmount = state => state.openEntry.transfer.amount;
export const getDate = state => state.openEntry.transfer.date;
export const getDescription = state => state.openEntry.transfer.description;

export const getMatchTransferMoneyFlipSortOrder = state => (
  state.openEntry.transfer.sortOrder === 'desc' ? 'asc' : 'desc'
);

export const getOrder = createSelector(
  getMatchTransferMoneySortOrder,
  getMatchTransferMoneyOrderBy,
  (sortOrder, orderBy) => ({
    column: orderBy,
    descending: sortOrder === 'desc',
  }),
);

export const getIsTableEmpty = createSelector(
  getMatchTransferMoneyEntries,
  entries => entries.length === 0,
);

const getTransferDisplayType = createSelector(
  getIsOpenEntryCreating,
  getIsWithdrawal,
  (isCreating, isWithdrawal) => {
    if (isCreating) {
      return isWithdrawal ? 'transferTo' : 'transferFrom';
    }
    return 'readOnly';
  },
);

export const getTransferMoneyBody = createSelector(
  getTransferFrom, getTransferTo, getAmount, getTransferAccounts, getIsOpenEntryCreating,
  (
    transferFrom, transferTo, amount, accountList, isCreating,
  ) => ({
    transferFromDisplayName: getDisplayName(transferFrom, accountList),
    transferToDisplayName: getDisplayName(transferTo, accountList),
    amount,
    isCreating,
  }),
);
export const getTransferMoneyModal = createSelector(
  getDate, getTransferFrom, getTransferTo, getAmount, getDescription,
  getTransferDisplayType, getTransferAccounts, getModalAlert, getIsModalBlocking,
  (
    date, transferFrom, transferTo, amount, description,
    transferDisplayType, accountList, modalAlert, isModalBlocking,
  ) => ({
    transferFrom,
    transferTo,
    amount,
    description,
    transferDisplayType,
    transferFromDisplayName: getDisplayName(transferFrom, accountList),
    transferToDisplayName: getDisplayName(transferTo, accountList),
    formattedDate: formatSlashDate(new Date(date)),
    accountList,
    modalAlert,
    isModalBlocking,
  }),
);

export const getMatchTransferMoneyUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};

export const getMatchTransferMoneyQueryParams = (state, index) => {
  const line = getBankTransactionLineByIndex(state, index);
  const { transactionId: bankFeedTransactionId, date } = line;

  const transactionDate = new Date(date);
  const dateFrom = formatIsoDate(subDays(transactionDate, 5));
  const dateTo = formatIsoDate(addDays(transactionDate, 5));
  const sortOrder = getMatchTransferMoneySortOrder(state);
  const orderBy = getMatchTransferMoneyOrderBy(state);

  return {
    bankFeedTransactionId, dateFrom, dateTo, sortOrder, orderBy,
  };
};

export const getMatchTransferMoneyPayload = (state, index) => {
  const entries = getEntries(state);
  const openedEntry = entries[index];

  const {
    transactionId, date, deposit, withdrawal, description,
  } = openedEntry;

  const isWithdrawal = !!withdrawal;
  const { bankAccount: accountId } = getFilterOptions(state);
  const amount = withdrawal || deposit;

  const matches = getMatchTransferMoneyEntries(state);
  const {
    bankFeedTransactionId: matchTransactionId,
    accountId: matchAccountId,
  } = matches.find(({ selected }) => selected) || { bankFeedTransactionId: '', accountId: '' };

  return {
    isWithdrawal,
    baseTransactionId: transactionId,
    baseAccountId: accountId,
    transferTransactionId: matchTransactionId,
    transferAccountId: matchAccountId,
    date,
    amount,
    description,
  };
};

export const getCreateTransferMoneyPayload = (state, index) => {
  const entries = getEntries(state);
  const openedEntry = entries[index];

  const {
    transactionId, date, deposit, withdrawal,
  } = openedEntry;

  const isWithdrawal = !!withdrawal;
  const { bankAccount: accountId } = getFilterOptions(state);
  const amount = withdrawal || deposit;
  const { transferFrom, transferTo, description } = getTransfer(state);

  return {
    isWithdrawal,
    baseTransactionId: transactionId,
    baseAccountId: accountId,
    transferAccountId: isWithdrawal ? transferTo : transferFrom,
    date,
    amount,
    description,
  };
};
