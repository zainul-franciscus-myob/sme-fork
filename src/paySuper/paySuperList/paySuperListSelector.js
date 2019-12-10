import paymentStatus from '../paymentStatus';

export const getIsLoading = state => state.isLoading;
export const getBusinessId = state => state.businessId;
export const getIsRegistered = state => state.isRegistered;
export const getSortOrder = state => ({
  column: state.orderBy,
  descending: state.sortDescending,
});
export const getOrderBy = state => state.orderBy;
export const getSuperPayments = state => state.superPayments.map(payment => ({
  ...payment,
  status: paymentStatus[payment.status],
}));
export const getIsTableEmpty = state => (
  !getIsRegistered(state) || getSuperPayments(state).length === 0
);
export const getIsTableLoading = state => state.isTableLoading;
export const getAlert = state => state.alert;
export const getPaySuperCreateUrl = state => `/#/${state.region}/${state.businessId}/paySuper/new`;
