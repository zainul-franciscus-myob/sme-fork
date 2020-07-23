import FormatDateWithPattern from '../../../../common/valueFormatters/formatDate/formatDateWithPattern';
import InvoiceHistoryAccordianStatus from '../types/InvoiceHistoryAccordionStatus';
import InvoiceHistoryStatus from '../types/InvoiceHistoryStatus';

const getDate = (date) => FormatDateWithPattern('dd/MM/yyyy')(new Date(date));

const getTimestamp = (date) => new Date(date).getTime();

const sortByDescendingTime = (a, b) =>
  getTimestamp(b.date) - getTimestamp(a.date);

const sortByJournalId = (a, b) => b.journalId - a.journalId;

const sortPaymentReceivedToEndOfDay = (a, b) => {
  const isPaymentReceivedEventFirst =
    a.status === InvoiceHistoryStatus.PAYMENT_RECEIVED;

  const isOnSameDay = getDate(a.date) === getDate(b.date);
  if (isPaymentReceivedEventFirst && isOnSameDay) {
    return -1;
  }

  return 0;
};

const sortCreateToLast = (_, b) => {
  const isCreateEventSecond = b.status === InvoiceHistoryStatus.CREATED;

  if (isCreateEventSecond) {
    return -1;
  }

  return 0;
};

const sortExportedToPdfAfterCreate = (a, b) => {
  const isCreateEventFirst = a.status === InvoiceHistoryStatus.CREATED;
  const isExportedToPdfEventSecond =
    b.status === InvoiceHistoryStatus.EXPORTED_TO_PDF;

  if (isCreateEventFirst && isExportedToPdfEventSecond) {
    return 1;
  }

  return 0;
};

export const setInvoiceHistoryLoading = (state) => ({
  ...state,
  invoiceHistoryAccordionStatus: InvoiceHistoryAccordianStatus.LOADING,
});

const sortEvents = (history) =>
  history
    .sort(sortByJournalId)
    .sort(sortByDescendingTime)
    .sort(sortPaymentReceivedToEndOfDay)
    .sort(sortCreateToLast)
    .sort(sortExportedToPdfAfterCreate);

export const loadInvoiceHistory = (state, { invoiceHistory }) => ({
  ...state,
  invoiceHistory: sortEvents(invoiceHistory),
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
