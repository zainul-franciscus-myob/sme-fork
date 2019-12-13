const widthConfig = ({
  date,
  invoiceNumber,
  customer,
  customerPurchaseOrderNo,
  amount,
  creditAmount,
  payRefund,
  applyToSale,
}) => [
  {
    'min-width': '1160px',
    config: [
      { columnName: date.columnName, styles: { width: '113.3px' } },
      { columnName: invoiceNumber.columnName, styles: { width: '143.3px' } },
      { columnName: customer.columnName, styles: { width: 'flex-1' } },
      { columnName: customerPurchaseOrderNo.columnName, styles: { width: '152px' } },
      { columnName: amount.columnName, styles: { width: '135px' } },
      { columnName: creditAmount.columnName, styles: { width: '147px' } },
      { columnName: payRefund.columnName, styles: { width: '120px' } },
      { columnName: applyToSale.columnName, styles: { width: '116px' } },
    ],
  },
];

export default widthConfig;
