import React from 'react';

import Table from './Table';
import getRegionToDialectText from '../../../../../dialect/getRegionToDialectText';

const ServiceItemTable = ({ region }) => {
  const columns = [
    { key: 'itemId', name: 'Item ID', width: '70px' },
    { key: 'description', name: 'Description' },
    { key: 'unit', name: '', width: '30px' },
    {
      key: 'quantity',
      name: 'Units',
      width: '45px',
      rightAlign: true,
    },
    {
      key: 'unitPrice',
      name: 'Unit price ($)',
      width: '80px',
      rightAlign: true,
      description: getRegionToDialectText(region)('Including tax'),
    },
    {
      key: 'discount',
      name: 'Disc. (%)',
      width: '55px',
      rightAlign: true,
    },
    {
      key: 'taxCode',
      name: getRegionToDialectText(region)('Tax code'),
      width: '60px',
    },
    {
      key: 'amount',
      name: 'Amount ($)',
      width: '70px',
      rightAlign: true,
      description: getRegionToDialectText(region)('Including tax'),
    },
  ];

  const items = [
    {
      itemId: 'IT008174',
      description: 'Paper shredder',
      unit: 'Qty',
      quantity: '2',
      unitPrice: '16.83',
      discount: '0.00',
      taxCode: 'GST',
      amount: '33.66',
    },
    {
      itemId: 'IT0292932',
      description: 'Portable whiteboard(200 × 80)',
      unit: 'Qty',
      quantity: '1',
      unitPrice: '48.642',
      discount: '0.00',
      taxCode: 'GST',
      amount: '48.64',
    },
    {
      itemId: '8281',
      description: 'Whiteboard markers - Pkt 5',
      unit: 'Qty',
      quantity: '2',
      unitPrice: '7.876',
      discount: '0.00',
      taxCode: 'GST',
      amount: '15.75',
    },
  ];

  return <Table columns={columns} items={items} />;
};

export default ServiceItemTable;
