import React from 'react';

import Table from './Table';

const StatementTable = () => {
  const columns = [
    { key: 'issueDate', name: 'Issue date', width: '70px' },
    { key: 'invoiceNo', name: 'Invoice no', width: '70px' },
    { key: 'customerPoNo', name: 'Customer PO no', width: '70px' },
    { key: 'description', name: 'Description' },
    {
      key: 'totalAmount',
      name: 'Total amount ($)',
      width: '80px',
      rightAlign: true,
    },
    {
      key: 'totalPaid',
      name: 'Total paid ($)',
      width: '80px',
      rightAlign: true,
    },
    {
      key: 'balanceDue',
      name: 'Balance due ($)',
      width: '80px',
      rightAlign: true,
    },
  ];

  const items = [
    {
      issueDate: '01/10/2018',
      invoiceNo: 'INV0000123',
      customerPoNo: '1234567890',
      description: 'Sales invoice',
      totalAmount: '99,999,999.00',
      totalPaid: '99,999,999.00',
      balanceDue: '99,999,999.00',
    },
    {
      issueDate: '06/03/2019',
      invoiceNo: 'INV0000276',
      customerPoNo: '',
      description: 'Customer return',
      totalAmount: '22.19',
      totalPaid: '0.00',
      balanceDue: '22.19',
    },
    {
      issueDate: '22/08/2019',
      invoiceNo: 'INV0000336',
      customerPoNo: '',
      description: 'Sales invoice',
      totalAmount: '40.00',
      totalPaid: '7.00',
      balanceDue: '33.00',
    },
  ];
  return <Table columns={columns} items={items} />;
};

export default StatementTable;
