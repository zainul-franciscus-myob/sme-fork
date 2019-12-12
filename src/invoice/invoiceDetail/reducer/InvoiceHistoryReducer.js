import InvoiceHistoryAccordianStatus from '../InvoiceHistoryAccordionStatus';

export const setInvoiceHistoryLoading = state => ({
  ...state,
  invoiceHistoryAccordionStatus: InvoiceHistoryAccordianStatus.LOADING,
});

export const loadInvoiceHistory = (state, { invoiceHistory }) => ({
  ...state,
  invoiceHistory,
  invoiceHistoryAccordionStatus: InvoiceHistoryAccordianStatus.LOADED,
});

export const setInvoiceHistoryUnavailable = state => ({
  ...state,
  invoiceHistoryAccordionStatus: InvoiceHistoryAccordianStatus.UNAVAILABLE,
});
