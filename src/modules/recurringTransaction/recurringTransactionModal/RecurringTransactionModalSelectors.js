import { createSelector } from 'reselect';

export const getBusinessId = (state) => state.businessId;
export const getRecurringTransactionId = (state) =>
  state.recurringTransactionId;
export const getTransactionType = (state) => state.transactionType;

export const getSchedule = (state) => state.schedule;
export const getTransaction = (state) => state.transaction;

export const getIsOpen = (state) => state.isOpen;
export const getAlert = (state) => state.alert;
export const getIsLoading = (state) => state.isLoading;
export const getIsSubmitting = (state) => state.isSubmitting;

export const getIsActionDisabled = createSelector(
  getIsLoading,
  (isLoading) => isLoading
);

export const getScheduleOptions = createSelector(
  getSchedule,
  getTransactionType,
  getIsSubmitting,
  (schedule, transactionType, isSubmitting) => ({
    ...schedule,
    transactionType,
    isDisabled: isSubmitting,
    showTransactionType: false,
  })
);

export const getLoadNewRecurringTransactionUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};

export const getCreateRecurringTransactionUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};

export const getCreateRecurringTransactionContent = (state) => {
  const schedule = getSchedule(state);
  const transaction = getTransaction(state);
  const transactionType = getTransactionType(state);

  return { schedule, transaction, transactionType };
};
