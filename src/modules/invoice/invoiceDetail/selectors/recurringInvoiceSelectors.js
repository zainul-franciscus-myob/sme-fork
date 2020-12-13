import { createSelector } from 'reselect';

import {
  getBusinessId,
  getIsCreating,
  getIsCustomerDisabled,
  getIsReadOnly,
} from './invoiceDetailSelectors';
import { getCreateOrUpdateInvoicePayload } from './integratorSelectors';

export const getShouldShowSaveAsRecurring = (state) =>
  state.isRecurringTransactionEnabled;

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
  transactionType: 'Invoice',
});

export const getIsRecurringTransactionReadOnly = (data) => getIsReadOnly(data);

export const getRecurringTransactionModalContext = (state) => ({
  businessId: getBusinessId(state),
  transactionType: 'Invoice',
  transaction: getCreateOrUpdateInvoicePayload(state),
});
