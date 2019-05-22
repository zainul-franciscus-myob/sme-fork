import { addDays, format } from 'date-fns';
import { createSelector } from 'reselect';

import { businessEventFeatures } from '../businessEventTypes';
import {
  formatAmount, getBusinessId, getEntries, getFilterOptions, getRegion,
} from './index';

export const getMatchTransactionFilterOptions = state => state.openEntry.match.filterOptions;

export const getMatchTransactionOrderBy = state => state.openEntry.match.orderBy;

export const getMatchTransactionSortOrder = state => state.openEntry.match.sortOrder;

export const getMatchTransactionFlipSortOrder = state => (
  state.openEntry.match.sortOrder === 'desc' ? 'asc' : 'desc'
);

export const getIsCreating = state => state.openEntry.match.isCreating;

export const getIsTableLoading = state => state.openEntry.match.isTableLoading;

export const getTotalAmount = state => state.openEntry.match.totalAmount;

export const getSelectedJournalLineId = state => state.openEntry.match.selectedJournalLineId;

export const getAllocatedJournalLineId = state => (
  state.openEntry.match.filterOptions.allocatedJournalLineId
);

export const getMatchTransactionEntries = state => state.openEntry.match.entries;

export const getIsTableEmpty = state => state.openEntry.match.entries.length === 0;

export const getOrder = createSelector(
  getMatchTransactionSortOrder,
  getMatchTransactionOrderBy,
  (sortOrder, orderBy) => ({
    column: orderBy,
    descending: sortOrder === 'desc',
  }),
);

const convertToDateString = date => format(date, 'YYYY-MM-DD');

export const getDefaultMatchTransactionFilterOptions = (accountId, line) => {
  const {
    date: dateString,
    withdrawal,
    deposit,
    journalLineId: allocatedJournalLineId,
  } = line;

  const date = new Date(dateString);
  const dateFrom = convertToDateString(addDays(date, -5));
  const dateTo = convertToDateString(addDays(date, 5));

  const amount = (withdrawal || deposit);
  const amountFrom = amount - 0.1;
  const amountTo = amount + 0.1;

  const isCredit = !!deposit;

  const options = {
    accountId,
    allocatedJournalLineId,
    isCredit,
    dateFrom,
    dateTo,
    amountFrom,
    amountTo,
  };

  return options;
};

const getEntryLink = (entry, businessId, region) => {
  const { journalLineId, sourceJournal } = entry;
  const feature = businessEventFeatures[sourceJournal];

  return `/#/${region}/${businessId}/${feature}/${journalLineId}`;
};

const getIsEntryDisabled = (entry, totalAmount) => entry.amount !== formatAmount(totalAmount);

export const getTableEntries = createSelector(
  getBusinessId,
  getRegion,
  getMatchTransactionEntries,
  getTotalAmount,
  getSelectedJournalLineId,
  (businessId, region, entries, totalAmount, selectedJournalLineId) => entries.map(entry => ({
    ...entry,
    link: getEntryLink(entry, businessId, region),
    disabled: getIsEntryDisabled(entry, totalAmount),
    selected: entry.journalLineId === selectedJournalLineId,
  })),
);

export const getMatchTransactionPayload = (state, index) => {
  const entries = getEntries(state);
  const openedEntry = entries[index];
  const { transactionId } = openedEntry;

  const { bankAccount: bankAccountId } = getFilterOptions(state);

  const journalLineId = getSelectedJournalLineId(state);

  const matchTransactions = getMatchTransactionEntries(state);
  const match = matchTransactions.find(line => line.journalLineId === journalLineId) || {};

  const { referenceId, journalId, sourceJournal } = match;

  return {
    bankAccountId,
    transactionId,
    referenceId,
    journalId,
    journalLineId,
    sourceJournal,
  };
};
