import { createSelector } from 'reselect';

import PaymentTypeMap from './PaymentTypeMap';
import formatAmount from '../../common/valueFormatters/formatAmount';
import formatCurrency from '../../common/valueFormatters/formatCurrency';

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getElectronicPaymentId = state => state.electronicPaymentId;
export const getAccount = state => state.account;
export const getBalance = state => state.balance;
export const getAlert = state => state.alert;
export const getBankStatementDescription = state => state.bankStatementDescription;
export const getDateOfPayment = state => state.dateOfPayment;
export const getIsLoading = state => state.isLoading;
export const getReferenceNumber = state => state.referenceNumber;
export const getTransactionDescription = state => state.transactionDescription;
export const getIsDeleteModalOpen = state => state.isDeleteModalOpen;

export const getTransactionListUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/transactionList`;
};

export const getTotalPayment = (state) => {
  const selectedAmountList = state.transactions.map(e => e.amount);
  const totalPayment = selectedAmountList
    .reduce((paymentOne, paymentTwo) => (paymentOne + paymentTwo), 0);
  return formatCurrency(totalPayment);
};

const getTransactions = state => state.transactions;
const getEntryLink = (entry, businessId, region) => {
  const { id, paymentType } = entry;
  const feature = PaymentTypeMap[paymentType];
  return feature ? `/#/${region}/${businessId}/${feature}/${id}` : undefined;
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

export const getPageTitle = createSelector(
  getReferenceNumber,
  referenceNumber => `Electronic payment ${referenceNumber}`,
);
