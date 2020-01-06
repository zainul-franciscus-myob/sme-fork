export default {
  customerFilters: [
    { name: 'Cameron James', value: '1' },
    { name: 'John Smith', value: '2' },
    { name: 'Serena Jaramillo', value: '3' },
    { name: 'Krzysztof Coleman', value: '4' },
  ],
  total: '$1,747.00',
  entries: [
    {
      id: '1',
      referenceId: '00000045',
      purchaseOrder: 'PO0019374',
      customer: 'Serena Jaramillo',
      displayDate: '30/01/2019',
      displayAmount: '55.00',
      displayExpiryDate: '15/04/2019',
    },
    {
      id: '2',
      referenceId: '00000034',
      purchaseOrder: 'PO0019394',
      customer: 'Serena Jaramillo',
      displayDate: '15/02/2019',
      displayAmount: '1,692.00',
      displayExpiryDate: '30/05/2019',
    },
  ],
  pagination: {
    hasNextPage: true,
    offset: 50,
  },
};
