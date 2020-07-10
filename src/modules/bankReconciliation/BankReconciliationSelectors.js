import { createSelector, createStructuredSelector } from 'reselect';

import { businessEventToFeatureMap } from '../../common/types/BusinessEventTypeMap';
import ModalType from './ModalType';
import flat from '../../common/flat/flat';
import formatAmount from '../../common/valueFormatters/formatAmount';
import formatCurrency from '../../common/valueFormatters/formatCurrency';
import formatSlashDate from '../../common/valueFormatters/formatDate/formatSlashDate';

export const getLoadingState = (state) => state.loadingState;
export const getIsTableLoading = (state) => state.isTableLoading;
export const getIsSubmitting = (state) => state.isSubmitting;
export const getIsActionDisabled = (state) =>
  state.isSubmitting || state.isTableLoading;
export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getAlert = (state) => state.alert;
export const getModal = (state) => state.modal;

const getClosingBankStatementBalance = (state) =>
  state.closingBankStatementBalance;
const getCalculatedClosingBalance = (state) => state.calculatedClosingBalance;
export const getEntries = (state) => state.entries;

export const getAccountId = (state) => state.selectedAccountId;
export const getAccounts = (state) => state.accounts;
export const getUrlParams = (state) => ({
  businessId: getBusinessId(state),
  accountId: getAccountId(state),
});

export const getStatementDate = (state) => state.statementDate;

export const getSortAndFilterParams = (state) => ({
  statementDate: state.statementDate,
  sortOrder: state.sortOrder,
  orderBy: state.orderBy,
});

export const getOutOfBalance = ({
  calculatedClosingBalance,
  closingBankStatementBalance,
}) => {
  const outOfBalance =
    calculatedClosingBalance - (Number(closingBankStatementBalance) || 0);
  if (Math.abs(outOfBalance) < 0.01) {
    return 0;
  }
  return outOfBalance;
};
export const getIsOutOfBalance = (state) => getOutOfBalance(state) !== 0;
export const getFormattedOutOfBalance = (state) =>
  formatCurrency(getOutOfBalance(state));
export const getOptions = createStructuredSelector({
  statementDate: getStatementDate,
  selectedAccountId: getAccountId,
  closingBankStatementBalance: (state) => state.closingBankStatementBalance,
  calculatedClosingBalance: (state) =>
    formatCurrency(state.calculatedClosingBalance),
  outOfBalance: (state) => getFormattedOutOfBalance(state),
  lastReconcileDate: (state) =>
    state.lastReconcileDate &&
    formatSlashDate(new Date(state.lastReconcileDate)),
  accounts: getAccounts,
  hasReconciled: (state) => Boolean(state.lastReconcileDate),
});

export const getOrder = (state) => ({
  column: state.orderBy,
  descending: state.sortOrder === 'desc',
});

export const getIsTableEmpty = ({ entries }) => entries.length === 0;

const getEntryLink = (entry, businessId, region) => {
  const { journalId, sourceJournal } = entry;
  const feature = businessEventToFeatureMap[sourceJournal];

  return feature
    ? `/#/${region}/${businessId}/${feature}/${journalId}`
    : undefined;
};

const buildTableEntry = (entry, businessId, region) => {
  const { hasMatchedTransactions } = entry;
  const matchedTransactions = hasMatchedTransactions
    ? entry.matchedTransactions.map((transaction) => ({
        journalLineId: transaction.journalLineId,
        link: getEntryLink(transaction, businessId, region),
        date: formatSlashDate(new Date(transaction.date)),
        referenceId: transaction.referenceId,
        description: transaction.description,
        deposit: transaction.deposit && formatAmount(transaction.deposit),
        withdrawal:
          transaction.withdrawal && formatAmount(transaction.withdrawal),
      }))
    : [];

  const link = hasMatchedTransactions
    ? ''
    : getEntryLink(entry, businessId, region);
  const referenceId = hasMatchedTransactions ? '' : entry.referenceId;

  return {
    journalLineId: entry.journalLineId,
    date: formatSlashDate(new Date(entry.date)),
    isChecked: entry.isChecked,
    description: entry.description,
    deposit: entry.deposit && formatAmount(entry.deposit),
    withdrawal: entry.withdrawal && formatAmount(entry.withdrawal),
    link,
    referenceId,
    hasMatchedTransactions,
    matchedTransactions,
  };
};

export const getTableRowByIndexSelector = () =>
  createSelector(
    (state, props) => state.entries[props.index],
    getBusinessId,
    getRegion,
    (entry, businessId, region) => buildTableEntry(entry, businessId, region)
  );

export const getJournalLineIdByIndexSelector = () =>
  createSelector(
    (state, props) => state.entries[props.index],
    (entry) =>
      entry.hasMatchedTransactions
        ? entry.matchedTransactions[0].journalLineId
        : entry.journalLineId
  );

export const getIsAllSelected = (state) =>
  state.entries.every((entry) => entry.isChecked);
export const getHeaderSelectStatus = createSelector(
  (state) => state.entries.filter((entry) => entry.isChecked).length,
  (state) => state.entries.length,
  (selectedCount, entryCount) => {
    if (entryCount > 0 && selectedCount === entryCount) {
      return 'checked';
    }

    if (selectedCount > 0) {
      return 'indeterminate';
    }

    return '';
  }
);

const buildEntry = ({ journalLineId, journalTransactionId }) => ({
  journalLineId,
  journalTransactionId,
});

export const getCreateBankReconciliationPayload = (state) => {
  const entries = state.entries
    .filter((entry) => entry.isChecked)
    .map((entry) =>
      entry.hasMatchedTransactions
        ? entry.matchedTransactions.map(buildEntry)
        : buildEntry(entry)
    );

  const flattenedEntries = flat(entries, 1);

  return {
    statementDate: state.statementDate,
    entries: flattenedEntries,
  };
};

export const getSelectedAccount = createSelector(
  getAccountId,
  getAccounts,
  (selectedAccountId, accounts) =>
    accounts.find((account) => account.id === selectedAccountId)
);

export const getBankReconciliationCancelModal = createSelector(
  getClosingBankStatementBalance,
  getCalculatedClosingBalance,
  getEntries,
  (closingBankStatementBalance, calculatedClosingBalance, entries) => {
    const outOfBalance = getOutOfBalance({
      closingBankStatementBalance,
      calculatedClosingBalance,
    });

    const totalDeposit = entries.reduce(
      (total, { isChecked, deposit = 0 }) =>
        isChecked ? total + deposit : total,
      0
    );

    const totalWithdrawal = entries.reduce(
      (total, { isChecked, withdrawal = 0 }) =>
        isChecked ? total + withdrawal : total,
      0
    );

    return {
      outOfBalance: formatCurrency(outOfBalance),
      closingBankStatementBalance: formatCurrency(closingBankStatementBalance),
      totalDeposit: formatCurrency(totalDeposit),
      totalWithdrawal: formatCurrency(totalWithdrawal),
    };
  }
);

export const getIsModalActive = (state) =>
  state.modal && state.modal.type !== ModalType.NONE;
