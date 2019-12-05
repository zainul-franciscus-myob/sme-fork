import paymentStatus from '../paymentStatus';

export const getIsLoading = state => state.isLoading;
export const getBusinessId = state => state.businessId;
export const getIsRegistered = state => state.isRegistered;
export const getSuperPayments = state => state.superPayments.map(payment => ({
  ...payment,
  status: paymentStatus[payment.status],
}));
export const getIsTableEmpty = state => (
  !getIsRegistered(state) || getSuperPayments(state).length === 0
);
