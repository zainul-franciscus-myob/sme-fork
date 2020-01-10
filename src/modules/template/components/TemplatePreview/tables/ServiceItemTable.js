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
      width: '50px',
      rightAlign: true,
    },
    {
      key: 'unitPrice',
      name: 'Unit price($)',
      width: '80px',
      rightAlign: true,
      description: getRegionToDialectText(region)('Including tax'),
    },
    {
      key: 'discount',
      name: 'Disc.(&)',
      width: '55px',
      rightAlign: true,
    },
    {
      key: 'taxCode',
      name: getRegionToDialectText(region)('Tax code'),
      width: '55px',
    },
    {
      key: 'amount',
      name: 'Amount($)',
      width: '70px',
      rightAlign: true,
      description: getRegionToDialectText(region)('Including tax'),
    },
  ];

  const items = [
    {
      itemId: 'IT029292',
      description: `Maximum 255 characters. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec dictum accumsan quam quis luctus. Integer iaculis mi vulputate congue blandit.`,
      unit: 'Hrs',
      quantity: '9,999,999',
      unitPrice: '299.87',
      discount: '9.61',
      taxCode: 'GST',
      amount: '890.00',
    },
    {
      itemId: 'IT029292',
      description: 'Paper shredder',
      unit: 'Hrs',
      quantity: 3,
      unitPrice: '299.87',
      discount: '9.61',
      taxCode: 'GST',
      amount: '890.00',
    },
    {
      itemId: 'IT029292',
      description: 'Paper shredder',
      unit: 'Hrs',
      quantity: 3,
      unitPrice: '299.87',
      discount: '9.61',
      taxCode: 'GST',
      amount: '890.00',
    },
  ];

  return <Table columns={columns} items={items} />;
};

export default ServiceItemTable;
