import formatCurrency from '../../../common/valueFormatters/formatCurrency';
import paymentStatus from '../paymentStatus';

export const getLoadingState = (state) => state.loadingState;
export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getTotalPayment = (state) => {
  const amountList = state.superPayments.map((e) => e.amount);
  const totalPayment = amountList.reduce(
    (paymentOne, paymentTwo) => paymentOne + paymentTwo,
    0
  );
  return formatCurrency(totalPayment);
};
export const getDescription = (state) => state.description;
export const getDate = (state) => state.date;
export const getAccount = (state) => state.account;
export const getReferenceNumber = (state) => state.referenceNumber;
export const getStatus = (state) => state.status;
export const getLabelStatus = (state) => paymentStatus[state.status];
export const getSuperPayments = (state) => state.superPayments;
export const getBatchPaymentId = (state) => state.batchPaymentId;
export const getBusinessEventId = (state) => state.businessEventId;
export const getPaySuperListUrl = (state) => {
  const { businessId, region } = state;
  return `/#/${region}/${businessId}/paySuper`;
};
export const getModalType = (state) => state.modalType;
export const getAlert = (state) => state.alert;
export const getAccessTokenContent = (state) => ({
  accessToken: state.accessToken,
});
