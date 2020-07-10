import InvoiceHistoryAccordianStatus from '../types/InvoiceHistoryAccordionStatus';

export const setInvoiceHistoryLoading = (state) => ({
  ...state,
  invoiceHistoryAccordionStatus: InvoiceHistoryAccordianStatus.LOADING,
});

export const loadInvoiceHistory = (state, { invoiceHistory }) => ({
  ...state,
  invoiceHistory,
  invoiceHistoryAccordionStatus: InvoiceHistoryAccordianStatus.OPEN,
});

export const setInvoiceHistoryUnavailable = (state) => ({
  ...state,
  invoiceHistoryAccordionStatus: InvoiceHistoryAccordianStatus.UNAVAILABLE,
});

export const setInvoiceHistoryClosed = (state) => ({
  ...state,
  invoiceHistoryAccordionStatus: InvoiceHistoryAccordianStatus.CLOSED,
});

export const setInvoiceHistoryOpen = (state) => ({
  ...state,
  invoiceHistoryAccordionStatus: InvoiceHistoryAccordianStatus.OPEN,
});
