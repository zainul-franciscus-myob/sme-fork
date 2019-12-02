import { createSelector } from 'reselect';

import { formatCurrency } from '../banking/bankingSelectors';

export const getAlert = ({ alert }) => alert;
export const getIsLoading = state => (state.isLoading);
export const getIsTableLoading = state => (state.isTableLoading);
export const getElectronicPayments = state => (state.electronicPayments);
export const getElectronicPaymentId = state => (state.electronicPaymentId);
export const getAccounts = state => (state.accounts);

export const getTransactionDescription = state => (state.transactionDescription);
export const getReferenceNumber = state => (state.referenceNumber);
export const getDateOfPayment = state => (state.dateOfPayment);
export const getBankStatementDescription = state => (state.bankStatementDescription);

export const getFilterOptions = state => (state.filterOptions);
export const getAppliedFilterOptions = ({ appliedFilterOptions }) => appliedFilterOptions;
export const getSelectedAccountId = state => (state.selectedAccountId);
export const getBalanceValue = (state) => {
  if (state.accounts && state.accounts.length > 0 && state.selectedAccountId) {
    const selectedAccount = state.accounts.find(a => a.id === state.selectedAccountId);
    return selectedAccount.balance || null;
  }
  return null;
};
export const getBusinessId = state => (state.businessId);
export const getSortOrder = state => (state.sortOrder);
export const getOrderBy = state => (state.orderBy);
export const getTotalPayment = (state) => {
  const selectedAmountList = state.electronicPayments.filter(
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

export const getModal = state => state.modal;

export const getRecordAndDownloadBankFileContent = state => ({
  bankStatementDescription: state.bankStatementDescription,
  transactionDescription: state.transactionDescription,
  referenceNumber: state.referenceNumber,
  dateOfPayment: state.dateOfPayment,
  accountId: state.selectedAccount,
  paymentLines: getElectronicPayments(state),
});
