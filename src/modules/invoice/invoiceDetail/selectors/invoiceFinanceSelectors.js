import { createStructuredSelector } from 'reselect';

import {
  getInvoicePaymentStatusLabel,
  getIsOverDue,
} from './invoiceDetailSelectors';

export const getShowInvoiceFinanceButton = (state) => {
  if (!state.eligibility) return false;
  const isOpenAndNotOverdue =
    !getIsOverDue(state) && getInvoicePaymentStatusLabel(state) === 'open';
  const isExistingInvoice = state.invoiceId !== 'new';
  return state.eligibility.eligible && isOpenAndNotOverdue && isExistingInvoice;
};

const getInvoiceFinanceEntryUrl = (state) =>
  state.eligibility ? state.eligibility.entryUrl : '';

const getInvoiceFinanceMessage = (state) =>
  state.eligibility ? state.eligibility.message : 'Fund this invoice';

export const getInvoiceFinanceInfo = createStructuredSelector({
  invoiceFinanceEntryUrl: getInvoiceFinanceEntryUrl,
  invoiceFinanceMessage: getInvoiceFinanceMessage,
  showInvoiceFinanceButton: getShowInvoiceFinanceButton,
});
