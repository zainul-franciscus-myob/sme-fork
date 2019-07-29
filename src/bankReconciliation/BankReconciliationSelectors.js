import { createSelector, createStructuredSelector } from 'reselect';
import { format } from 'date-fns';

import { businessEventFeatures } from '../banking/businessEventTypes';

export const getIsLoading = state => state.isLoading;
export const getIsTableLoading = state => state.isTableLoading;
export const getIsSubmitting = state => state.isSubmitting;
export const getIsActionDisabled = state => state.isSubmitting || state.isTableLoading;
export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getAlert = state => state.alert;
export const getIsModalActive = state => state.isModalActive;

const getAccountId = state => state.selectedAccountId;
export const getUrlParams = state => ({
  businessId: getBusinessId(state),
  accountId: getAccountId(state),
});

export const getStatementDate = state => state.statementDate;

export const getSortAndFilterParams = state => ({
  statementDate: state.statementDate,
  sortOrder: state.sortOrder,
  orderBy: state.orderBy,
});

const formatAmount = amount => Intl
  .NumberFormat('en-AU', {
    style: 'decimal',
    minimumFractionDigits: '2',
    maximumFractionDigits: '2',
  })
  .format(amount);

const formatCurrency = (amount) => {
  const formattedAmount = formatAmount(Math.abs(amount));

  return amount < 0 ? `-$${formattedAmount}` : `$${formattedAmount}`;
};

export const getOutOfBalance = state => (
  state.calculatedClosingBalance - Number(state.closingBankStatementBalance)
);
export const getIsOutOfBalance = state => getOutOfBalance(state) !== 0;
export const getFormattedOutOfBalance = state => formatCurrency(getOutOfBalance(state));
export const getOptions = createStructuredSelector({
  statementDate: getStatementDate,
  selectedAccountId: getAccountId,
  closingBankStatementBalance: state => state.closingBankStatementBalance,
  calculatedClosingBalance: state => formatCurrency(state.calculatedClosingBalance),
  outOfBalance: state => getFormattedOutOfBalance(state),
  lastReconcileDate: state => state.lastReconcileDate && format(state.lastReconcileDate, 'DD/MM/YYYY'),
  accounts: state => state.accounts,
});

export const getOrder = state => ({
  column: state.orderBy,
  descending: state.sortOrder === 'desc',
});

export const getIsTableEmpty = ({ entries }) => entries.length === 0;

const getEntryLink = (entry, businessId, region) => {
  const { journalId, sourceJournal } = entry;
  const feature = businessEventFeatures[sourceJournal];

  return `/#/${region}/${businessId}/${feature}/${journalId}`;
};

export const getEntries = createSelector(
  getBusinessId,
  getRegion,
  state => state.entries,
  (businessId, region, entries) => entries.map(entry => ({
    journalLineId: entry.journalLineId,
    link: getEntryLink(entry, businessId, region),
    date: format(entry.date, 'DD/MM/YYYY'),
    referenceId: entry.referenceId,
    isChecked: entry.isChecked,
    description: entry.description,
    deposit: entry.deposit && formatAmount(entry.deposit),
    withdrawal: entry.withdrawal && formatAmount(entry.withdrawal),
  })),
);

export const getIsAllSelected = state => state.entries.every(entry => entry.isChecked);
export const getHeaderSelectStatus = createSelector(
  state => state.entries.filter(entry => entry.isChecked).length,
  state => state.entries.length,
  (selectedCount, entryCount) => {
    if (entryCount > 0 && selectedCount === entryCount) {
      return 'checked';
    }

    if (selectedCount > 0) {
      return 'indeterminate';
    }

    return '';
  },
);

export const getCreateBankReconciliationPayload = state => ({
  statementDate: state.statementDate,
  entries: state.entries
    .filter(entry => entry.isChecked)
    .map(entry => ({
      journalLineId: entry.journalLineId,
      journalTransactionId: entry.journalTransactionId,
    })),
});
