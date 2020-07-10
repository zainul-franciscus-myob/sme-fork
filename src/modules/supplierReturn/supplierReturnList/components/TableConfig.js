const date = 'Issue date';
const purchaseOrderNumber = 'Bill number';
const supplier = 'Supplier';
const supplierInvoiceNumber = 'Supplier invoice no';
const amount = 'Amount ($)';
const balanceDue = 'Balance due ($)';
const receiveRefund = 'Record refund';
const applyToPurchase = 'Apply to purchase';

export const responsiveWidths = [
  {
    'min-width': '768px',
    config: [
      { columnName: date, styles: { width: 'flex-1' } },
      { columnName: purchaseOrderNumber, styles: { width: 'flex-1' } },
      { columnName: supplier, styles: { width: 'flex-1' } },
      { columnName: supplierInvoiceNumber, styles: { width: 'flex-1' } },
      { columnName: amount, styles: { width: '12rem' } },
      { columnName: balanceDue, styles: { width: '12rem' } },
      { columnName: receiveRefund, styles: { width: 'flex-1' } },
      { columnName: applyToPurchase, styles: { width: 'flex-1' } },
    ],
  },
  {
    'min-width': '1200px',
    config: [
      { columnName: date, styles: { width: '11.5rem' } },
      { columnName: purchaseOrderNumber, styles: { width: '12rem' } },
      { columnName: supplier, styles: { width: 'flex-1' } },
      { columnName: supplierInvoiceNumber, styles: { width: '17rem' } },
      { columnName: amount, styles: { width: '13.5rem' } },
      { columnName: balanceDue, styles: { width: '16rem' } },
      { columnName: receiveRefund, styles: { width: '13rem' } },
      { columnName: applyToPurchase, styles: { width: '16rem' } },
    ],
  },
];

export const tableConfig = {
  date: { columnName: date, styles: { valign: 'middle' } },
  purchaseOrderNumber: {
    columnName: purchaseOrderNumber,
    styles: { valign: 'middle' },
  },
  supplier: { columnName: supplier, styles: { valign: 'middle' } },
  supplierInvoiceNumber: {
    columnName: supplierInvoiceNumber,
    styles: { valign: 'middle' },
  },
  amount: { columnName: amount, styles: { valign: 'middle', align: 'right' } },
  balanceDue: {
    columnName: balanceDue,
    styles: { valign: 'middle', align: 'right' },
  },
  receiveRefund: { columnName: receiveRefund, styles: { valign: 'middle' } },
  applyToPurchase: {
    columnName: applyToPurchase,
    styles: { valign: 'middle' },
  },
};
