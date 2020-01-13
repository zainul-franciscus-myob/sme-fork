import { addDays } from 'date-fns';
import React from 'react';

import Table from './Table';
import formatSlashDate from '../../../../../common/valueFormatters/formatDate/formatSlashDate';

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
      issueDate: formatSlashDate(Date.now()),
      invoiceNo: 'INV0000123',
      customerPoNo: '1234567890',
      description: 'Sales invoice',
      totalAmount: '322.90',
      totalPaid: '0.00',
      balanceDue: '322.90',
    },
    {
      issueDate: formatSlashDate(addDays(Date.now(), 41)),
      invoiceNo: 'INV0000276',
      customerPoNo: '',
      description: 'Customer return',
      totalAmount: '22.19',
      totalPaid: '0.00',
      balanceDue: '22.19',
    },
    {
      issueDate: formatSlashDate(addDays(Date.now(), 41)),
      invoiceNo: 'INV0000675',
      customerPoNo: '',
      description: 'Sales invoice',
      totalAmount: '45.10',
      totalPaid: '0.00',
      balanceDue: '45.10',
    },
  ];
  return <Table columns={columns} items={items} />;
};

export default StatementTable;
