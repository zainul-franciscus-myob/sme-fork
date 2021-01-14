import InvoiceHistoryStatus from './InvoiceHistoryStatus';

const InvoiceHistoryStatusPretty = {
  [InvoiceHistoryStatus.CREATED]: 'Created',
  [InvoiceHistoryStatus.CREATED_FROM_QUOTE]: 'Created from quote',
  [InvoiceHistoryStatus.VIEWED_ONLINE]: 'Viewed online',
  [InvoiceHistoryStatus.DOWNLOADED]: 'Downloaded',
  [InvoiceHistoryStatus.PRINTED]: 'Printed',
  [InvoiceHistoryStatus.EXPORTED_TO_PDF]: 'Exported to PDF',
  [InvoiceHistoryStatus.PAID_ONLINE]: 'Paid online',
  [InvoiceHistoryStatus.PAID_IN_BULK_ONLINE]: 'Paid in bulk online',
  [InvoiceHistoryStatus.PAYMENT_DECLINED]: 'Payment declined',
  [InvoiceHistoryStatus.BULK_PAYMENT_DECLINED]: 'Bulk payment declined',
  [InvoiceHistoryStatus.PAYMENT_RECEIVED]: 'Payment received',
  [InvoiceHistoryStatus.INVOICE_REVERSED]: 'Invoice reversed',
  [InvoiceHistoryStatus.EMAILED]: 'Emailed',
  [InvoiceHistoryStatus.DELIVERY_FAILED]: 'Delivery failed',
  [InvoiceHistoryStatus.CREDIT_APPLIED]: 'Credit applied',
};
export default InvoiceHistoryStatusPretty;
