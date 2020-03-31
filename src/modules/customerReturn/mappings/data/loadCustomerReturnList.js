export default {
  customerFilters: [
    { name: 'Cameron James', id: '1' },
    { name: 'John Smith', id: '2' },
    { name: 'Serena Jaramillo', id: '3' },
    { name: 'Krzysztof Coleman', id: '4' },
  ],
  sortOrder: 'asc',
  orderBy: 'DateOccurred',
  totalAmount: '$2,100.00',
  totalCreditAmount: '$56.34',
  entries: [
    {
      id: '1',
      date: '01/03/2019',
      invoiceNumber: '126',
      customerPurchaseOrderNo: 'PO0001',
      customer: 'Footloose Dance Studio',
      amount: '100.00',
      creditAmount: '56.34',
    },
    {
      id: '2',
      date: '01/04/2019',
      invoiceNumber: '456',
      customerPurchaseOrderNo: 'PO0002',
      customer: 'Bob The Builder',
      amount: '1,000.00',
      creditAmount: '103.34',
    },
  ],
};
