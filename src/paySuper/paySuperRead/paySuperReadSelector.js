import { formatCurrency } from '../../banking/bankingSelectors';
import paymentStatus from '../paymentStatus';

export const getIsLoading = state => state.isLoading;
export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getTotalPayment = (state) => {
  const amountList = state.superPaymentLines.map(e => e.amount);
  const totalPayment = amountList
    .reduce((paymentOne, paymentTwo) => (paymentOne + paymentTwo), 0);
  return formatCurrency(totalPayment);
};
export const getDescription = state => state.description;
export const getDate = state => state.date;
export const getAccount = state => state.account;
export const getReferenceNumber = state => state.referenceNumber;
export const getStatus = state => state.status;
export const getLabelStatus = state => paymentStatus[state.status];
export const getSuperPaymentLines = state => state.superPaymentLines;
export const getBatchPaymentId = state => state.batchPaymentId;
export const getBusinessEventId = state => state.businessEventId;
export const getPaySuperListUrl = (state) => {
  const { businessId, region } = state;
  return `/#/${region}/${businessId}/paySuper`;
};
