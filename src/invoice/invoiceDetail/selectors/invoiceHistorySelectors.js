export const getInvoiceHistory = state => state.invoiceHistory;

export const getInvoiceHistoryAccordionStatus = state => state.invoiceHistoryAccordionStatus;

export const getMostRecentStatus = state => (
  state.invoiceHistory[0] && state.invoiceHistory[0].status);
