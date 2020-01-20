import { addDays, subDays } from 'date-fns';
import { createSelector } from 'reselect';

import { businessEventFeatures } from '../businessEventTypes';
import {
  formatCurrency,
  getAppliedPaymentRuleContactId,
  getBusinessId,
  getDepositAccounts,
  getEntries,
  getFilterOptions,
  getOpenTransactionLine,
  getRegion,
  getWithdrawalAccounts,
} from './index';
import formatAmount from '../../common/valueFormatters/formatAmount';
import formatIsoDate from '../../common/valueFormatters/formatDate/formatIsoDate';

export const getMatchTransactionFilterOptions = state => state.openEntry.match.filterOptions;

export const getSelectedEntries = state => state.openEntry.match.selectedEntries;

export const getMatchTransactionOrderBy = state => state.openEntry.match.orderBy;

export const getMatchTransactionSortOrder = state => state.openEntry.match.sortOrder;

export const getMatchTransactionFlipSortOrder = state => (
  state.openEntry.match.sortOrder === 'desc' ? 'asc' : 'desc'
);

export const getIsTableLoading = state => state.openEntry.match.isTableLoading;

export const getTotalAmount = state => state.openEntry.match.totalAmount;

export const getMatchTransactionEntries = state => state.openEntry.match.entries;

export const getShowAdjustmentTable = state => state.openEntry.match.showAdjustmentTable;

export const getAdjustments = state => state.openEntry.match.adjustments;

export const getIsTableEmpty = state => state.openEntry.match.entries.length === 0;

export const getOrder = createSelector(
  getMatchTransactionSortOrder,
  getMatchTransactionOrderBy,
  (sortOrder, orderBy) => ({
    column: orderBy,
    descending: sortOrder === 'desc',
  }),
);

const getEntryLink = (entry, businessId, region) => {
  const { journalId, sourceJournal } = entry;
  const feature = businessEventFeatures[sourceJournal];

  return feature && `/#/${region}/${businessId}/${feature}/${journalId}`;
};

export const getIsAllowCustomAmount = entry => entry.type !== 'Transaction';

const getBalanceOwed = ({ totalAmount, discountAmount }) => (
  Number(totalAmount) - Number(discountAmount || 0)
);

const getOverAmount = (entry) => {
  if (!entry.matchAmount) return undefined;
  const overAmount = Number(entry.matchAmount) - getBalanceOwed(entry);
  return overAmount > 0 ? formatCurrency(overAmount) : undefined;
};

const getBadge = (entry) => {
  const {
    status, type, originalAmount, totalAmount,
  } = entry;
  if (['CloseInvoice', 'CloseBill'].includes(status)) {
    return {
      text: 'Closed',
      color: 'green',
    };
  }
  if (['Purchase', 'Sale'].includes(type) && originalAmount !== totalAmount) {
    return {
      text: `Total: ${formatCurrency(originalAmount)}`,
    };
  }
  return {};
};

export const getPrefilledEntries = (state, entries) => {
  const selectedEntries = getSelectedEntries(state);
  return entries.map((entry) => {
    const cachedState = selectedEntries[`${entry.journalId}-${entry.journalLineId}`];
    return cachedState || entry;
  });
};

export const getTableEntries = createSelector(
  getBusinessId,
  getRegion,
  getMatchTransactionEntries,
  (businessId, region, entries) => {
    const tableEntries = entries.map((entry) => {
      const {
        selected, totalAmount = '', matchAmount = '', discountAmount = '',
      } = entry;
      const allowCustomAmount = getIsAllowCustomAmount(entry);
      return ({
        ...entry,
        allowCustomAmount,
        discountAmount,
        matchAmount: (selected && !allowCustomAmount) ? totalAmount : matchAmount,
        link: getEntryLink(entry, businessId, region),
        displayTotalAmount: formatAmount(entry.totalAmount),
        balanceOwed: allowCustomAmount ? formatAmount(getBalanceOwed(entry)) : '',
        overAmount: getOverAmount(entry),
        badge: getBadge(entry),
      });
    });

    return tableEntries;
  },
);

export const getShowType = createSelector(
  getMatchTransactionFilterOptions,
  filterOptions => filterOptions.showType,
);

export const getSelectAllState = createSelector(
  getTableEntries,
  entries => entries.every(({ selected }) => selected),
);

const getSelectedCount = createSelector(
  getTableEntries,
  entries => entries.filter(({ selected }) => selected).length,
);

export const getSelectedText = createSelector(
  getSelectedCount,
  count => (count > 0 ? `${count} transactions selected` : 'No transaction selected'),
);

export const getAccounts = createSelector(
  getOpenTransactionLine,
  getWithdrawalAccounts,
  getDepositAccounts,
  (bankTransaction, withdrawalAccounts, depositAccounts) => (
    bankTransaction.withdrawal ? withdrawalAccounts : depositAccounts
  ),
);

export const getMatchTransactionPayload = (state, index) => {
  const entries = getEntries(state);
  const openedEntry = entries[index];
  const {
    transactionId: bankTransactionId,
    description: originalBankFeedDescription,
    note: newBankFeedDescription,
    date,
  } = openedEntry;

  const { bankAccount: bankFeedAccountId } = getFilterOptions(state);
  const bankFeedDescription = newBankFeedDescription || originalBankFeedDescription;

  const matchTransactions = getTableEntries(state);

  const adjustments = getAdjustments(state).map(({
    amount, description, accountId, taxCodeId, quantity,
  }) => ({
    amount,
    description,
    accountId,
    taxCodeId,
    quantity,
  }));

  const selectedTransactions = matchTransactions.filter(({ selected }) => Boolean(selected));

  const payload = {
    bankTransactionId,
    bankFeedAccountId,
    bankFeedDescription,
    adjustments,
    date,
    isCredit: Boolean(openedEntry.deposit) || undefined,
    payments: [],
    allocations: [],
  };

  return selectedTransactions.reduce((next, entry) => {
    const {
      type,
      journalId,
      journalLineId,
      totalAmount,
      sourceJournal,
      referenceId,
      contactId,
      matchAmount,
      discountAmount,
    } = entry;
    const { allocations, payments } = next;
    if (type === 'Transaction') {
      return {
        ...next,
        allocations: [
          ...allocations,
          {
            journalId,
            referenceId,
            journalLineId,
            totalAmount,
            sourceJournal,
          },
        ],
      };
    }
    return {
      ...next,
      payments: [
        ...payments,
        {
          id: journalId,
          contactId,
          matchAmount,
          discountAmount,
          referenceId,
        },
      ],
    };
  }, payload);
};

export const getUnmatchTransactionPayload = createSelector(
  getTableEntries,
  getOpenTransactionLine,
  getFilterOptions,
  (journalTransactions, bankTransaction, bankTransactionFilterOptions) => {
    const { transactionId } = bankTransaction;
    const { bankAccount: bankAccountId } = bankTransactionFilterOptions;
    const entries = journalTransactions.filter(({ isMatched }) => isMatched)
      .map(({ journalLineId }) => (
        {
          transactionId,
          journalLineId,
        }
      ));
    return {
      bankAccountId,
      entries,
    };
  },
);

export const getTotals = createSelector(
  getOpenTransactionLine,
  getTableEntries,
  getAdjustments,
  (bankTransaction, entries, adjustments) => {
    const bankTransactionAmount = bankTransaction.withdrawal || bankTransaction.deposit;
    const matchAmountTotal = entries.filter(({ selected }) => selected)
      .reduce((total, entry) => total + Number(entry.matchAmount), 0);
    const adjustmentsTotal = adjustments
      .reduce((total, entry) => total + Number(entry.amount || 0), 0);
    const outOfBalance = Number((bankTransactionAmount - matchAmountTotal - adjustmentsTotal)
      .toFixed(2));
    return {
      matchAmountTotal: formatCurrency(matchAmountTotal),
      adjustmentsTotal: formatCurrency(adjustmentsTotal),
      subtotal: formatCurrency(matchAmountTotal + adjustmentsTotal),
      outOfBalance: formatCurrency(outOfBalance),
      isOutOfBalance: outOfBalance !== 0,
    };
  },
);

export const getContacts = state => [
  {
    id: 'All',
    displayName: 'All',
  },
  ...state.contacts,
];

export const getShowAllFilters = createSelector(
  getMatchTransactionFilterOptions,
  filterOptions => filterOptions.showType !== 'selected',
);

export const getIncludeClosedTransactionLabel = createSelector(
  getOpenTransactionLine,
  bankTransaction => (
    bankTransaction.withdrawal ? 'Show paid bills' : 'Show closed invoices'
  ),
);

export const getShowIncludeClosedCheckbox = createSelector(
  getMatchTransactionFilterOptions,
  filterOptions => filterOptions.contactId && filterOptions.contactId !== 'All',
);

const DayOffsetMap = {
  closeMatches: { from: 5, to: 5 },
  last90Days: { from: 90, to: 0 },
  all: { from: 365, to: 365 },
  selected: { from: 5, to: 5 },
};

const getRequestParams = (accountId, bankTransaction, filterOptions) => {
  const {
    showType, contactId, keywords, includeClosed,
  } = filterOptions;
  const { transactionId: bankFeedTransactionId, date } = bankTransaction;
  const amount = Number(bankTransaction.withdrawal || bankTransaction.deposit);
  const offset = DayOffsetMap[showType];
  const isCredit = Boolean(bankTransaction.deposit);
  const amountFrom = ['closeMatches', 'selected'].includes(showType) ? amount - 0.1 : 0;
  const amountTo = ['closeMatches', 'selected'].includes(showType) ? amount + 0.1 : 9999999999;
  const transactionDate = new Date(date);
  return {
    showType,
    bankFeedTransactionId,
    isCredit,
    keywords,
    includeClosed: contactId !== 'All' ? includeClosed : false,
    amountFrom,
    amountTo,
    contactId,
    accountId,
    dateFrom: formatIsoDate(subDays(transactionDate, offset.from)),
    dateTo: formatIsoDate(addDays(transactionDate, offset.to)),
  };
};

export const getDefaultMatchTransactionFilterRequestParams = (bankAccount, bankTransaction) => {
  const isMatched = bankTransaction.journalLineId || bankTransaction.type === 'splitMatched';
  const contactId = getAppliedPaymentRuleContactId(bankTransaction) || 'All';
  const filterOptions = {
    contactId,
    showType: isMatched ? 'selected' : 'closeMatches',
    includeClosed: false,
    keywords: '',
  };
  return getRequestParams(bankAccount, bankTransaction, filterOptions);
};

export const getMatchTransactionFilterRequestParams = createSelector(
  getFilterOptions,
  getOpenTransactionLine,
  getMatchTransactionFilterOptions,
  (bankTransactionFilterOptions, bankTransaction, filterOptions) => {
    const { bankAccount } = bankTransactionFilterOptions;
    return getRequestParams(bankAccount, bankTransaction, filterOptions);
  },
);

export const getHasAdjustment = createSelector(
  getAdjustments,
  adjustments => adjustments.length > 0,
);

export const getSortingDisabled = createSelector(
  getShowType,
  showType => showType === 'selected',
);
