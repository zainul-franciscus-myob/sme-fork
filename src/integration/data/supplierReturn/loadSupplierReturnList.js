export default {
  supplierFilters: [
    { name: 'All Suppliers', value: 'All' },
    { name: 'The Reject Shop', value: '1' },
    { name: 'Big Kevs steak knives', value: '2' },
    { name: 'The Crystal Palace', value: '3' },
    { name: 'Thin Air Warehouse', value: '4' },
  ],
  sortOrder: 'asc',
  orderBy: 'DateOccurred',
  supplierId: 'All',
  totalAmount: '$2,100.00',
  totalDebitAmount: '$56.34',
  entries: [
    {
      id: '1',
      date: '01/03/2019',
      purchaseOrderNumber: '126',
      supplierInvoiceNumber: 'iv0001',
      supplier: 'the reject shop',
      amount: '100.00',
      debitAmount: '56.34',
    },
    {
      id: '2',
      date: '01/04/2015',
      purchaseOrderNumber: '918',
      supplierInvoiceNumber: 'iv00123',
      supplier: 'thin air warehouse',
      amount: '100.00',
      debitAmount: '56.34',
    },
  ],
};
