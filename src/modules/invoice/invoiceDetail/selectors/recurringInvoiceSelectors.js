import { createSelector } from 'reselect';

import {
  getBusinessId,
  getIsCreating,
  getIsCustomerDisabled,
  getIsReadOnly,
} from './invoiceDetailSelectors';
import RecurringTransactionListModalTransactionType from '../../../recurringTransaction/recurringTransactionListModal/types/RecurringTransactionListModalTransactionType';

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
