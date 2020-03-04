import { createSelector } from 'reselect/lib/index';

import PaymentTypeMap from '../PaymentTypeMap';
import formatAmount from '../../../common/valueFormatters/formatAmount';
import formatCurrency from '../../../common/valueFormatters/formatCurrency';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

export const getAlert = state => state.alert;
export const getLoadingState = state => state.loadingState;
export const getIsTableLoading = state => state.isTableLoading;
export const getPaymentTypes = state => state.paymentTypes;
export const getAccounts = state => state.accounts;
export const getTransactionDescription = state => state.transactionDescription;
export const getReferenceNumber = state => state.referenceNumber;
export const getDateOfPayment = state => state.dateOfPayment;
export const getBankStatementDescription = state => state.bankStatementDescription;
export const getFilterOptions = state => state.filterOptions;
export const getAppliedFilterOptions = state => state.appliedFilterOptions;
export const getSelectedAccountId = state => state.selectedAccountId;
export const getModal = state => state.modal;
export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getSortOrder = state => state.sortOrder;
export const getOrderBy = state => state.orderBy;
export const flipSortOrder = state => (state.sortOrder === 'desc' ? 'asc' : 'desc');

const getTransactions = state => state.transactions;
const getEntryLink = (entry, businessId, region) => {
  const { businessEventId, paymentType } = entry;
  const feature = PaymentTypeMap[paymentType];
  return feature ? `/#/${region}/${businessId}/${feature}/${businessEventId}` : undefined;
};
export const getTableEntries = createSelector(
  getTransactions,
  getBusinessId,
  getRegion,
  (entries, businessId, region) => entries.map(
    entry => ({
      ...entry,
      amount: formatAmount(entry.amount),
      link: getEntryLink(entry, businessId, region),
    }),
  ),
);

export const getBalanceValue = (state) => {
  if (state.accounts && state.accounts.length > 0 && state.selectedAccountId) {
    const selectedAccount = state.accounts.find(a => a.id === state.selectedAccountId);
    return selectedAccount.balance || null;
  }
  return null;
};

export const getTotalPayment = (state) => {
  const selectedAmountList = state.transactions.filter(
    p => p.isSelected,
  ).map(e => e.amount);
  const totalPayment = selectedAmountList
    .reduce((paymentOne, paymentTwo) => (paymentOne + paymentTwo), 0);
  return formatCurrency(totalPayment);
};

export const getOrder = createSelector(
  getSortOrder,
  getOrderBy,
  (sortOrder, orderBy) => ({
    column: orderBy,
    descending: sortOrder === 'desc',
  }),
);

export const getRecordAndDownloadBankFileContent = state => ({
  bankStatementDescription: state.bankStatementDescription,
  transactionDescription: state.transactionDescription,
  referenceNumber: state.referenceNumber,
  dateOfPayment: state.dateOfPayment,
  accountId: state.selectedAccountId,
  paymentLines: getTransactions(state).filter(p => p.isSelected),
});

export const getIsPaymentDateToday = createSelector(
  getDateOfPayment,
  paymentDate => (
    formatIsoDate(new Date(paymentDate)) === formatIsoDate(new Date())
  ),
);

export const getUrlParams = createSelector(
  getAppliedFilterOptions,
  filterOptions => ({
    paymentType: filterOptions.paymentType,
  }),
);
