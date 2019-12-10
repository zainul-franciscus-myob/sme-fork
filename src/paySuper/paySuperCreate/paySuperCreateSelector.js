import { createSelector } from 'reselect';

import { formatCurrency } from '../../banking/bankingSelectors';

export const getAlert = ({ alert }) => alert;
export const getIsLoading = state => (state.isLoading);
export const getIsTableLoading = state => (state.isTableLoading);
export const getSuperPayments = state => (state.superPayments);
export const getAccounts = state => (state.accounts);

export const getPaySuperDescription = state => (state.paySuperDescription);
export const getReferenceNumber = state => (state.referenceNumber);
export const getDateOfPayment = state => (state.dateOfPayment);
export const getBatchPaymentId = state => (state.batchPaymentId);

export const getFilterOptions = state => (state.filterOptions);
export const getAppliedFilterOptions = ({ appliedFilterOptions }) => appliedFilterOptions;
export const getSelectedAccountId = state => (state.selectedAccountId);
export const getBalanceValue = (state) => {
  if (state.accounts && state.accounts.length > 0 && state.selectedAccountId) {
    const selectedAccount = state.accounts.find(a => a.id === state.selectedAccountId);
    return (selectedAccount && selectedAccount.balance) || null;
  }
  return null;
};
export const getBusinessId = state => (state.businessId);
export const getRegion = state => (state.region);
export const getSortOrder = state => (state.sortOrder);
export const getOrderBy = state => (state.orderBy);

const getTotalAmount = (state) => {
  const selectedAmountList = state.superPayments.filter(
    p => p.isSelected,
  ).map(e => e.amount);
  const totalPayment = selectedAmountList
    .reduce((paymentOne, paymentTwo) => (paymentOne + paymentTwo), 0);
  return totalPayment;
};

export const getTotalPayment = (state) => {
  const totalPayment = (state.superPayments)
    ? getTotalAmount(state) : 0;
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
export const getSuperPaymentListUrl = state => `/#/${state.region}/${state.businessId}/paySuper`;

export const getAuthorisationCode = state => state.authorisationInfo.authorisationCode;

export const getRecordPaySuperContent = state => ({
  accountId: state.selectedAccountId,
  dateFrom: state.appliedFilterOptions.dateFrom,
  dateTo: state.appliedFilterOptions.dateTo,
  dateOfPayment: state.dateOfPayment,
  referenceNumber: state.referenceNumber,
  paySuperDescription: state.paySuperDescription,
  paymentLines: getSuperPayments(state).filter(p => p.isSelected),
});

export const getAuthoriseWithCodeContent = state => ({
  batchPaymentId: state.batchPaymentId,
  authorisationCode: state.authorisationInfo.authorisationCode,
  authorisationId: state.authorisationInfo.authorisationId,
  authorisationEmail: state.authorisationInfo.authorisationEmail,
});
