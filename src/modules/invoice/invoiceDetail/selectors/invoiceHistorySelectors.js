import { businessEventToFeatureMap } from '../../../../common/types/BusinessEventTypeMap';
import FormatDateWithPattern from '../../../../common/valueFormatters/formatDate/formatDateWithPattern';
import InvoiceHistoryAccordionStatus from '../types/InvoiceHistoryAccordionStatus';
import InvoiceHistoryStatus from '../types/InvoiceHistoryStatus';

export const getInvoiceHistory = (state) => state.invoiceHistory;

const getShowLink = (line) => {
  const { sourceJournalType, referenceNo } = line;
  const feature = businessEventToFeatureMap[sourceJournalType];
  return feature && referenceNo;
};

export const getDate = (row) =>
  row.date !== undefined
    ? FormatDateWithPattern('dd/MM/yyyy')(new Date(row.date))
    : '';

const businessEvents = [
  'CREATED',
  'PAYMENT_RECEIVED',
  'INVOICE_REVERSED',
  'EXPORTED_TO_PDF',
  'CREDIT_APPLIED',
];

export const getTime = (row) =>
  row.date !== undefined && !businessEvents.includes(row.status)
    ? FormatDateWithPattern('h:mmaa')(new Date(row.date)).toLowerCase()
    : '';

export const getInvoiceHistoryTable = (state) =>
  state.invoiceHistory.map((line) => ({
    ...line,
    displayDate: getDate(line),
    displayTime: getTime(line),
    showLink: getShowLink(line),
  }));

export const getInvoiceHistoryAccordionStatus = (state) =>
  state.invoiceHistoryAccordionStatus;

export const getMostRecentStatus = (state) =>
  state.invoiceHistory[0] && state.invoiceHistory[0].status;

export const getMostRecentStatusColor = (state) => {
  const accordionStatus = state.invoiceHistoryAccordionStatus;
  const mostRecentStatus = getMostRecentStatus(state);

  if (accordionStatus === InvoiceHistoryAccordionStatus.OPEN) {
    return 'light-grey';
  }

  switch (mostRecentStatus) {
    case InvoiceHistoryStatus.PAYMENT_DECLINED:
      return 'red';
    case InvoiceHistoryStatus.BULK_PAYMENT_DECLINED:
      return 'red';
    case InvoiceHistoryStatus.DELIVERY_FAILED:
      return 'red';
    case InvoiceHistoryStatus.PAYMENT_RECEIVED:
      return 'green';
    default:
      return 'light-grey';
  }
};
