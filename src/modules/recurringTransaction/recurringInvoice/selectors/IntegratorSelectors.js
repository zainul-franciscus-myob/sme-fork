import {
  getBusinessId,
  getCustomerId,
  getInvoice,
  getIsCreating,
  getRecurringTransactionId,
  getSchedule,
} from './RecurringInvoiceSelectors';

export const getLoadRecurringInvoiceUrlParams = (state) => {
  const isCreating = getIsCreating(state);
  const businessId = getBusinessId(state);
  const recurringTransactionId = isCreating
    ? undefined
    : getRecurringTransactionId(state);

  return { businessId, recurringTransactionId };
};

export const getCreateOrUpdateRecurringInvoiceUrlParams = (state) => {
  const isCreating = getIsCreating(state);

  const businessId = getBusinessId(state);
  const recurringTransactionId = isCreating
    ? undefined
    : getRecurringTransactionId(state);

  return { businessId, recurringTransactionId };
};

export const getCreateOrUpdateRecurringInvoiceContent = (state) => {
  const schedule = getSchedule(state);
  const invoice = getInvoice(state);

  return { schedule, invoice };
};

export const getDeleteRecurringInvoiceUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const recurringTransactionId = getRecurringTransactionId(state);

  return { businessId, recurringTransactionId };
};

export const getLoadAddedAccountUrlParams = (state, accountId) => {
  const businessId = getBusinessId(state);

  return { businessId, accountId };
};

export const getLoadAddedJobUrlParams = (state, jobId) => {
  const businessId = getBusinessId(state);
  return { businessId, jobId };
};

export const getLoadCustomerUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const customerId = getCustomerId(state);

  return { businessId, customerId };
};

export const getLoadAddedCustomerUrlParams = (state, customerId) => {
  const businessId = getBusinessId(state);

  return { businessId, customerId };
};

export const getLoadAbnFromCustomerUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const customerId = getCustomerId(state);

  return { businessId, customerId };
};

export const getLoadPayDirectUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};
