import { createSelector } from 'reselect';

import {
  getBusinessId,
  getIsCreating,
  getIsReadOnly,
  getIsSupplierDisabled,
} from './billSelectors';
import { getSaveBillContent } from './BillIntegratorSelectors';

export const getShouldShowSaveAsRecurring = (state) =>
  state.isRecurringTransactionEnabled;

const getIsRecurringTransactionEnabled = (state) =>
  state.isRecurringTransactionEnabled;

export const getShowPrefillRecurringButton = createSelector(
  getIsCreating,
  getIsSupplierDisabled,
  getIsRecurringTransactionEnabled,
  (isCreating, isSupplierDisabled, isRecurringTransactionEnabled) =>
    isCreating && !isSupplierDisabled && isRecurringTransactionEnabled
);

export const getRecurringTransactionListModalContext = (state) => ({
  businessId: getBusinessId(state),
  transactionType: 'Bill',
});

export const getIsRecurringTransactionReadOnly = (data) => getIsReadOnly(data);

export const getRecurringTransactionModalContext = (state) => ({
  businessId: getBusinessId(state),
  transactionType: 'Bill',
  transaction: getSaveBillContent(state),
});
