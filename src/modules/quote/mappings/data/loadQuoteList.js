export default {
  customerFilters: [
    { name: 'Cameron James', id: '1' },
    { name: 'John Smith', id: '2' },
    { name: 'Serena Jaramillo', id: '3' },
    { name: 'Krzysztof Coleman', id: '4' },
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
      id: 'service-readonly-id',
      referenceId: '00000034',
      purchaseOrder: 'SERVICE-READONLY',
      customer: 'John Doe',
      displayDate: '15/02/2019',
      displayAmount: '1,692.00',
      displayExpiryDate: '30/05/2019',
    },
    {
      id: 'service-readonly-id',
      referenceId: '00000098',
      purchaseOrder: 'ITEM-READONLY',
      customer: 'Jane Doe',
      displayDate: '04/03/2019',
      displayAmount: '8976.00',
      displayExpiryDate: '04/04/2020',
    },
  ],
  pagination: {
    hasNextPage: true,
    offset: 50,
  },
};
