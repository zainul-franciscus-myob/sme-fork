import { createSelector } from 'reselect';

import {
  getBusinessId,
  getIsCreating,
  getIsCustomerDisabled,
  getIsReadOnly,
} from './invoiceDetailSelectors';
import RecurringTransactionListModalTransactionType from '../../../recurringTransaction/recurringTransactionListModal/types/RecurringTransactionListModalTransactionType';

export const getRecurringTransactionName = (state) =>
  state.recurringSchedule.recurringTransactionName;

export const getShouldShowSaveAsRecurring = (state) =>
  state.isRecurringTransactionEnabled;

export const getSaveAsRecurringUrlParams = (state) => ({
  businessId: state.businessId,
});

export const getSaveAsRecurringPayload = (state) => ({
  invoice: state.invoice,
  schedule: state.recurringSchedule,
});

const getIsRecurringTransactionEnabled = (state) =>
  state.isRecurringTransactionEnabled;

export const getShowPrefillRecurringButton = createSelector(
  getIsCreating,
  getIsCustomerDisabled,
  getIsRecurringTransactionEnabled,
  (isCreating, isCustomerDisabled, isRecurringTransactionEnabled) =>
    isCreating && !isCustomerDisabled && isRecurringTransactionEnabled
);

export const getRecurringTransactionListModalContext = (state) => ({
  businessId: getBusinessId(state),
  transactionType: RecurringTransactionListModalTransactionType.INVOICE,
});

export const getIsRecurringTransactionReadOnly = (data) => getIsReadOnly(data);
