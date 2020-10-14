import { addDays, subDays } from 'date-fns';
import { createSelector } from 'reselect';

import { businessEventToFeatureMap } from '../../../../common/types/BusinessEventTypeMap';
import ContactType from '../../../contact/contactCombobox/types/ContactType';
import DisplayMode from '../../../contact/contactCombobox/types/DisplayMode';
import MatchTransactionShowType from '../../types/MatchTransactionShowType';
import formatAmount from '../../../../common/valueFormatters/formatAmount';
import formatCurrency from '../../../../common/valueFormatters/formatCurrency';
import formatIsoDate from '../../../../common/valueFormatters/formatDate/formatIsoDate';

export const getRegion = (state) => state.region;

export const getBusinessId = (state) => state.businessId;

export const getBankAccountId = (state) => state.bankAccountId;

export const getTransaction = (state) => state.transaction;

export const getTransactionId = (state) => state.transaction.id;

export const getIsTransactionWithdrawal = (state) =>
  state.transaction.isWithdrawal;

export const getTransactionAmount = (state) => state.transaction.amount;

export const getIsMatchTransactionsTabOpen = (state) => state.isOpen;

export const getMatchTransactionFilterOptions = (state) => state.filterOptions;

export const getTaxCodes = (state) => state.taxCodes;

export const getActiveJobs = (state) =>
  state.jobs.filter((job) => job.isActive);

export const getIsLoadingAccount = (state) => state.isLoadingAccount;
export const getIsJobComboboxDisabled = (state) => state.isJobLoading;

export const getSelectedEntries = (state) => state.selectedEntries;

export const getMatchTransactionOrderBy = (state) => state.orderBy;

export const getMatchTransactionSortOrder = (state) => state.sortOrder;

export const getMatchTransactionFlipSortOrder = (state) =>
  state.sortOrder === 'desc' ? 'asc' : 'desc';

export const getIsTableLoading = (state) => state.isTableLoading;

export const getMatchTransactionEntries = (state) => state.entries;

export const getShowAdjustmentTable = (state) => state.showAdjustmentTable;

export const getIsMatchTransactionsEdited = (state) => state.isEdited;

export const getAdjustments = (state) => state.adjustments;

export const getIsTableEmpty = (state) => state.entries.length === 0;

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

export const getAccounts = (state) => state.accounts;

export const getMatchTransactionPayload = (state) => {
  const transaction = getTransaction(state);
  const {
    id: bankTransactionId,
    description: originalBankFeedDescription,
    note: newBankFeedDescription,
    date,
    isWithdrawal,
  } = transaction;

  const bankFeedAccountId = getBankAccountId(state);
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
    isCredit: !isWithdrawal || undefined,
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
  getTransactionId,
  getBankAccountId,
  (journalTransactions, transactionId, bankAccountId) => {
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
  getTransactionAmount,
  getTableEntries,
  getAdjustments,
  (amount, entries, adjustments) => {
    const matchAmountTotal = entries
      .filter(({ selected }) => selected)
      .reduce((total, entry) => total + Number(entry.matchAmount), 0);
    const adjustmentsTotal = adjustments.reduce(
      (total, entry) => total + Number(entry.amount || 0),
      0
    );
    const outOfBalance = Number(
      (amount - matchAmountTotal - adjustmentsTotal).toFixed(2)
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

export const getShowAllFilters = createSelector(
  getMatchTransactionFilterOptions,
  (filterOptions) =>
    filterOptions.showType !== MatchTransactionShowType.SELECTED
);

export const getIncludeClosedTransactionLabel = createSelector(
  getIsTransactionWithdrawal,
  (isWithdrawal) => (isWithdrawal ? 'Show paid bills' : 'Show closed invoices')
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

const getRequestParams = (accountId, transaction, filterOptions) => {
  const { showType, contactId, keywords, includeClosed } = filterOptions;
  const { id: bankFeedTransactionId, date } = transaction;
  const amount = Number(transaction.amount);
  const offset = DayOffsetMap[showType];
  const isCredit = !transaction.isWithdrawal;

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

export const getDefaultMatchTransactionFilterRequestParams = createSelector(
  getBankAccountId,
  getTransaction,
  getMatchTransactionFilterOptions,
  (bankAccountId, transaction, filterOptions) =>
    getRequestParams(bankAccountId, transaction, filterOptions)
);

export const getMatchTransactionFilterRequestParams = createSelector(
  getBankAccountId,
  getTransaction,
  getMatchTransactionFilterOptions,
  (bankAccountId, transaction, filterOptions) =>
    getRequestParams(bankAccountId, transaction, filterOptions)
);

export const getHasAdjustment = createSelector(
  getAdjustments,
  (adjustments) => adjustments.length > 0
);

export const getSortingDisabled = createSelector(
  getShowType,
  (showType) => showType === MatchTransactionShowType.SELECTED
);

export const getMatchTransactionContactComboboxContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const { contactId } = getMatchTransactionFilterOptions(state);

  return {
    businessId,
    region,
    contactId,
    contactType: ContactType.ALL,
    displayMode: DisplayMode.NAME_AND_TYPE,
  };
};
