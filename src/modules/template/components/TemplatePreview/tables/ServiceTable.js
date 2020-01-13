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
      description: 'Dog walking',
      taxCode: 'GST',
      amount: '40.00',
    },
    {
      description: 'Deluxe grooming package',
      taxCode: 'GST',
      amount: '135.00',
    },
    {
      description: 'Organic shampoo option',
      taxCode: 'GST',
      amount: '15.00',
    },
  ];

  return <Table columns={columns} items={items} />;
};
export default ServiceTable;
