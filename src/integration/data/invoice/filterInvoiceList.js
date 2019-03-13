export default {
  total: '$123.45',
  totalDue: '$100.00',
  entries: [
    {
      id: '1',
      referenceId: '00000045',
      purchaseOrder: 'some text',
      customer: 'Bob Kelso',
      dateIssued: '25/02/2019',
      dateClosed: '',
      invoiceAmount: '10.00',
      invoiceDue: '10.00',
      status: 'Open',
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
    },
  ],
};
