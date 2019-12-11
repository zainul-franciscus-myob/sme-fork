export default {
  entries: [
    {
      id: '1',
      date: '1/02/2019',
      amount: '360.50',
      debitAmount: '9.90',
      supplier: 'Jon Terrier',
      supplierInvoiceNumber: 'YO',
      purchaseOrderNumber: '00000029',
    },
    {
      id: '2',
      date: '28/02/2019',
      amount: '-360.50',
      debitAmount: '-9.90',
      supplier: 'Jon Terry',
      supplierInvoiceNumber: '',
      purchaseOrderNumber: '00000028',
    },
  ],
  totalAmount: '$2960.50',
  totalDebitAmount: '$10.00',
  pagination: {
    hasNextPage: true,
    offset: 50,
  },
};
