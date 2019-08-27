export default {
  layout: 'service',
  customerFilters: [
    { name: 'All customers', value: 'All' },
    { name: 'Cameron James', value: '1' },
    { name: 'John Smith', value: '2' },
    { name: 'Serena Jaramillo', value: '3' },
    { name: 'Krzysztof Coleman', value: '4' },
  ],
  statusFilters: [
    { name: 'All invoices', value: 'All' },
    { name: 'Open', value: 'Open' },
    { name: 'Closed', value: 'Closed' },
  ],
  customerId: 'All',
  status: 'All',
  sortOrder: 'desc',
  orderBy: 'DisplayId',
  total: '$123.45',
  totalDue: '$100.00',
  entries: [
    {
      id: '123',
      referenceId: '00000045',
      purchaseOrder: 'some text',
      customer: 'Bob Kelso',
      dateIssued: '25/02/2019',
      dateClosed: '',
      invoiceAmount: '10.00',
      invoiceDue: '10.00',
      status: 'Open',
      dateDue: '2020-09-25T00:00:00.000',
      dateDueDisplay: '25/09/2020',
    },
    {
      id: '2',
      referenceId: '00000061',
      purchaseOrder: 'some more text',
      customer: 'Eliot Reed',
      dateIssued: '25/02/2019',
      dateClosed: '29/02/2019',
      invoiceAmount: '10.00',
      invoiceDue: '0.00',
      status: 'Closed',
      dateDue: '',
      dateDueDisplay: 'COD',
    },
    {
      id: '3',
      referenceId: '00000078',
      purchaseOrder: 'this is interesting',
      customer: 'Marjory Buttersworth',
      dateIssued: '25/02/2019',
      dateClosed: '',
      invoiceAmount: '10.00',
      invoiceDue: '10.00',
      status: 'Open',
      dateDueDisplay: '01/10/2017',
      dateDue: '2017-10-01T00:00:00.000',
    },
    {
      id: '4',
      referenceId: '00000079',
      purchaseOrder: 'Yeah nah',
      customer: 'Beatrice Smythebury Pollard III',
      dateIssued: '25/02/2019',
      dateClosed: '25/02/2019',
      invoiceAmount: '10.00',
      invoiceDue: '0.00',
      status: 'Closed',
      dateDueDisplay: 'Prepaid',
      dateDue: '2019-02-25T00:00:00.000',
    },
    {
      customer: 'Owen Wright',
      dateDueDisplay: '18/06/2019',
      dateIssued: '18/06/2019',
      id: '1391',
      invoiceAmount: '34,543.00',
      invoiceDue: '34,543.00',
      purchaseOrder: '34343',
      referenceId: '00000078',
      status: 'Open',
      dateDue: '2019-06-18T00:00:00.000',
    },
  ],
};
