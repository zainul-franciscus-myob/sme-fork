import { getAmountDue } from './invoiceDetailSelectors';

export const getShowInvoiceFinanceButton = (state) => {
  if (!state.eligibility) return false;
  const notFullyPaid = Math.round(getAmountDue(state)) > 0;
  const isExistingInvoice = state.invoiceId !== 'new';
  return state.eligibility.eligible && notFullyPaid && isExistingInvoice;
};

export const getInvoiceFinanceEntryUrl = (state) =>
  state.eligibility ? state.eligibility.entryUrl : '';

export const getInvoiceFinanceMessage = (state) =>
  state.eligibility ? state.eligibility.message : 'Get paid now';
