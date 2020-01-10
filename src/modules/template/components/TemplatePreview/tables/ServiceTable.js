import React from 'react';

import Table from './Table';
import getRegionToDialectText from '../../../../../dialect/getRegionToDialectText';

const ServiceTable = ({ region }) => {
  const columns = [
    { key: 'description', name: 'Description' },
    {
      key: 'taxCode',
      name: getRegionToDialectText(region)('Tax code'),
      width: '55px',
    },
    {
      key: 'amount',
      name: 'Amount($)',
      width: '90px',
      rightAlign: true,
      description: getRegionToDialectText(region)('Including tax'),
    },
  ];

  const items = [
    {
      description: 'Portable whiteboard (200 x 80)',
      taxCode: 'GST',
      amount: '890.00',
    },
    {
      description: 'Paper shredder',
      taxCode: 'GST',
      amount: '99,999,999.99',
    },
    {
      description: 'Whiteboard markers - Pkt 5',
      taxCode: 'GST',
      amount: '90.02',
    },
  ];

  return <Table columns={columns} items={items} />;
};
export default ServiceTable;
