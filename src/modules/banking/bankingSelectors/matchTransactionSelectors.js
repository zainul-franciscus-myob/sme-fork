import { addDays, subDays } from 'date-fns';
import { createSelector } from 'reselect';

import { businessEventToFeatureMap } from '../../../common/types/BusinessEventTypeMap';
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
import BankTransactionStatusTypes from '../BankTransactionStatusTypes';
import MatchTransactionShowType from '../MatchTransactionShowType';
import formatAmount from '../../../common/valueFormatters/formatAmount';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

export const getMatchTransactionFilterOptions = (state) =>
  state.openEntry.match.filterOptions;

export const getSelectedEntries = (state) =>
  state.openEntry.match.selectedEntries;

export const getMatchTransactionOrderBy = (state) =>
  state.openEntry.match.orderBy;

export const getMatchTransactionSortOrder = (state) =>
  state.openEntry.match.sortOrder;

export const getMatchTransactionFlipSortOrder = (state) =>
  state.openEntry.match.sortOrder === 'desc' ? 'asc' : 'desc';

export const getIsTableLoading = (state) =>
  state.openEntry.match.isTableLoading;

export const getTotalAmount = (state) => state.openEntry.match.totalAmount;

export const getMatchTransactionEntries = (state) =>
  state.openEntry.match.entries;

export const getShowAdjustmentTable = (state) =>
  state.openEntry.match.showAdjustmentTable;

export const getAdjustments = (state) => state.openEntry.match.adjustments;

export const getIsTableEmpty = (state) =>
  state.openEntry.match.entries.length === 0;

export const getOrder = createSelector(
  getMatchTransactionSortOrder,
  getMatchTransactionOrderBy,
  (sortOrder, orderBy) => ({
    column: orderBy,
    descending: sortOrder === 'desc',
  })
);

const getEntryLink = (entry, businessId, region) => {
  const { journalId, sourceJournal } = entry;
  const feature = businessEventToFeatureMap[sourceJournal];

  return feature && `/#/${region}/${businessId}/${feature}/${journalId}`;
};

export const getIsAllowCustomAmount = (entry) => entry.type !== 'Transaction';

const getBalanceOwed = ({ totalAmount, discountAmount }) =>
  Number(totalAmount) - Number(discountAmount || 0);

const getOverAmount = (entry) => {
  if (!entry.matchAmount) return undefined;
  const overAmount = Number(entry.matchAmount) - getBalanceOwed(entry);
  return overAmount > 0 ? formatCurrency(overAmount) : undefined;
};

const getBadge = (entry) => {
  const { status, type, originalAmount, totalAmount } = entry;
  if (['CloseInvoice', 'CloseBill'].includes(status)) {
    return {
      badgeText: 'Closed',
      badgeColor: 'green',
    };
  }
  if (['Purchase', 'Sale'].includes(type) && originalAmount !== totalAmount) {
    return {
      badgeText: `Total: ${formatCurrency(originalAmount)}`,
    };
  }
  return {};
};

export const getPrefilledEntries = (state, entries) => {
  const selectedEntries = getSelectedEntries(state);
  return entries.map((entry) => {
    const cachedState =
      selectedEntries[`${entry.journalId}-${entry.journalLineId}`];
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
        selected,
        totalAmount = '',
        matchAmount = '',
        discountAmount = '',
      } = entry;
      const allowCustomAmount = getIsAllowCustomAmount(entry);
      return {
        ...entry,
        allowCustomAmount,
        discountAmount,
        matchAmount: selected && !allowCustomAmount ? totalAmount : matchAmount,
        link: getEntryLink(entry, businessId, region),
        displayTotalAmount: formatAmount(entry.totalAmount),
        balanceOwed: allowCustomAmount
          ? formatAmount(getBalanceOwed(entry))
          : '',
        overAmount: getOverAmount(entry),
        ...getBadge(entry),
      };
    });

    return tableEntries;
  }
);

export const getShowType = createSelector(
  getMatchTransactionFilterOptions,
  (filterOptions) => filterOptions.showType
);

export const getSelectAllState = createSelector(getTableEntries, (entries) =>
  entries.every(({ selected }) => selected)
);

const getSelectedCount = createSelector(
  getTableEntries,
  (entries) => entries.filter(({ selected }) => selected).length
);

export const getSelectedText = createSelector(getSelectedCount, (count) =>
  count > 0 ? `${count} transactions selected` : 'No transaction selected'
);

export const getAccounts = createSelector(
  getOpenTransactionLine,
  getWithdrawalAccounts,
  getDepositAccounts,
  (bankTransaction, withdrawalAccounts, depositAccounts) =>
    bankTransaction.withdrawal ? withdrawalAccounts : depositAccounts
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
  const bankFeedDescription =
    newBankFeedDescription || originalBankFeedDescription;

  const matchTransactions = getTableEntries(state);

  const adjustments = getAdjustments(state).map(
    ({ amount, description, accountId, taxCodeId, quantity, jobId }) => ({
      amount,
      description,
      accountId,
      taxCodeId,
      quantity,
      jobId,
    })
  );

  const selectedTransactions = matchTransactions.filter(({ selected }) =>
    Boolean(selected)
  );

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
    const entries = journalTransactions
      .filter(({ isMatched }) => isMatched)
      .map(({ journalLineId }) => ({
        transactionId,
        journalLineId,
      }));
    return {
      bankAccountId,
      entries,
    };
  }
);

export const getTotals = createSelector(
  getOpenTransactionLine,
  getTableEntries,
  getAdjustments,
  (bankTransaction, entries, adjustments) => {
    const bankTransactionAmount =
      bankTransaction.withdrawal || bankTransaction.deposit;
    const matchAmountTotal = entries
      .filter(({ selected }) => selected)
      .reduce((total, entry) => total + Number(entry.matchAmount), 0);
    const adjustmentsTotal = adjustments.reduce(
      (total, entry) => total + Number(entry.amount || 0),
      0
    );
    const outOfBalance = Number(
      (bankTransactionAmount - matchAmountTotal - adjustmentsTotal).toFixed(2)
    );
    return {
      matchAmountTotal: formatCurrency(matchAmountTotal),
      adjustmentsTotal: formatCurrency(adjustmentsTotal),
      subtotal: formatCurrency(matchAmountTotal + adjustmentsTotal),
      outOfBalance: formatCurrency(outOfBalance),
      isOutOfBalance: outOfBalance !== 0,
    };
  }
);

export const getContacts = (state) => state.contacts;

export const getShowAllFilters = createSelector(
  getMatchTransactionFilterOptions,
  (filterOptions) =>
    filterOptions.showType !== MatchTransactionShowType.SELECTED
);

export const getIncludeClosedTransactionLabel = createSelector(
  getOpenTransactionLine,
  (bankTransaction) =>
    bankTransaction.withdrawal ? 'Show paid bills' : 'Show closed invoices'
);

export const getShowIncludeClosedCheckbox = createSelector(
  getMatchTransactionFilterOptions,
  (filterOptions) =>
    filterOptions.contactId && filterOptions.contactId !== 'All'
);

const DayOffsetMap = {
  [MatchTransactionShowType.CLOSE_MATCHES]: { from: 180, to: 180 },
  [MatchTransactionShowType.ALL]: { from: 365, to: 365 },
  [MatchTransactionShowType.SELECTED]: { from: 5, to: 5 },
};

const AmountOffsetMap = {
  [MatchTransactionShowType.CLOSE_MATCHES]: { from: 0.1, to: 0.1 },
  [MatchTransactionShowType.ALL]: { from: 0, to: 9999999999 },
  [MatchTransactionShowType.SELECTED]: { from: 0.1, to: 0.1 },
};

const getRequestParams = (accountId, bankTransaction, filterOptions) => {
  const { showType, contactId, keywords, includeClosed } = filterOptions;
  const { transactionId: bankFeedTransactionId, date } = bankTransaction;
  const amount = Number(bankTransaction.withdrawal || bankTransaction.deposit);
  const offset = DayOffsetMap[showType];
  const isCredit = Boolean(bankTransaction.deposit);
  const amountFrom = [
    MatchTransactionShowType.CLOSE_MATCHES,
    MatchTransactionShowType.SELECTED,
  ].includes(showType)
    ? amount - AmountOffsetMap[showType].from
    : AmountOffsetMap[showType].from;
  const amountTo = [
    MatchTransactionShowType.CLOSE_MATCHES,
    MatchTransactionShowType.SELECTED,
  ].includes(showType)
    ? amount + AmountOffsetMap[showType].to
    : AmountOffsetMap[showType].to;
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

const getShowTypeFromBankTransaction = (bankTransaction) => {
  switch (bankTransaction.type) {
    case BankTransactionStatusTypes.matched:
    case BankTransactionStatusTypes.unmatched:
      return MatchTransactionShowType.CLOSE_MATCHES;
    case BankTransactionStatusTypes.paymentRuleMatched:
      return MatchTransactionShowType.ALL;
    default:
      return MatchTransactionShowType.SELECTED;
  }
};

export const getDefaultMatchTransactionFilterRequestParams = (
  bankAccount,
  bankTransaction
) => {
  const showType = getShowTypeFromBankTransaction(bankTransaction);

  const contactId = getAppliedPaymentRuleContactId(bankTransaction);
  const filterOptions = {
    contactId,
    showType,
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
  }
);

export const getHasAdjustment = createSelector(
  getAdjustments,
  (adjustments) => adjustments.length > 0
);

export const getSortingDisabled = createSelector(
  getShowType,
  (showType) => showType === MatchTransactionShowType.SELECTED
);
