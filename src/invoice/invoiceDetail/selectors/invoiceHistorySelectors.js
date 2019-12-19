import BusinessEventTypeMap from '../../../common/types/BusinessEventTypeMap';
import InvoiceHistoryAccordionStatus from '../InvoiceHistoryAccordionStatus';
import InvoiceHistoryStatus from '../InvoiceHistoryStatus';

const getShowLink = (line) => {
  const {
    sourceJournalType,
    referenceNo,
  } = line;
  const feature = BusinessEventTypeMap[sourceJournalType];
  return feature && referenceNo;
};

export const getInvoiceHistory = state => state.invoiceHistory.map(line => ({
  ...line,
  showLink: getShowLink(line),
}));

export const getInvoiceHistoryAccordionStatus = state => state.invoiceHistoryAccordionStatus;

export const getMostRecentStatus = state => (
  state.invoiceHistory[0] && state.invoiceHistory[0].status);

export const getMostRecentStatusColor = (state) => {
  const accordionStatus = state.invoiceHistoryAccordionStatus;
  const mostRecentStatus = getMostRecentStatus(state);

  if (accordionStatus === InvoiceHistoryAccordionStatus.OPEN) {
    return 'light-grey';
  }

  switch (mostRecentStatus) {
    case (InvoiceHistoryStatus.PAYMENT_DECLINED):
      return 'red';
    case (InvoiceHistoryStatus.BULK_PAYMENT_DECLINED):
      return 'red';
    case (InvoiceHistoryStatus.DELIVERY_FAILED):
      return 'red';
    case (InvoiceHistoryStatus.PAYMENT_RECEIVED):
      return 'green';
    default:
      return 'light-grey';
  }
};
