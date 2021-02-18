import {
  getAmountPaid,
  getBill,
  getBusinessId,
  getIsCreating,
  getIsTaxInclusive,
  getLines,
  getRecurringTransactionId,
  getSchedule,
  getSupplierId,
} from './RecurringBillSelectors';

export const getLoadRecurringBillUrlParams = (state) => {
  const isCreating = getIsCreating(state);
  const businessId = getBusinessId(state);
  const recurringTransactionId = getRecurringTransactionId(state);

  return isCreating ? { businessId } : { businessId, recurringTransactionId };
};

export const getCreateOrUpdateRecurringBillUrlParams = (state) => {
  const isCreating = getIsCreating(state);
  const businessId = getBusinessId(state);
  const recurringTransactionId = getRecurringTransactionId(state);

  return isCreating ? { businessId } : { businessId, recurringTransactionId };
};

export const getCreateOrUpdateRecurringBillContent = (state) => {
  const schedule = getSchedule(state);
  const bill = getBill(state);

  return { schedule, bill };
};

export const getDeleteRecurringBillUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const recurringTransactionId = getRecurringTransactionId(state);

  return { businessId, recurringTransactionId };
};

export const getLoadSupplierUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const supplierId = getSupplierId(state);

  return { businessId, supplierId };
};

export const getLoadAbnFromSupplierUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const supplierId = getSupplierId(state);

  return { businessId, supplierId };
};

export const getLoadItemParams = (state, itemId) => {
  const businessId = getBusinessId(state);

  return { businessId, itemId };
};

export const getLoadItemQueryParams = (state) => {
  const isTaxInclusive = getIsTaxInclusive(state);

  return { isTaxInclusive };
};

export const getCalculateLineContent = (state) => {
  const lines = getLines(state);
  const isTaxInclusive = getIsTaxInclusive(state);
  const amountPaid = getAmountPaid(state);

  return { lines, isTaxInclusive, amountPaid };
};

export const getLoadBillLineContent = (state, { index, itemId }) => ({
  ...getCalculateLineContent(state),
  index,
  itemId,
});

export const getLoadAccountUrlParams = (state, accountId) => {
  const businessId = getBusinessId(state);
  return { businessId, accountId };
};
